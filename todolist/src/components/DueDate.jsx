import React, { useRef, useEffect } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const DueDate = ({ onDateSelect }) => {
  const calendarInputRef = useRef(null);

  useEffect(() => {
    if (calendarInputRef.current) {
      Flatpickr(calendarInputRef.current, {
        dateFormat: "d/m/Y", // Display format for users
        altFormat: "d/m/Y", // What users see in input
        allowInput: false,
        minDate: "today",
        onClose: (selectedDates) => {
          if (selectedDates.length > 0) {
            const selectedDate = selectedDates[0];
            // Convert to ISO format for backend
            const isoDate = selectedDate.toISOString();
            if (onDateSelect) onDateSelect(isoDate);
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
        data-input
      />
      <CalendarMonthRoundedIcon
        className="icon"
        fontSize="large"
        onClick={() => calendarInputRef.current?.click()}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default DueDate;
