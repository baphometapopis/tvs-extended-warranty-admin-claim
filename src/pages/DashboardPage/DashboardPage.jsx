import React, { useEffect, useState } from 'react';
import { Api_Endpoints } from '../../Api/apiEndpoint';
import { makeApiCall } from '../../Api/makeApiCall';
import { AvgClaimIcon, ClaimIcon, FilterIcon, SoldPolicyIcon, TATICon } from '../../Constant/ImageConstant';
import MonthlyBarChart from './Charts/MonthlyBarChart';
import { DoughnutChart, PieChart } from './Charts/PieChart';
import './DashboardPage.css';
import ModalComponent from './FilterModal/FilterModal';
import TopClaimParts from './TopClaimedParts/TopClaimParts';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelDropdown, setModelDropDown] = useState([]);
    const [top5PartsforClaim, setTop5PartsforClaim] = useState([]);
    const [top5PartsforClaimFiltered, settop5PartsforClaimFiltered] = useState([]);
    const [top5PartsforClaimappliedFilter, settop5PartsforClaimappliedFilter] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [Dashboardcounts,setDashboardcounts]=useState('')





  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  




    const applyYear =async(year)=>{
        const response = await makeApiCall(Api_Endpoints.dashboard_count, 'GET',{year:year});
        if(response?.status===200){

           
            setMonthlyData(response?.data?.dashboardDetails?.monthlyData)}
       }
   
  
    const applyFilters = async(propo) => {
      const top5claimdata = await makeApiCall(Api_Endpoints.top5PartsforClaimAPi, 'GET',propo);
      if(top5claimdata?.status===200){
        settop5PartsforClaimFiltered(top5claimdata?.data)
      }
      settop5PartsforClaimappliedFilter(propo)

      handleCloseModal();
    };
const fetchData=async()=>{   

     const response = await makeApiCall(Api_Endpoints.dashboard_count, 'GET',);
     const top5claimdata = await makeApiCall(Api_Endpoints.top5PartsforClaimAPi, 'GET',);
    if(top5claimdata?.status===200){
     setTop5PartsforClaim(top5claimdata?.data)
}
     

if(response?.status===200){

     setDashboardcounts(response?.data?.dashboardDetails)
    
     console.log(response?.data?.dashboardDetails)
     setMonthlyData(response?.data?.dashboardDetails?.monthlyData)}
}

    useEffect(()=>{fetchData()},[])
  

 

      useEffect(()=>{},[top5PartsforClaim,Dashboardcounts])
    return (
        <div className="dashboard-container">
             <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // filters={filters}
        // handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
      />
            <div className="dashboard-item item-1">
            <div className="tat-container">
                <div className='tat-container1'>
                <img src={TATICon} style={{height:'40px',width:'40px',margin:' 5px 15px '}}/>
            
                </div>
                <p style={{fontSize:'44px',margin:'0px',color:'white',fontWeight:'bold'}}>
            {Dashboardcounts?.avg_claimCount_tat}
            <span style={{fontSize:'20px',marginLeft:'5px',color:'white',fontWeight:'normal'}}>days</span>
          </p>
                        <p style={{fontSize:'16px',margin:'0px',color:'white'}}>Average Claim TAT </p>


          </div>
          <div className="avgclaim-container">
                <div className='avgclaim-container1'>
                <img src={AvgClaimIcon} style={{height:'40px',width:'40px',margin:' 5px 15px '}}/>
                </div>
            <p style={{fontSize:'44px',margin:'0px',color:'white',fontWeight:'bold'}}>{Dashboardcounts?.highest_claim_size}</p>
            <p style={{fontSize:'16px',margin:'0px',color:'white'}}>Highest Claim </p>


          </div>

            </div>

            <div className="dashboard-item item-2">  
                <MonthlyBarChart monthlyData={monthlyData}  applyYear={applyYear}/>
</div>



            <div className="dashboard-item item-4">
            <div style={{width:'100%',height:'30%',display:'flex',gap:'15px',alignItems:'center',position:'relative'}}>
                
                {/* <img src={SoldPolicyIcon} style={{height:'50px',width:'50px'}}/> */}
                <span style={{fontSize:'50px',fontWeight:'400'}} className='legend-count'>{Dashboardcounts?.total_policies}</span>
                <p style={{position:'absolute',bottom:-25,color:'#cdcdcd'}}>Total Sold Policies</p></div>
<div>                <DoughnutChart chartData={Dashboardcounts}/>

</div>

<div style={{width:'100%',height:'100%',gap:'25px',position:'relative',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                
<div className="custom-legend">
                <div className="custom-legend-item">
                    <div className="custom-legend-indicator">
                        <div className="custom-legend-circle">
                            <div className="custom-legend-inner-circle"></div>
                        </div>
                        <span className="custom-legend-text">Approved Claims</span>
                    </div>
                    <span className='legend-count'>{Dashboardcounts?.approve_claim}</span>
                </div>
                <div className="custom-legend-item">
                    <div className="custom-legend-indicator">
                        <div className="custom-legend-circle" style={{ backgroundColor: '#f55734' }}>
                            <div className="custom-legend-inner-circle"></div>
                        </div>
                        <span className="custom-legend-text">Rejected Claims</span>
                    </div>
                    <span className='legend-count'>{Dashboardcounts?.reject_claim}</span>
                </div>
                <div className="custom-legend-item">
                    <div className="custom-legend-indicator">
                        <div className="custom-legend-circle" style={{ backgroundColor: '#F89880' }}>
                            <div className="custom-legend-inner-circle"></div>
                        </div>
                        <span className="custom-legend-text">ReferBack Claims</span>
                    </div>
                    <span className='legend-count'>{Dashboardcounts?.referBack_claim}</span>
                </div>
                 <div className="custom-legend-item">
                    <div className="custom-legend-indicator">
                        <div className="custom-legend-circle" style={{ backgroundColor: '#ffbf00' }}>
                            <div className="custom-legend-inner-circle"></div>
                        </div>
                        <span className="custom-legend-text">Pending Claims</span>
                    </div>
                    <span className='legend-count'>{Dashboardcounts?.pending_claim}</span>
                </div>
               
                

            </div>
            <div className="custom-legend-item">
                    <div className="custom-legend-indicator">
                        <div className="custom-legend-circle"style={{ backgroundColor: 'white' }} >
                        <img src={ClaimIcon} style={{height:'55px',width:'55px'}}/>
                        </div>
                        <span className="custom-legend-text" style={{fontSize:'28px',marginLeft:'15px'}}>Total Claim</span>
                    </div>
                    <span className='legend-count' style={{fontSize:'28px'}}>{Dashboardcounts?.total_claim}</span>
                </div>
          
       
                </div>


                </div>
                <div className="dashboard-item item-3">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
            <h2>Top 5 Claimed Parts</h2>

            <div>

           
            </div>
      <img src={FilterIcon} onClick={handleOpenModal} style={{height:'25px',width:'25px',cursor:'pointer'}}/>


</div>
                {/* <button className="open-modal-button" onClick={handleOpenModal}>
        Open Filter Modal
      </button> */}


     <TopClaimParts topParts={top5PartsforClaim} filteredParts={top5PartsforClaimFiltered} appliedFiltered={top5PartsforClaimappliedFilter}/>

            </div>        </div>
    );
}

export default Dashboard;
