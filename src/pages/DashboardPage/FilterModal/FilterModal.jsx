import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Api_Endpoints } from '../../../Api/apiEndpoint';
import { makeApiCall } from '../../../Api/makeApiCall';
import { showErrorToast } from '../../../utils/toastService';
import './FilterModal.css';

const ModalComponent = ({ isOpen, onClose, applyFilters }) => {
  const [dealerOptions, setDealerOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const getData = async () => {
    const response1 = await makeApiCall(Api_Endpoints.getModel, 'GET');
    const response2 = await makeApiCall(Api_Endpoints.getState, 'GET');
    const response3 = await makeApiCall(Api_Endpoints.getDealerList, 'GET');

    if (response3?.status === 200) {
      setDealerOptions(response3?.data?.data?.map(dealer => ({
        value: dealer.UserMasterId,
        label: dealer.FullName,
      })));
    }else{
      showErrorToast(response3?.message)
    }

    if (response2?.status === 200) {
      setStateOptions(response2?.data?.map(state => ({
        value: state.state_id,
        label: state.state_name,
      })));
    }else{
      showErrorToast(response2?.message)
    }


    if (response1?.status === 200) {
      setModelOptions(response1.data?.map(model => ({
        value: model.model_id,
        label: model.model_name,
      })));
    }else{
      showErrorToast(response1?.message)
    }

  };

  const getCities = async (stateId) => {
    const response = await makeApiCall(Api_Endpoints.getCity, 'GET', { state_id: stateId });

    if (response?.status === 200) {
      setCityOptions(response.data?.map(city => ({
        value: city.city_id,
        label: city.city_name,
      })));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApplyFilters = () => {

    const filterData = {
      dealer_id: selectedDealer?.value ?? '',
      model_id: selectedModel?.value ?? '',
      city: selectedCity?.value ?? '',
      state: selectedState?.value ?? ''
    };

    console.log(filterData)

    setAppliedFilters([
      { label: 'Dealer ID', value: selectedDealer },
      { label: 'Model ID', value: selectedModel },
      { label: 'City', value: selectedCity },
      { label: 'State', value: selectedState }
    ].filter(filter => filter.value !== ''));

    // Call the applyFilters function with the filterData
    applyFilters(filterData);
  };

  const clearFilters = () => {
    setSelectedDealer(null);
    setSelectedModel(null);
    setSelectedState(null);
    setSelectedCity(null);
    setAppliedFilters([]);
    setCityOptions([]);

    // Call the applyFilters function with empty filter data
    applyFilters(null);
    

  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      outline: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#0089d1",
    }),
  };

  useEffect(()=>{},[selectedDealer,selectedCity,selectedModel,selectedState,appliedFilters,cityOptions])
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-content ${isOpen ? 'slide-in' : 'slide-out'}`}>
        <p className="close-button" onClick={onClose}>
          &times;
        </p>
        <h2>Filter Options</h2>
        {/* <div className="applied-filters">
          {appliedFilters.length > 0 && (
            <div className="applied-filters-container">
              <p className="applied-filters-title">Applied Filters:</p>
              <ul className="applied-filters-list">
                {appliedFilters.map((filter, index) => (
                  <li key={index} className="applied-filter">{filter.label}: {filter.value}</li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
        <div className="filter-dropdowns">
          <div className="dropdown-container">
            <label htmlFor="dealer_id">Dealer Name</label>
            <Select
              options={dealerOptions}
              placeholder="Select Option"
              onChange={(selectedOption) => {
                setSelectedDealer(selectedOption);
              }}
              styles={customStyles}
              value={selectedDealer}
            />
          </div>
          <div className="dropdown-container">
            <label htmlFor="model_id">Model Name</label>
            <Select
              options={modelOptions}
              placeholder="Select Option"
              onChange={(selectedOption) => {
                setSelectedModel(selectedOption);
              }}
              styles={customStyles}
              value={selectedModel}
            />
          </div>
          <div className="dropdown-container">
            <label htmlFor="state">State</label>
            <Select
              options={stateOptions}
              placeholder="Select Option"
              onChange={(selectedOption) => {
                setSelectedState(selectedOption);
                getCities(selectedOption?.value);
              }}
              styles={customStyles}
              value={selectedState}
            />
          </div>
          <div className="dropdown-container">
            <label htmlFor="city">City</label>
            <Select
              options={cityOptions}
              placeholder="Select Option"
              onChange={(selectedOption) => {
                setSelectedCity(selectedOption);
              }}
              styles={customStyles}
              value={selectedCity}
              isDisabled={!selectedState} // Disable if no state is selected
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {appliedFilters.length > 0 && (
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
          <button className="apply-button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
