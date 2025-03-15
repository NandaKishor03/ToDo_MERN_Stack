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
        allowInput: false,
        minDate: "today",
        // Prevents manual input
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
      <input
        ref={calendarInputRef}
        type="text"
        placeholder="Due Date"
        className="date-input"
        readOnly
      />

      <CalendarMonthRoundedIcon
        className="icon"
        fontSize="large"
        onClick={() => calendarInputRef.current?.click()}
      />
    </div>
  );
};

export default DueDate;
