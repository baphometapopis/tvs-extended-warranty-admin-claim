import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Downloadpdf, ViewIcon } from "../../Constant/ImageConstant";
// import CancelModal from "./Modal/PolicyModal/CancelModal";

const ClaimListTable = ({ data, refresh }) => {

  
  const navigate = useNavigate()
  const [isCancelModalOpen, setisCancelModalOpen] = useState(false);
  const [seletedCancelPolicyData, setseletedCancelPolicyData] = useState("");

  const openCancelModal = (prop) => {
    setisCancelModalOpen(true);
    setseletedCancelPolicyData(prop);
  };


  const handleViewReports=(params)=>{
    console.log(params?.row)
    navigate('/view-claim',{state:{
      data:params?.row
    }})
    


  }
const handleViewSuccesspage=(params)=>{
  navigate('/SuccessPage',{state:params?.row})


}



//   breakin_status  -> 0 : pending, 1: inprogress , 2: rejected , 3: referback, 4: completed, 

const getVariable = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
     
      case 1:
        return 'ReferBack';

        case 2:
            return 'Rejected';

            case 3:
        return 'Accepted';
               
      default:
        return ''
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':


        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
          padding:'5px',
          borderRadius:'8px'

        
        };
      case 'Accepted':
        return {
          backgroundColor: "#ff6347",
          color: "#ffffff",
          padding:'5px',

          borderRadius:'8px'
        
        };
      case 'Rejected':
        return {
          backgroundColor: "#dc143c",
          color: "#ffffff",
          padding:'5px',
          borderRadius:'8px'
        
        };
        case 'ReferBack':
            return {
              backgroundColor: "#3cb371",
              color: "#ffffff",
              padding:'5px',
              borderRadius:'8px'
            
            };
            case 4:
                return {
                  backgroundColor: "#00A36C",
                  color: "#ffffff",
                  padding:'5px',
                  borderRadius:'8px'
                
                };
      default:
        
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
        
        };
    }
  };


  const columns = [
  
    {
      field: "policyNumber",
      headerName: "Policy No",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "claimNumber",
      headerName: "Claim Id",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "claimHolderName",
      headerName: "Insured Name",
      width: 200,
      headerClassName: "super-app-theme--header",

     
    },
    

   {
  field: "status",
  headerName: "Claim Status",
  width: 200,
  headerClassName: "super-app-theme--header",
  renderCell: (params) => (
    <>
   {params?.value!==null&& <span
      
      style={getStatusStyle(params?.value)}
    >
{params?.value}
    </span>}
    </>
  ),
},

    {
      field: "created_at",
      headerName: "Created Date",
      width: 180,
      headerClassName: "super-app-theme--header",

      valueFormatter: (params) => {
        const formattedDate = moment(params?.value).format("DD-MM-YYYY");
        return formattedDate;
      },
    },
   
    {
      field: "",
      headerName: "Action",
      headerClassName: "super-app-theme--header",

      width: 350,
      renderCell: (params) => (
        <div  style={{display:'flex',gap:'5px',justifyContent:'center'}}>
    {params?.row?.breakin_status!==0&& <img  onClick={()=>handleViewReports(params)}  style={{width:'30px',cursor:'pointer'}} src={ViewIcon} />}
   {/* <img  src={Downloadpdf} onClick={()=>console.log('Download PDF')} style={{width:'30px',cursor:'pointer'}}  /> */}

        </div>
      ), // Pass policy_no or id to PolicyCard
    },
  ];
   

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          style={{ flexShrink: 0 }}
          width="240"
          height="200"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Records Found</Box> 
      </StyledGridOverlay>
    );
  }

  return (
    <Box
    
      sx={{
        height: '70%',
        width: "100%",
        "& ::-webkit-scrollbar": { display: "none" },
        // backgroundColor: "",
        border: "none",
      }}
    >
      {/* <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setisCancelModalOpen(false)}
        data={seletedCancelPolicyData}
        refresh={refresh}
      /> */}
      <DataGrid
              rows={data.map((row, index) => ({ ...row, id: index })) || []}

        pagination={false}
        // rows={data || []}
        rowCount={[]}
        columns={columns}
        rowsPerPageOptions={[]}
        getRowHeight={() => "auto"}
        sx={{
          border: "none",
          [`& .super-app-theme--header`]: {
            textAlign:'center',
            
            backgroundColor: "#2B2D42",
            color: "white",
          },
          [`& .${gridClasses.footerContainer}`]: {
            display: "none",
          },
          [`& .${gridClasses.cell}`]: {
            py: 2,
            border: "none",
          },
          [`& .${gridClasses.row}`]: {
            marginLeft: "3px",
            marginRight: "3px",
            marginTop: "12px",
            marginBottom: "12px",

            bgcolor: (theme) => theme.palette.mode === "white",
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            borderRadius: "12px",
            border: "1px",
          },
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        // sx={{ "--DataGrid-overlayHeight": "300px" }}
      />
    </Box>
  );
};

export default ClaimListTable;