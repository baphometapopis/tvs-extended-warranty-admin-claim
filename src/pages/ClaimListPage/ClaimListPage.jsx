import React, { useCallback, useEffect, useState } from 'react';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
// import { getAllProposalListApi } from '../Api/FetchAllProposalList';
// import { Search } from '../Constant/ImageConstant';

import './ClaimListPage.css'
// import Dropdown from '../Component/UI/Dropdown';
import ClaimListTable from './ClaimListTable';

import { getUserSession } from '../../utils/auth';
import { calculatePagination } from '../../utils/calculatePagination';
import { makeApiCall } from '../../Api/makeApiCall';
import { Api_Endpoints } from '../../Api/apiEndpoint';
import { SearchIcon } from '../../Constant/ImageConstant';
import Dropdown from '../../components/UI/Dropdown';
import FilterContainer from '../../components/FilterComponent/FilterContainer';
import { showErrorToast, showSuccessToast } from '../../utils/toastService';

const  ClaimListPage=()=> {
  const [dropDownData,setdropDownData]=useState([])

  const [filterValue,setFilterValue]=useState({
     searchParam:'',productType:'',Status:''
    }
      )
  // breakin_status  -> 0 : pending, 1: inprogress , 2: rejected , 3: referback, 4: completed, 

  const status=[
    {
      "id": 0,
      "label": "Pending"
  },
  {
      "id": 1,
      "label": "InProgress"
  },
  {
      "id": 2,
      "label": "Rejected"
  },
  {
      "id": 3,
      "label": "Refer Back"
  },
  {
    "id": 4,
    "label": "Completed"
},
]

const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState();
  
    const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  
    const handleOpenFilterDrawer = () => {
      setFilterDrawerVisible(true);
    };
  
    const handleCloseFilterDrawer = () => {
      setFilterDrawerVisible(false);
    };
    const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);
  
    const [totalRecords, setTotalRecords] = useState("");
    const [policyList, setPolicyList] = useState([]);
  
    const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
    const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
    const recordsPerPage = 10;
    const [isMobile, setisMobile] = useState(false);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      const pagination = calculatePagination(
        totalRecords,
        recordsPerPage,
        pageNumber
      );
      settotalPage(pagination?.totalPages);
      // setIndexOfFirstRecord()
      setIndexOfFirstRecord(pagination?.startIndex);
      // setIndexOfFirstRecord(pageNumber * recordsPerPage);
    };
  
  
    const refreshpage = () => {};
  
    const handleRefresh = () => {
      // Disable the button
      setIsRefreshButtonDisabled(true);
  
      // GetProposalList();
  
      setTimeout(() => {
        // Enable the button after 10 seconds
        setIsRefreshButtonDisabled(false);
      }, 10000); // 10 seconds in milliseconds
    };
  


    const resetFilter=()=>{
      setFilterValue('')
      GetProposalList();
    }
    const GetProposalList = useCallback(() => {
      const decryptdata=''
      const data = getUserSession();
   

    
      const listdata = {
        type:0,
        status:1,
        page:currentPage,
        pageSize:10,
        // startDate:23/04/2024,
        // endDate:07/06/2024,
        searchTerm:''
      };
  
      if (indexOfFirstRecord !== indexOfLastRecord) {

        makeApiCall(Api_Endpoints.getClaimedPolicy, 'GET',listdata)
        .then((data) => {
            setPolicyList(data?.data?.data);
            setTotalRecords(data?.data?.totalRecords)
            const pagination = calculatePagination(
              data?.data?.totalRecords,
              recordsPerPage,
              0
            );
            settotalPage(pagination?.totalPages);
          })
          .catch((error) => {
            console.error(error, "dsdsds");
          });
      }
    }, [filterValue, indexOfFirstRecord, indexOfLastRecord, totalRecords]);
  

  
    // const getSearchValue = (prop) => {
    //   setfilterValue(prop);
    //   // console.log(prop);
    //   GetProposalList();
    // };
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth([window.innerWidth]);
      };
  
      window.addEventListener("resize", handleWindowResize);
      if (windowWidth <= 768) {
        setisMobile(false);
      } else {
        setisMobile(true);
      }
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [windowWidth]);
  
    useEffect(() => {
      setIndexOfLastRecord(currentPage * recordsPerPage);
    }, [currentPage, recordsPerPage, totalPage]);
  
    useEffect(() => {
      GetProposalList();
    }, [indexOfLastRecord, indexOfFirstRecord]);
  

const product=[
  {
      "id": 1,
      "label": "Private Car"
  },
  {
      "id": 2,
      "label": "Two Wheeler"
  },
  {
      "id": 3,
      "label": "Commercial"
  },
  {
      "id": 4,
      "label": "Taxi (1-6)"
  },
  {
      "id": 5,
      "label": "Threewheeler"
  },
  {
      "id": 7,
      "label": "Bus PCCV"
  },
  {
      "id": 8,
      "label": "Threewheeler"
  },
  {
      "id": 9,
      "label": "Misc D"
  },
  {
      "id": 10,
      "label": "3 wheeler (GCCV)"
  },
  {
      "id": 11,
      "label": "3 wheeler(PCCV) 6-17 Seater"
  },
  {
      "id": 12,
      "label": "Rickshow(PCCV) 3-6 Seater"
  },
  {
      "id": 13,
      "label": "Ecart Rickshow(GCCV)"
  },
  {
      "id": 14,
      "label": "Ecart rickshow(PCCV)"
  }
]

const handleFilterChange = async (data) => {

  try {

    // Switch-case statement to select endpoint based on selected report
   

    let postData={

      type:0,
status:data?.status??'',
startDate:data?.startDate??'',
endDate:data?.endDate??'',
searchTerm:data?.search??''
    }
    if (data) {
      const response = await makeApiCall(Api_Endpoints.getClaimedPolicy, 'GET',postData);
if(response?.status===200){
  setPolicyList(response?.data?.data)

if(response?.data?.data.length!==0){

  showSuccessToast('Record Found')

  }

}
else{

  showErrorToast(response?.message)
}

    } else {
      console.log('Invalid report selected');
    }
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
  }
};

const handleSearchChange = (event) => {
  
  setFilterValue(prevData=>({
    ...prevData,searchParam:event.target.value
  }))
};

const handleReset = () => {
  setFilterValue({
    searchParam: '',
    productType: '',
    Status: ''
  });
  GetProposalList();
};
const handleDropdownChange =(e,field)=>{
  const selectedValue=e.target.value;
  setFilterValue(prevData=>({
    ...prevData,[field]:selectedValue
  })) 
}
const fetchData=async()=>{
  const getstatus =      await   makeApiCall(Api_Endpoints.getStatus, 'GET');
  
  if(getstatus?.status===200){
    const dropdownData = [
     
      {
        label: "status",
        placeholder: 'Select Status',
        options: getstatus.data?.map((data) => ({
          value: data.status_id, // Assuming your API response contains a 'value' field
          label: data.name // Assuming your API response contains a 'label' field
        }))
      },
      // Add more dropdown objects as needed
    ];
  setdropDownData(dropdownData)
  
  
  
  }else
  {
    showErrorToast(getstatus?.message)
  }
  
    }


    useEffect(()=>{fetchData()},[])
useEffect(()=>{

},[filterValue,policyList])



    return (
      <div style={{height:'100%'}}>
      
     
        {/* <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
          <LineChart />
        </div> */}



      <FilterContainer
      dropdownData={dropDownData}
        handleSearchChange={handleSearchChange}
        handleDropdownChange={handleDropdownChange}
        handleReset={handleReset}
        product={product}
        handleFilterChange={handleFilterChange}
        status={status}
      />

            <div className="flex gap-5">
              <h1 className="text-2xl font-bold mb-4">Claim List</h1>
              {/* {!isMobile && (
                <img
                  src={IconFilter}
                  className="w-[35px]  h-[30px]"
                  alt="search_image"
                  onClick={handleOpenFilterDrawer}
                />
              )} */}
              <Tippy
                content={
                  isRefreshButtonDisabled ? "wait 10 sec " : "Refresh Files"
                }
                placement="right"
                arrow={true}
                className="rounded-sm text-xs"
              >
                {/* <img
                  src={Refresh}
                  className={`w-[35px] h-[30px]   ${
                    isRefreshButtonDisabled
                      ? "cursor-not-allowed animate-spin-slow"
                      : "cursor-pointer"
                  } ${isRefreshButtonDisabled ? "opacity-50" : ""}`}
                  alt="search_image"
                  onClick={() => !isRefreshButtonDisabled && handleRefresh()}
                /> */}
              </Tippy>
            </div>
            {/* <FilterDrawer
              visible={filterDrawerVisible}
              onClose={handleCloseFilterDrawer}
            /> */}
  
            {/* {isMobile && (
              <SearchContainer
                getSearchValue={getSearchValue}
                searchType={"policy"}
              />
            )} */}
            <ClaimListTable data={policyList} refresh={refreshpage} />
  
            <div style={{display:'flex',justifyContent:'space-between',marginRight:'10px',alignItems:'center'}}>
              <span style={{color:'black'}}>
                Showing {indexOfFirstRecord + 1} to {indexOfFirstRecord + 10} of{" "}
                {totalRecords} entries
              </span>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
              <span style={{color:'black'}}>
                  Page {currentPage} of {totalPage}
                </span>
  
                <p
  className='paginationbutton'
onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </p>
                <p
                  className='paginationbutton'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPage}
                >
                  Next
                </p>
              </div>
            </div>
       
      </div>
    );
  }

export default ClaimListPage;