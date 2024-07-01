import React, { useEffect, useState } from 'react';
import { Api_Endpoints } from '../../../Api/apiEndpoint';
import { makeApiCall } from '../../../Api/makeApiCall';
import Dropdown from '../../../components/UI/Dropdown';
import { showErrorToast, showSuccessToast } from '../../../utils/toastService';
import './InvoiceModal.css';

const InvoiceModalComponent = ({ isOpen, onClose, onSubmit,data }) => {
  
  const [submitclicked,setSubmitClicked]=useState(false)

  const [utrNo, setUtrNo] = useState('');
  const [bankName, setBankName] = useState('');

  const [bankList, setBankList] = useState([]);


  const [invoiceDate, setInvoiceDate] = useState('');

  const handleUtrNoChange = (e) => {
    setUtrNo(e.target.value);
  };
  const handleBankNameChange = (e) => {
    console.log(e)
    setBankName(e.target.value);
  };

  const handleInvoiceDateChange = (e) => {
    setInvoiceDate(e.target.value);
  };

  const handleSubmit =async () => {
    if (!utrNo) {
      alert('UTR Number is required.');
      return;
    }
    if (!bankName) {
      alert('Bank Name is required.');
      return;
    }
    if (!invoiceDate) {
      alert('Invoice Date is required.');
      return;
    }
    const getInvoicedetails=await makeApiCall(Api_Endpoints.updateUTR,'POST',{
      "invoice_number" : data?.invoiceDetails[0]?.invoice_number,
      "utr_number" : utrNo,
      "payment_date" : invoiceDate,
      "payment_bank" : bankName
  })
    if(getInvoicedetails?.status!==200){
      showErrorToast(getInvoicedetails?.message)
    }
    else{
      showSuccessToast(getInvoicedetails?.message)

      setUtrNo('')
      setBankName('')
      setInvoiceDate('')
      // setSelectedRow(getInvoicedetails?.data);
      // setIsUtrModalOpen(true);
      

      onSubmit()

    }
  
    setSubmitClicked(true)
  };

  const maxDate = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format
// Format total amount to 2 decimal places
const formattedTotal = data?.total?.toFixed(2);

const fetchBankDetails=async()=>{

  const res = await makeApiCall(Api_Endpoints?.getBankList,"GET");
  setBankList(res?.data);
}
useEffect(()=>{
fetchBankDetails()

},[])

useEffect(()=>{},[bankList])


  return (
    <div className={`invoicemodal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`invoicemodal-content ${isOpen ? 'slide-in' : 'slide-out'}`}>
        <p className="invoiceclose-button" onClick={onClose}>
          &times;
        </p>
        <div className="invoicemodal-header">
          <h3>Invoice</h3>
        </div>
        <div style={{ padding: '20px' }}>
          <div className="info-section">
            <div className="info-left">
            <p><strong>Dealer Name:</strong> {data?.dealerName}</p>
              <p><strong>Address:</strong> {data?.customerinformation?.address}</p>
              <p><strong>GST:</strong>
                {data?.GST}</p>
            </div>
            {/* <div className="info-right">
              <p>Invoice Month: {data?.invoiceMonth}</p>
            </div> */}
          </div>
          <div className="utr-section">
            {data?.invoiceDetails[0]?.utr_number==='' ? (
              <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                <div>
              <p> <strong> Payment Bank:</strong> {data?.invoiceDetails[0]?.payment_bank}</p>

              <p><strong> UTR No: </strong>{data?.invoiceDetails[0]?.utr_number}</p>
              </div>
              <p><strong> Payment Date:</strong> {data?.invoiceDetails[0]?.payment_date}</p>
              </div>

            ) : (
              <>
              <div style={{display:'flex'}}>
              <input
                type="text"
                value={utrNo}
                onChange={handleUtrNoChange}
                placeholder="Enter UTR No"
                className="input-field"
              />
               <Dropdown
                onChange={(e)=>handleBankNameChange(e)}
                options={ bankList?.map((data) => ({
                  value: data.BankName, // Assuming your API response contains a 'value' field
                  label: data.BankName // Assuming your API response contains a 'label' field
                }))}
                placeholder={'Select Bank'}
                inputClassName={'bankDropDown'}
                
              />
                {/* <input
                type="text"
                value={bankName}
                onChange={handleBankNameChange}
                placeholder="Enter Bank Name"
                className="input-field"
              /> */}
                 <div className="date-section">
              <label style={{ marginRight: '10px' }}>Date</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={handleInvoiceDateChange}
                max={maxDate}
                className="input-field"
              />
            </div>
            </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
            <p onClick={handleSubmit} className="invoicesubmit-button">
              Update 
            </p>
          </div> 
          </>
            )}
         
          </div>
          <div className="details-section">
            <h3>Estimation Details</h3>
            <table className="estimation-table">
              <thead>
                <tr>
                  <th>Parts</th>
                  <th>Description</th>
                  <th>Part Code</th>
                  <th>HSN Code</th>
                  <th>Claim Type</th>
                  <th>MRP</th>
                  <th>Labour GST</th>
                  <th>Labour Charge</th>
                  <th>Repair Tax Rate</th>
                  <th>Repair MRP</th>
                  <th>Total MRP</th>
                </tr>
              </thead>
              <tbody>
                {data?.estimationdetails?.map((detail, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{index + 1}</td>
                    <td>{detail?.part_description??'-'}</td>
                    <td>{detail?.part_code??'-'}</td>
                    <td>{detail?.hsn_code??'-'}</td>
                    <td>{detail?.claim_type??'-'}</td>
                    <td>{detail?.mrp??'-'}</td>
                    <td>{detail?.labour_gst ?? '-'}</td>
                    <td>{detail?.labour_charge ?? '-'}</td>
                    <td>{detail?.repair_tax_rate ?? '-'}</td>
                    <td>{detail?.repair_mrp ?? '-'}</td>
                    <td>{detail?.total_mrp ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <p className="total-amount">Total Amount: ₹{formattedTotal}</p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default InvoiceModalComponent;
