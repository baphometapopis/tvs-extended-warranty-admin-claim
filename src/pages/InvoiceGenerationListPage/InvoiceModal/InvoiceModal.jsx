import React, { useState } from 'react';
import './InvoiceModal.css';

const InvoiceModalComponent = ({ isOpen, onClose, onSubmit,data }) => {
  console.log(data)
  const [utrNo, setUtrNo] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [insuredName, setInsuredName] = useState("");
  const [date, setDate] = useState("");

  const handleUtrNoChange = (e) => {
    setUtrNo(e.target.value);
  };

  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  const handleInsuredNameChange = (e) => {
    setInsuredName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ utrNo, invoiceNumber, insuredName, date });
    setUtrNo("");
    setInvoiceNumber("");
    setInsuredName("");
    setDate("");
  };

  const maxDate = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-content ${isOpen ? 'slide-in' : 'slide-out'}`}>
        <p className="close-button" onClick={onClose}>
          &times;
        </p>
        <h2>Submit Invoice Details</h2>
        <div className="input-group1">
          <label>Invoice Number</label>
          <input 
            type="text" 
            value={invoiceNumber} 
            onChange={handleInvoiceNumberChange} 
            placeholder="Enter Invoice Number"
            className="input-field"
          />
        </div>
        <div className="input-group1">
          <label>Insured Name</label>
          <input 
            type="text" 
            value={insuredName} 
            onChange={handleInsuredNameChange} 
            placeholder="Enter Insured Name"
            className="input-field"
          />
        </div>
        <div className="input-group1">
          <label>UTR No</label>
          <input 
            type="text" 
            value={utrNo} 
            onChange={handleUtrNoChange} 
            placeholder="Enter UTR No"
            className="input-field"
          />
        </div>
        <div className="input-group1">
          <label>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={handleDateChange} 
            max={maxDate}
            className="input-field"
          />
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default InvoiceModalComponent;
