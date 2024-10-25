/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */


import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Api_Endpoints } from '../../Api/apiEndpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import Dropdown from '../../components/UI/Dropdown';
import TextInput from '../../components/UI/TextInput';
import { CloseIcon, Downloadpdf, EditIcon, ViewIcon } from '../../Constant/ImageConstant';
import { showErrorToast, showSuccessToast } from '../../utils/toastService';
import './ClaimViewPage.css';
import ImageModal from './ImageModal';

export const ClaimViewPage = () => {
const data = useLocation()
const ClaimNumber=data?.state?.data?.claimNumber
const navigate= useNavigate()
const [attachments,setAttachments]=useState(null)
// const attachments = { 
//   "Services": {
//     "serviceHistory1": "service_history_1",
//     "serviceHistory2": "service_history_2",
//     "serviceHistory3": null
//   },
//   // "ECM": {
//   //   "ErrorCode01": "Errorcode1",
//   //   "ErrorCode02": null
//   // }
// };


const [formData, setFormData] = useState({
  claim_id: '',
  policy_id: '',
  customer_id: '',
  proposalId: '',
  claim_status: '',
  claim_reason: '',
  uniqueReferenceNumber: '',
  VehicleType: '',
  ProductType: '',
  EngineNumber: '',
  Manufacturer: '',
  ChassisNumber: '',
  Model: '',
  Variant: '',
  ManufacturingMonthYear: '',
  RegistrationDate: '',
  VehicleRegistrationNo: '',
  RTO: '',
  RegCode: '',
  RegistrationNo: '',
  OdometerReading: '',
  NewOdoMeterReading: '',
  AadharNumber: '',
  PanNo: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Mobile: '',
  PinCode: '',
  plan_id: '',
  finalPayable: '',
  planEndDate: '',
  CurrentPolicyExpiryDate: '',
  Address1: '',
  Address2: '',
  City: '',
  State: '',
  createdBy: '',
  createdAt: '',
  updatedAt: '',
  StatusId: ''
});



  const [ogEstimation,setOgEstimation]=useState([])
  const [adminStatus,setAdminStatus]=useState([])


// const ogEstimation =[
//   { id: 1, part_description: 'part1', hsn_code: 'HSN001', mrp: '250', qty: '2', tax_rate: '3%', mrp: '1212',model:'Apache' },
//   { id: 2, part_description: 'part2', hsn_code: 'HSN002', mrp: '250', qty: '2', tax_rate: '3%', mrp: '12',model:'Apache' },
//   { id: 3, part_description: 'part3', hsn_code: 'HSN003', mrp: '250', qty: '2', tax_rate: '3%', mrp: '21212',model:'Apache' },
//   { id: 4, part_description: 'part4', hsn_code: 'HSN004', mrp: '250', qty: '2', tax_rate: '3%', mrp: '342',model:'Apache' },
// ]

  const [estimations, setEstimations] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedTab, setSelectedTab] = useState('claim_details'); // Default tab is 'claim_details'
  const [isEditing, setIsEditing] = useState(null); // Track which row is being edited
  const [editedEstimations, setEditedEstimations] = useState([]); // Track the updated estimation data

  const [status, setStatus] = useState('');
  const [adminComment, setadminComment] = useState('');

  const handleChangeText = (event) => {
    setadminComment(event.target.value);
};

  const handleChange = (e, field, index = null) => {

    if (index !== null) {
      const updatedEstimations = estimations?.map((item, idx) =>
        idx === index ? { ...item, [field]: e.target.value } : item
      );
      setEstimations(updatedEstimations);
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };
  const handleEditClick = (index) => {

    setIsEditing(index);
  };

  const handleCancelEdit = (index) => {
    setEditedEstimations((prev) => {
      const updatedEstimations = [...prev];
      updatedEstimations.splice(index, 1); // Remove the estimation at the specified index
      return updatedEstimations;
    });
    setIsEditing(null); // Reset the editing state
  };
  
  const handleUpdateClick = (index) => {
    // Clone the original estimation at the specified index
    const updatedEstimation = { ...estimations[index] };
  
    // Assume new values are provided here for demonstration purposes
    // You would replace this with your actual logic to get updated values
  
    // Track if any value has changed
    let isEstimationChanged = false;
  
    // Check if any value in the updated estimation is different from the original
    Object.keys(updatedEstimation).forEach((key) => {
      if (estimations[index][key] !== ogEstimation[index][key]) {
        isEstimationChanged = true;
      }
    });
  
    // If any value has changed
    if (isEstimationChanged) {
      // Update the editedEstimations array
      setEditedEstimations((prev) => {
        // Check if the updated estimation already exists in the editedEstimations array
        const existingIndex = prev.findIndex(est => est.id === updatedEstimation.id);
        if (existingIndex !== -1) {
          // If it exists, update the existing estimation
          const newEditedEstimations = [...prev];
          newEditedEstimations[existingIndex] = updatedEstimation;
          return newEditedEstimations;
        } else {
          // If it doesn't exist, push the new estimation
          return [...prev, updatedEstimation];
        }
      });
  
      // Update the estimations array
      const newEstimations = [...estimations];
      newEstimations[index] = updatedEstimation;
      setEstimations(newEstimations);
    }
  
    setIsEditing(null);
  };
  

  
  

 
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };


  const updateClaimStatus = async () => {
  
    let allEstimationsUpdated = true;
  
    // Update estimations if there are any edited estimations
    if (editedEstimations.length > 0) {
      for (const estimation of editedEstimations) {
        const updateEstimation = {
          claim_id: formData?.claim_id,
          part_estimation: {
            id: estimation.id,
            claim_id: estimation?.claim_id,
            customer_id: estimation.customer_id,
            part_code: estimation.part_code,
            hsn_code: estimation.hsn_code,
            tax_rate: estimation.tax_rate,
            part_description: estimation.part_description,
            mrp: estimation.mrp,
            repair_mrp: estimation.repair_mrp,
            labour_gst: estimation.labour_gst,
            labour_charge: estimation.labour_charge,
            repair_tax_rate: estimation.repair_tax_rate,
            total_mrp: estimation.total_mrp
          }
        };
  
        const editEstimationres = await makeApiCall(Api_Endpoints.updateEstimation, 'POST', updateEstimation);
        if (editEstimationres?.status === 200) {
          showSuccessToast(editEstimationres?.message);
        } else {
          showErrorToast(editEstimationres?.message);
          allEstimationsUpdated = false; // Mark as false if any estimation update fails
        }
      }
    }
  
    // Update claim status only if all estimations were updated successfully
    if (allEstimationsUpdated) {
      const data = {
        claim_id: formData?.claim_id,
        status: editedEstimations.length > 0 ? 4 : status
      };
  
      const updatestatus = await makeApiCall(Api_Endpoints.updateStatus, 'POST', data);
      if (updatestatus?.status === 200) {
        showSuccessToast('Status Updated');
        navigate('/claims');
      } else {
        showErrorToast(updatestatus?.message);
      }
    } else {
      showErrorToast('Failed to update all estimations. Status update aborted.');
    }
  };
  
  

  const getClaimData = async () => {

    const getstatus =      await   makeApiCall(Api_Endpoints.getStatus, 'GET');


    const response = await makeApiCall(Api_Endpoints.getClaimDetails, 'GET', { claim_id: ClaimNumber });
    const claimData = response?.data;

   if(response?.status===200){ // Assuming claimData has a similar structure, you can update formData like this:
    setFormData({
      claim_id: claimData.claim_id,
      policy_id: claimData.policy_id,
      customer_id: claimData.customer_id,
      proposalId: claimData.proposalId,
      claim_status: claimData.claim_status,
      claim_reason: claimData.claim_reason,
      uniqueReferenceNumber: claimData.uniqueReferenceNumber,
      VehicleType: claimData.VehicleType,
      ProductType: claimData.ProductType,
      EngineNumber: claimData.EngineNumber,
      Manufacturer: claimData.Manufacturer,
      ChassisNumber: claimData.ChassisNumber,
      Model: claimData.Model,
      Variant: claimData.Variant,
      ManufacturingMonthYear: claimData.ManufacturingMonthYear,
      RegistrationDate: claimData.RegistrationDate,
      VehicleRegistrationNo: claimData.VehicleRegistrationNo,
      RTO: claimData.RTO,
      RegCode: claimData.RegCode,
      RegistrationNo: claimData.RegistrationNo,
      OdometerReading: claimData.OdometerReading,
      NewOdoMeterReading: claimData.NewOdoMeterReading,
      AadharNumber: claimData.AadharNumber,
      PanNo: claimData.PanNo,
      FirstName: claimData.FirstName,
      LastName: claimData.LastName,
      Email: claimData.Email,
      Mobile: claimData.Mobile,
      PinCode: claimData.PinCode,
      plan_id: claimData.plan_id,
      finalPayable: claimData.finalPayable,
      planEndDate: claimData.planEndDate,
      CurrentPolicyExpiryDate: claimData.CurrentPolicyExpiryDate,
      Address1: claimData.Address1,
      Address2: claimData.Address2,
      City: claimData.City,
      State: claimData.State,
      createdBy: claimData.createdBy,
      createdAt: claimData.createdAt,
      updatedAt: claimData.updatedAt,
      StatusId: claimData.StatusId
    });
    setAttachments({Services:claimData?.attachments??''})
    



    let tempEstimation = claimData?.PartEstimation;
let isAmountMismatched = false
    if (tempEstimation && tempEstimation.length > 0) {
      for (const estimationParts of tempEstimation) {
        // Calculation: BasePrice + (BasePrice * (GST / 100))
        let mrp = estimationParts?.mrp || 0;
        let mrpGST = estimationParts?.tax_rate / 100 || 0;
        let PartsTotal = mrp + (mrp * mrpGST);
    
        let labour_charge = estimationParts?.labour_charge || 0;
        let labour_gst = estimationParts?.labour_gst / 100 || 0;
        let labourTotal = labour_charge + (labour_charge * labour_gst);
    
        let CalculatedTotalMRP = PartsTotal + labourTotal;
    
        // Round TotalMRP to 2 decimal places
        let roundedTotalMRP = parseFloat(CalculatedTotalMRP.toFixed(2));
    
        // Check if the rounded TotalMRP matches the total_mrp in estimationParts
        estimationParts.CalculatedTotalMRP=CalculatedTotalMRP
        if (roundedTotalMRP === estimationParts?.total_mrp) {
          estimationParts.amountMatched = true;
        } else {
          estimationParts.amountMatched = false;
          console.log(roundedTotalMRP, "does not match", estimationParts?.total_mrp);
          isAmountMismatched = true
        }
      }
    
      // Update tempEstimation in claimData
      claimData.PartEstimation = tempEstimation;
    }

    if(getstatus?.status===200){

      let filteredData = getstatus?.data.filter(status => 
        status.status_id !== 1 && status.status_id !== 5
      );

     

    setAdminStatus(filteredData)}

    else{
      showErrorToast(getstatus?.message)
    }
    
    
    setOgEstimation(claimData.PartEstimation)


    setEstimations(claimData?.PartEstimation)
}else{
  showErrorToast(response?.message)

}
  };



  const downloadImage = (url) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
        })
        .then((blob) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = url.split('/').pop(); // Use the last part of the URL as the filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href); // Clean up the URL.createObjectURL
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
};



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const showModal = (url) => {
        setImageUrl(url);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };


useEffect(()=>{getClaimData();
},[])

  useEffect(()=>{


  },[estimations])
  return (
    <div className='ClaimViewContainer'>
      <div className='Tabs'>
        <button className={selectedTab === 'claim_details' ? 'active' : 'no-active'} onClick={() => setSelectedTab('claim_details')}> Claim Details</button>
        <button className={selectedTab === 'claim_estimation' ? 'active' : 'no-active'} onClick={() => setSelectedTab('claim_estimation')}>Claim Estimation</button>
        <button className={selectedTab === 'claim_attachments' ? 'active' : 'no-active'} onClick={() => setSelectedTab('claim_attachments')}>Claim Attachments</button>

        <button className={selectedTab === 'status' ? 'active' : 'no-active'} onClick={() => setSelectedTab('status')}>Status</button>
      </div>

      {selectedTab === 'claim_details' && (
        <div className='ClaimForm'>
        <div className='TextInputRow'>
        <TextInput
            label="Proposal No"
            name="policy_id"
            required={true}
            value={formData.proposalId}
            onChange={(e) => handleChange(e, 'proposalId')}
            placeholder="Enter Proposal number"
            error={formErrors.proposalId}
            isDisabled={true}
          />
           <TextInput
            label="Claim No"
            name="claim_id"
            required={true}
            value={formData?.claim_id}
            onChange={(e) => handleChange(e, 'claim_id')}
            placeholder="Enter Claim Id"
            error={formErrors.claim_id}
            isDisabled={true}

          />
        <TextInput
            label="Vehicle Type"
            name="VehicleType"
            required={true}
            value={formData.VehicleType}
            onChange={(e) => handleChange(e, 'VehicleType')}
            placeholder="Enter Engine number"
            error={formErrors.VehicleType}
            isDisabled={true}

          />
          
        </div>
        <div className='TextInputRow'>
        <TextInput
            label="Product Type"
            name="ProductType"
            required={true}
            value={formData.ProductType}
            onChange={(e) => handleChange(e, 'ProductType')}
            placeholder="Select Product"
            error={formErrors.ProductType}
            isDisabled={true}

          />
          <TextInput
            label="Engine Number"
            name="EngineNumber"
            required={true}
            value={formData.EngineNumber}
            onChange={(e) => handleChange(e, 'EngineNumber')}
            placeholder="Enter Engine number"
            error={formErrors.EngineNumber}
            isDisabled={true}

          />
          <TextInput
            label="Chassis Number"
            name="ChassisNumber"
            required={true}
            value={formData.proposal_no}
            onChange={(e) => handleChange(e, 'ChassisNumber')}
            placeholder="Enter Chassis number"
            error={formErrors.ChassisNumber}
            isDisabled={true}

          />
          
         
        </div>
        <div className='TextInputRow'>
        <TextInput
            label="Model"
            name="model"
            required={true}
            value={formData.model}
            onChange={(e) => handleChange(e, 'model')}
            placeholder="Enter Model"
            error={formErrors.model}
            isDisabled={true}

          />
       <TextInput
            label="Manufacturer"
            name="Manufacturer"
            required={true}
            value={formData.Manufacturer}
            onChange={(e) => handleChange(e, 'Manufacturer')}
            placeholder="Enter Manufacturer"
            error={formErrors.Manufacturer}            isDisabled={true}

          />
        <TextInput
            label="Manufacturing Month/Year "
            name="ManufacturingMonthYear"
            required={true}
            value={formData.ManufacturingMonthYear}
            onChange={(e) => handleChange(e, 'ManufacturingMonthYear')}
            placeholder="Enter Manufacturing Year"
            error={formErrors.ManufacturingMonthYear}
            isDisabled={true}

          />
        
        
        
        </div>
        <div className='TextInputRow'>
        <TextInput
            label="Registration No"
            name="VehicleRegistrationNo"
            required={true}
            value={formData.VehicleRegistrationNo}
            onChange={(e) => handleChange(e, 'VehicleRegistrationNo')}
            placeholder="Enter Registration Number"
            error={formErrors.VehicleRegistrationNo}
            isDisabled={true}

          />
          <TextInput
            label="Registartion Date"
            name="RegistrationDate"
            required={true}
            value={formData.RegistrationDate}
            onChange={(e) => handleChange(e, 'RegistrationDate')}
            placeholder="Enter Registration Date"
            error={formErrors.RegistrationDate} 
            isDisabled={true}

          
          />
          <TextInput
            label="Odometer Reading"
            name="OdometerReading"
            required={true}
            value={formData.OdometerReading}
            onChange={(e) => handleChange(e, 'OdometerReading')}
            placeholder="Enter Odometer Reading"
            error={formErrors.OdometerReading}
            isDisabled={true}

          />
         


      
        </div>
        <div className='TextInputRow'>
        <TextInput
            label="First Name"
            name="FirstName"
            required={true}
            value={formData.FirstName}
            onChange={(e) => handleChange(e, 'FirstName')}
            placeholder="Enter First Name"
            error={formErrors.FirstName}
            isDisabled={true}

          />
         <TextInput
            label="Last Name"
            name="LastName"
            required={true}
            value={formData.LastName}
            onChange={(e) => handleChange(e, 'LastName')}
            placeholder="Enter Last Name"
            error={formErrors.LastName}
            isDisabled={true}

          />
         <TextInput
            label="Email"
            name="Email"
            required={true}
            value={formData.Email}
            onChange={(e) => handleChange(e, 'Email')}
            placeholder="Enter Email"
            error={formErrors.Email}
            isDisabled={true}

          />
        
        </div>

        <div className='TextInputRow'>
        <TextInput
            label="Mobile No"
            name="Mobile"
            required={true}
            value={formData.Mobile}
            onChange={(e) => handleChange(e, 'Mobile')}
            placeholder="Enter  Mobile Number"
            error={formErrors.Mobile}
            isDisabled={true}

          />
         <TextInput
            label="Aadhaar No"
            name="AadharNumber"
            required={true}
            value={formData.AadharNumber}
            onChange={(e) => handleChange(e, 'AadharNumber')}
            placeholder="Enter Aadhaar No"
            error={formErrors.AadharNumber}
            isDisabled={true}

          />
         <TextInput
            label="Pan No"
            name="PanNo"
            required={true}
            value={formData.PanNo}
            onChange={(e) => handleChange(e, 'PanNo')}
            placeholder="Enter Pan No"
            error={formErrors.PanNo}
            isDisabled={true}

          />
        
        </div>
        <div className='TextInputRow'>
        <TextInput
            label="Address 1"
            name="Address1"
            required={true}
            value={formData.Address1}
            onChange={(e) => handleChange(e, 'Address1')}
            placeholder="Enter Address"
            error={formErrors.Address1}
            isDisabled={true}

          />
         <TextInput
            label="Address 2"
            name="Address2"
            required={true}
            value={formData.Address2}
            onChange={(e) => handleChange(e, 'Address2')}
            placeholder="Enter Address"
            error={formErrors.Address2}
            isDisabled={true}

          />
         <TextInput
            label="State"
            name="State"
            required={true}
            value={formData.State}
            onChange={(e) => handleChange(e, 'State')}
            placeholder="Enter State"
            error={formErrors.State}
            isDisabled={true}

          />
        
        </div>   <div className='TextInputRow'>
        <TextInput
            label="City"
            name="City"
            required={true}
            value={formData.City}
            onChange={(e) => handleChange(e, 'City')}
            placeholder="Enter City"
            error={formErrors.City}
            isDisabled={true}

          />
         <TextInput
            label="Pincode"
            name="PinCode"
            required={true}
            value={formData.PinCode}
            onChange={(e) => handleChange(e, 'PinCode')}
            placeholder="Enter PinCode"
            error={formErrors.PinCode}
            isDisabled={true}

          />
         <TextInput
            label="New Odometer"
            name="NewOdoMeterReading"
            required={true}
            value={formData.NewOdoMeterReading}
            onChange={(e) => handleChange(e, 'NewOdoMeterReading')}
            placeholder="Enter New Odometer"
            error={formErrors.NewOdoMeterReading}
            isDisabled={true}

          />
        
        </div>
  
      </div>

      )}


{selectedTab === 'claim_estimation' && (
        <div className='ClaimEstimation'>
          <div className='EstimationHeader'>
            <div className='HeaderItem'>Category</div>
            <div className='HeaderItem'>HSN CODE</div>
            <div className='HeaderItem'>Model</div>

            <div className='HeaderItem'>Unit Price</div>
            <div className='HeaderItem'>GST</div>
            <div className='HeaderItem'>labour Charge</div>
            <div className='HeaderItem'>labour GST</div>

            <div className='HeaderItem'>Total</div>
{isEditing!==null && <div className='HeaderItem'>Action</div>}
          </div>
          <div>
          {estimations?.length>0?  <>
          {estimations?.map((estimation, index) => (
            <div className='EstimationRow' key={index}>

              {isEditing === index ? (
                <>

                  <TextInput
                    name="category"
                    value={estimation.part_description}
                    onChange={(e) => handleChange(e, 'part_description', index)}
                    placeholder="Enter Category"
                    error={formErrors.part_description}
                    isDisabled={true}
                  />
                  <div className='PlainText'>{estimation.hsn_code}</div>
                  <TextInput
                    name="Model"
                    value={estimation.model}
                    onChange={(e) => handleChange(e, 'model', index)}
                    placeholder="Enter Model"
                    error={formErrors.model}
                    isDisabled={true}
                  />
                  <TextInput
                    name="mrp"
                    value={estimation.mrp}
                    onChange={(e) => handleChange(e, 'mrp', index)}
                    placeholder="Enter Unit Price"
                    error={formErrors.mrp}
                    isDisabled={true}
                  />
                
                  <TextInput
                    name="tax_rate"
                    value={estimation.tax_rate}
                    onChange={(e) => handleChange(e, 'tax_rate', index)}
                    placeholder="Enter GST"
                    error={formErrors.tax_rate}
                    isDisabled={true}
                  />
                   <TextInput
                    name="labour_charge"
                    value={estimation.labour_charge}
                    onChange={(e) => handleChange(e, 'labour_charge', index)}
                    placeholder="Enter Labour Charge"
                    error={formErrors.labour_charge}
                    isDisabled={false}
                  />
                   <TextInput
                    name="labour_gst"
                    value={estimation.labour_gst}
                    onChange={(e) => handleChange(e, 'labour_gst', index)}
                    placeholder="Enter Labour GST"
                    error={formErrors.labour_gst}
                    isDisabled={true}
                  />
                  <TextInput
                    name="total_mrp"
                    value={estimation.total_mrp}
                    onChange={(e) => handleChange(e, 'total_mrp', index)}
                    placeholder="Enter Total"
                    error={formErrors.total_mrp}
                    isDisabled={true}
                  />

                  <button style={{backgroundColor:'green'}} onClick={() => handleUpdateClick(index,)}>Update</button>
                </>
              ) : (
                <>
                  <TextInput
                    name="part_description"
                    value={estimation.part_description}
                    onChange={(e) => handleChange(e, 'part_description', index)}
                    placeholder="Enter Category"
                    error={formErrors.part_description}
                    isDisabled={true}
                  />
                  <div className='PlainText'>{estimation.hsn_code}</div>
                  <TextInput
                    name="model"
                    value={estimation.model}
                    onChange={(e) => handleChange(e, 'model', index)}
                    placeholder="Enter Model"
                    error={formErrors.model}
                    isDisabled={true}
                  />
                  <TextInput
                    name="mrp"
                    value={estimation.mrp}
                    onChange={(e) => handleChange(e, 'mrp', index)}
                    placeholder="Enter Unit Price"
                    error={formErrors.mrp}
                    isDisabled={true}
                  />
                
                  <TextInput
                    name="tax_rate"
                    value={estimation.tax_rate}
                    onChange={(e) => handleChange(e, 'tax_rate', index)}
                    placeholder="Enter GST"
                    error={formErrors.tax_rate}
                    isDisabled={true}
                  />
                   <TextInput
                    name="labour_charge"
                    value={estimation.labour_charge}
                    onChange={(e) => handleChange(e, 'labour_charge', index)}
                    placeholder="Enter Labour Charge"
                    error={formErrors.labour_charge}
                    isDisabled={true}
                  />
                    <TextInput
                    name="labour_gst"
                    value={estimation.labour_gst}
                    onChange={(e) => handleChange(e, 'labour_gst', index)}
                    placeholder="Enter Labour GST"
                    error={formErrors.labour_gst}
                    isDisabled={true}
                  />
                  <TextInput
                    name="total_mrp"
                    value={estimation.total_mrp}
                    onChange={(e) => handleChange(e, 'total_mrp', index)}
                    placeholder="Enter Total"
                    // error={estimation.amountMatched===false?`Amount Mismatched -  Calculated ${Math.round(estimation?.CalculatedTotalMRP)}`:''}
                    isDisabled={true}
                  />
              {/* {estimation.amountMatched===false&& <p>Amount Mismatched{estimation.amountMatched}</p> } */}

{/* {estimation.amountMatched===true&& <img onClick={() => handleEditClick(index)} alt='edit Icon' src={EditIcon} style={{width:'25px',height:'25px',position:'absolute',right:5,top:0}}/>
} */}
<img onClick={() => handleEditClick(index)} alt='edit Icon' src={EditIcon} style={{width:'25px',height:'25px',position:'absolute',right:5,top:0}}/>

                </>
              )}
            </div>
          ))}
          </>:<p style={{fontWeight:'bold',fontSize:'22px',textAlign:'center'}}>No Parts Estimation found</p>}
          </div>
        </div>
      )}

{selectedTab === 'claim_attachments' && ( <div className="attachment-container">
  {console.log(attachments,'khgjkh kjh khj')}
      {Object.entries(attachments)?.map(([category, files], index) => (
        <div key={index} className="category-section">
          <h2>{category}</h2>
          <ul className="attachment-list">
            {Object.entries(files)?.map(([fileKey, fileValue], index) => (
              <li key={index} className="attachment-item">
<span>{fileKey === 'firstServiceFile' ? 'First Service' : fileKey === 'secondServiceFile' ? 'Second Service' : fileKey === 'thirdServiceFile' ? 'Third Service':fileKey}</span>
                {fileValue ? (
                  <div>
                    <img   onClick={()=>showModal(fileValue)} alt= 'View Icon' style={{width:'30px',cursor:'pointer',marginRight:'15px'}} src={ViewIcon} />
   <img  onClick={()=>downloadImage(fileValue)}  src={Downloadpdf} alt='Download Icon'  style={{width:'30px',cursor:'pointer'}}  />

                   
                  </div>
                ) : (
                  <span className="not-available">Not Available</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}


      {/* <p>Parts Attachments</p> */}


      <div className="category-section">
    <h2>Parts Attachments</h2>
    <ul className="attachment-list">
      {estimations.map((estimation, index) => (
        <li key={estimation.id} className="attachment-item">
          <h3>{estimation.part_description}</h3>
          {/* Render images from image1 to image5 */}
          {[...Array(5)].map((_, imageIndex) => {
            const imageKey = `image${imageIndex + 1}`;
            const imageValue = estimation[imageKey];
            return (
              <div key={imageIndex}>
                {imageValue ? (
                  <div>
                    <img
                      onClick={() => showModal(imageValue)}
                      alt="View Icon"
                      style={{ width: '30px', cursor: 'pointer', marginRight: '15px' }}
                      src={ViewIcon}
                    />
                    <img
                      onClick={() => downloadImage(imageValue)}
                      src={Downloadpdf}
                      alt="Download Icon"
                      style={{ width: '30px', cursor: 'pointer' }}
                    />
                  </div>
                ) : (
                  <span className="not-available">Not Available</span>
                )}
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  </div>

    </div>)}



      {selectedTab === 'status' && (
        <div className='UpdateStatus'>
           <Dropdown
        
        value={editedEstimations.length > 0 ? 4 :status } // Select ReferBack by default if no data in updated estimations

        onChange={handleChangeStatus}
        options={ adminStatus?.map((data) => ({
          value: data.status_id, // Assuming your API response contains a 'value' field
          label: data.name // Assuming your API response contains a 'label' field
        }))}
        

        placeholder="Select Status "
        isDisabled={editedEstimations.length > 0}// Disable dropdown if there are data in updated estimations
      
      />
        <textarea value={adminComment}  onChange={handleChangeText} style={{width:'100%',height:'150px',marginTop:'25px'}} placeholder="Enter Remarks"></textarea>
<div  style={{width:'fit-content',padding:'3px 0px',borderRadius:'25px',border:'2px solid #253C80',marginTop:'10px',cursor:'pointer'}}>
        <p  onClick={updateClaimStatus} style={{color:'#253C80',margin:'5px 20px'}}>Submit</p>
        </div>
<h2>Updated Estimation</h2>

{editedEstimations?.map((editedEstimations, index) => (
  
            <div className='EstimationRow' key={index}   >


              
                <>

                  <TextInput
                    name="category"
                    value={editedEstimations.part_description}
                    onChange={(e) => handleChange(e, 'category', index)}
                    placeholder="Enter Category"
                    error={formErrors.part_description}
                    isDisabled={true}
                  />
                  <div className='PlainText'>{editedEstimations.hsn_code}</div>
                  <TextInput
                    name="mrp"
                    value={editedEstimations.mrp}
                    onChange={(e) => handleChange(e, 'mrp', index)}
                    placeholder="Enter Unit Price"
                    error={formErrors.mrp}
                    isDisabled={true}
                  />
                  <TextInput
                    name="qty"
                    value={editedEstimations.qty}
                    onChange={(e) => handleChange(e, 'qty', index)}
                    placeholder="Enter Quantity"
                    error={formErrors.qty}
                    isDisabled={true}
                  />
                  <TextInput
                    name="tax_rate"
                    value={editedEstimations.tax_rate}
                    onChange={(e) => handleChange(e, 'tax_rate', index)}
                    placeholder="Enter GST"
                    error={formErrors.tax_rate}
                    isDisabled={true}
                  />
                    <TextInput
                    name="labour_charge"
                    value={editedEstimations.labour_charge}
                    onChange={(e) => handleChange(e, 'labour_charge', index)}
                    placeholder="Enter Labour Charge"
                    error={formErrors.labour_charge}
                    isDisabled={true}
                  />
                   <TextInput
                    name="labour_gst"
                    value={editedEstimations.labour_gst}
                    onChange={(e) => handleChange(e, 'labour_gst', index)}
                    placeholder="Enter Labour GST"
                    error={formErrors.labour_gst}
                    isDisabled={true}
                  />
                  <TextInput
                    name="total_mrp"
                    value={editedEstimations.total_mrp}
                    onChange={(e) => handleChange(e, 'total_mrp', index)}
                    placeholder="Enter Total"
                    error={formErrors.total_mrp}
                    isDisabled={true}
                  />
<img onClick={() => handleCancelEdit(index)}  alt='cancel icon'src={CloseIcon} style={{width:'25px',height:'25px',position:'absolute',right:5,top:0}}/>

                </>
            
            </div>
          ))}



        </div>

      )}
       <ImageModal
                isOpen={isModalOpen}
                onRequestClose={handleClose}
                imageUrl={imageUrl}
            />
    </div>
  );
};
