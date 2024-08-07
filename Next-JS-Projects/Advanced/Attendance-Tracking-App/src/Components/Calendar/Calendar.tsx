"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="flex items-center justify-center w-full pt-24">
      <div className="w-full flex items-center justify-center">
        <Calendar
          className={"custom-calendar font-poppins"}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
