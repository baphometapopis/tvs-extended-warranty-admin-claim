import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/UI/Dropdown';
import { SearchIcon } from '../../Constant/ImageConstant';
import './FilterContainer.css';
import { DatePicker } from "antd";
// import 'antd/dist/reset.css'; // Import Ant Design styles



const FilterContainer = ({ handleFilterChange, handleReset, dropdownData,removeSearchBar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDropdownValues, setSelectedDropdownValues] = useState({});

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

const handleFilterReset=()=>{
  handleReset();
  setSearchQuery('');
window.location.reload()
}


  const handleDropdownChange = (value, label) => {
    setSelectedDropdownValues(prevValues => ({
      ...prevValues,
      [label]: value?.target?.value
    }));
  };

  function convertDateFormat(dateString) {
    // Check if the date string matches the expected format using a regular expression
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(dateString)) {
      throw new Error('Invalid date format. Expected format is DD-MM-YYYY');
    }
  
    // Replace all occurrences of '-' with '/'
    const convertedDate = dateString.replace(/-/g, '/');
    return convertedDate;
  }
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
     const  startdate =  convertDateFormat(dates[0].format('DD-MM-YYYY'))
     const  endate =  convertDateFormat(dates[1].format('DD-MM-YYYY'))

      setSelectedDropdownValues(prevValues => ({
        ...prevValues,
        startDate:`${startdate}` ,
        endDate: endate
      }));
    }
  };

  const handleSubmit = () => {
    // Combine all filter values into a single object
    console.log(selectedDropdownValues)
    const filterData = {
      search: searchQuery,
      ...selectedDropdownValues
    };

    // Pass filter data to parent component
    handleFilterChange(filterData);
  };

  useEffect(()=>{

  },[selectedDropdownValues,searchQuery])
  return (
    <div className='filter-container'>
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
       {!removeSearchBar&& <div className="search-bar1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img src={SearchIcon} alt='search Icon' style={{ height: '25px', width: '25px', position: 'absolute', left: '15px' }} />
          {/* <p className='searchLabel'>Search</p> */}
        </div>}
        <div style={{ height: "50px", display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0px 55px' }}>
          <div style={{ width: '95%', display: 'flex', flexDirection: 'row', gap: "10px", }}>
            {dropdownData?.map((dropdown, index) => (
              <Dropdown
                key={index}
                onChange={(value) => handleDropdownChange(value, dropdown?.label)}
                options={dropdown.options}
                placeholder={`${dropdown.placeholder}`}
                
              />
            ))}
            <DatePicker.RangePicker
              onChange={handleDateChange}
              style={{
                border: "5px solid #fffff",
                borderRadius: "4px",
                backgroundColor: "white",
                height: '38px',
                marginTop: '10px'
              }} // Custom border style
            />

          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ color: 'white', height: 'fit-content', marginTop: '15px', borderRadius: '10px', border: '1px solid white',cursor:'pointer' }} onClick={handleSubmit}><p style={{ margin: '5px 10px' }}>Submit</p></div>
            <div style={{ color: 'red', height: 'fit-content', marginTop: '15px', borderRadius: '10px', border: '1px solid red',cursor:'pointer' }} onClick={handleFilterReset}><p style={{ margin: '5px 10px' }}>Reset</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterContainer;
