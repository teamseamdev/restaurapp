"use client";

import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";

type Employee = {
  id: string;
  full_name: string;
};

type Schedule = {
  id: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  position: string;
  profiles: {
    full_name: string;
  };
};

export default function ScheduleManager() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [shiftDate, setShiftDate] =
    useState<Date>();

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [position, setPosition] =
    useState("");

  async function fetchEmployees() {
    const res = await fetch(
      "/api/admin/employees"
    );

    const data = await res.json();

    setEmployees(data);
  }

  async function fetchSchedules() {
    const res = await fetch(
      "/api/schedules"
    );

    const data = await res.json();

    setSchedules(data);
  }

  useEffect(() => {
    fetchEmployees();
    fetchSchedules();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/schedules",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          employee_id: employeeId,

          shift_date:
            shiftDate?.toISOString(),

          start_time: startTime,

          end_time: endTime,

          position,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setEmployeeId("");
    setShiftDate(undefined);
    setStartTime("");
    setEndTime("");
    setPosition("");

    fetchSchedules();
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-3xl font-bold">
        Schedule Manager
      </h2>

      <p className="mt-3 text-zinc-400">
        Manage employee shifts and scheduling.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        <select
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
          required
        >
          <option value="">
            Select Employee
          </option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.full_name}
            </option>
          ))}
        </select>

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-left text-white"
            >
              {shiftDate
                ? format(
                    shiftDate,
                    "PPP"
                  )
                : "Select Shift Date"}
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto border-zinc-800 bg-zinc-900 p-0">
            <Calendar
              mode="single"
              selected={shiftDate}
              onSelect={setShiftDate}
            />
          </PopoverContent>
        </Popover>

        <input
          type="text"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) =>
            setStartTime(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
          required
        />

        <input
          type="text"
          placeholder="End Time"
          value={endTime}
          onChange={(e) =>
            setEndTime(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
          required
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) =>
            setPosition(e.target.value)
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 md:col-span-2"
        />

        <button
          type="submit"
          className="rounded-xl bg-orange-600 py-3 font-medium transition hover:bg-orange-500 md:col-span-2"
        >
          Add Shift
        </button>
      </form>

      <div className="mt-10 overflow-x-auto rounded-3xl border border-zinc-800">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 border border-zinc-800 bg-black p-4 text-left">
                Employee
              </th>

              {Array.from({
                length: 14,
              }).map((_, index) => {
                const date =
                  new Date();

                date.setDate(
                  date.getDate() +
                    index
                );

                return (
                  <th
                    key={index}
                    className="min-w-[160px] border border-zinc-800 bg-black p-4 text-center"
                  >
                    <div className="font-semibold">
                      {format(
                        date,
                        "EEE"
                      )}
                    </div>

                    <div className="mt-1 text-sm text-zinc-400">
                      {format(
                        date,
                        "MMM d"
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {employees.map(
              (employee) => (
                <tr
                  key={employee.id}
                >
                  <td className="sticky left-0 z-10 border border-zinc-800 bg-black p-4 font-semibold">
                    {
                      employee.full_name
                    }
                  </td>

                  {Array.from({
                    length: 14,
                  }).map(
                    (
                      _,
                      index
                    ) => {
                      const date =
                        new Date();

                      date.setDate(
                        date.getDate() +
                          index
                      );

                      const formattedDate =
                        date
                          .toISOString()
                          .split(
                            "T"
                          )[0];

                      const shift =
                        schedules.find(
                          (
                            schedule
                          ) =>
                            schedule
                              .profiles
                              ?.full_name ===
                              employee.full_name &&
                            schedule.shift_date.startsWith(
                              formattedDate
                            )
                        );

                      return (
                        <td
                          key={
                            index
                          }
                          className="h-32 border border-zinc-800 p-2 align-top"
                        >
                          {shift ? (
                            <div className="flex h-full flex-col justify-between rounded-2xl bg-orange-600 p-3 text-white shadow-lg">
                              <div>
                                <p className="text-sm font-bold">
                                  {
                                    shift.start_time
                                  }{" "}
                                  -{" "}
                                  {
                                    shift.end_time
                                  }
                                </p>

                                <p className="mt-2 text-xs opacity-90">
                                  {
                                    shift.position
                                  }
                                </p>
                              </div>

                              <div className="mt-4 flex gap-2">
                                <button
                                  onClick={async () => {
                                    const newStart =
                                      prompt(
                                        "New Start Time",
                                        shift.start_time
                                      );

                                    const newEnd =
                                      prompt(
                                        "New End Time",
                                        shift.end_time
                                      );

                                    const newPosition =
                                      prompt(
                                        "Position",
                                        shift.position
                                      );

                                    if (
                                      !newStart ||
                                      !newEnd
                                    )
                                      return;

                                    await fetch(
                                      "/api/schedules/update",
                                      {
                                        method:
                                          "POST",

                                        headers:
                                          {
                                            "Content-Type":
                                              "application/json",
                                          },

                                        body:
                                          JSON.stringify(
                                            {
                                              scheduleId:
                                                shift.id,

                                              start_time:
                                                newStart,

                                              end_time:
                                                newEnd,

                                              position:
                                                newPosition,
                                            }
                                          ),
                                      }
                                    );

                                    fetchSchedules();
                                  }}
                                  className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={async () => {
                                    const confirmed =
                                      confirm(
                                        "Delete this shift?"
                                      );

                                    if (
                                      !confirmed
                                    )
                                      return;

                                    await fetch(
                                      "/api/schedules/delete",
                                      {
                                        method:
                                          "POST",

                                        headers:
                                          {
                                            "Content-Type":
                                              "application/json",
                                          },

                                        body:
                                          JSON.stringify(
                                            {
                                              scheduleId:
                                                shift.id,
                                            }
                                          ),
                                      }
                                    );

                                    fetchSchedules();
                                  }}
                                  className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-zinc-800 text-xs text-zinc-600">
                              OFF
                            </div>
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}