import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

function DatePick() {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setSelectedDate(moment(storedDate));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };

  return (
    <div className="clock-container">
      <span>Select a date and time:</span>
      <Datetime
        onChange={handleDateChange}
        value={selectedDate}
        className="datetime-input"
        closeOnSelect={true}
      />
      {selectedDate && (
        <span className="selected-date">
          The details have been sent to the doctor and he will confirm the
          correct times and send you the medication every month at the same time:
          <p style={{ color: "red" }}>
            {selectedDate.format("MMMM Do YYYY, h:mm a")}
          </p>
        </span>
      )}
    </div>
  );
}

export default DatePick;
