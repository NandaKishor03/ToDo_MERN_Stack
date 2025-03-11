import React, { useRef, useEffect, useState } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const DueDate = ({ onDateSelect }) => {
  const calendarInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (calendarInputRef.current) {
      Flatpickr(calendarInputRef.current, {
        dateFormat: "d/m/Y",
        allowInput: false, // Prevents manual input
        onClose: (selectedDates) => {
          if (selectedDates.length > 0) {
            const formattedDate = selectedDates[0].toLocaleDateString("en-GB");
            setSelectedDate(formattedDate);
            if (onDateSelect) onDateSelect(formattedDate);
          }
        },
      });
    }
  }, [onDateSelect]);

  return (
    <div className="due-date-container">
      {/* Hidden Input Field for Flatpickr */}
      <input
        ref={calendarInputRef}
        type="text"
        placeholder="Due Date"
        className="hidden-calendar-input"
        readOnly
      />

      {/* Clickable Calendar Icon */}
      <CalendarMonthRoundedIcon
        className="cursor-pointer text-blue-500"
        fontSize="large"
        onClick={() => calendarInputRef.current?.click()}
      />
    </div>
  );
};

export default DueDate;
