// DatePicker.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const CustomDatePicker = ({ label, required, selectedDate, onChange, startDate, endDate, placeholder, error }) => {
  // Function to format the selected date to the desired format
// Function to format the selected date to the desired format
const handleDateChangeRaw = (e) => {
  if (e) {
    const formattedDate = new Date(e).toISOString().substring(0, 10);
    onChange(formattedDate);
  } else {
    onChange(null); // Set the date to null if it's undefined or null
  }
};


  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <DatePicker
        selected={selectedDate==='0000-00-00'?'':selectedDate}
        onChange={handleDateChangeRaw}
        startDate={startDate}
        endDate={endDate}
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd" // Set the date format for display (optional)
        className={`date-picker ${error ? 'error' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomDatePicker;
