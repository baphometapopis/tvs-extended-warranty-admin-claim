import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import InvoiceModalComponent from "./InvoiceModal/InvoiceModal";

const InvoiceGenerationListPageTable = ({ refresh }) => {
  const [isUtrModalOpen, setIsUtrModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const data = [
    {
      id: 1,
      proposal_no: "PRO123456",
      claim_no: "CLMV123456",
      invoice_no: "INV123456",

      insured_name: "Dealer One",
      utr_no: "UTR123456",
      invoice_status: 1,
      created_at: "2023-06-01T12:34:56",
    },
    {
      id: 2,
      proposal_no: "PRO123456",
      claim_no: "CLMV123456",
      invoice_no: "INV123456",      insured_name: "Dealer Two",
      utr_no: "UTR654321",
      invoice_status: 0,
      created_at: "2023-05-25T08:15:30",
    },
    {
      id: 3,
      proposal_no: "PRO123456",
      claim_no: "CLMV123456",
      invoice_no: "INV123456",      insured_name: "Dealer Three",
      utr_no: "UTR112233",
      invoice_status: 2,
      created_at: "2023-04-14T10:20:45",
    },
    {
      id: 4,
      proposal_no: "PRO123456",
      claim_no: "CLMV123456",
      invoice_no: "INV123456",      insured_name: "Dealer Four",
      utr_no: "UTR445566",
      invoice_status: 1,
      created_at: "2023-03-12T14:30:00",
    },
    {
      id: 5,
      proposal_no: "PRO123456",
      claim_no: "CLMV123456",
      invoice_no: "INV123456",      insured_name: "Dealer Five",
      utr_no: "",
      invoice_status: 3,
      created_at: "2023-02-28T09:45:12",
    },
  ];

  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCancelPolicyData, setSelectedCancelPolicyData] = useState("");

  const openCancelModal = (prop) => {
    setIsCancelModalOpen(true);
    setSelectedCancelPolicyData(prop);
  };

  const handleUtrAction = (params) => {
    if (!params.row.utr_no) {
      setSelectedRow(params.row);
      setIsUtrModalOpen(true);
    } else {
      navigate("/simpleView", { state: { insuredName: params.row.insured_name, invoiceNumber: params.row.proposal_no } });
    }
  };

  const handleUtrSubmit = (utrNo) => {
    // Update the UTR No for the selected row and perform any necessary actions
    console.log("New UTR No:", utrNo);
    // Here you can call an API to update the UTR No, or update the state accordingly

    setIsUtrModalOpen(false);
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case 0:
        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
          padding: '3px',
          borderRadius: '8px'
        };
      case 1:
        return {
          backgroundColor: "#00FFFF",
          color: "#ffffff",
          padding: '3px',
          borderRadius: '8px'
        };
      case 2:
        return {
          backgroundColor: "#dc143c",
          color: "#ffffff",
          padding: '3px',
          borderRadius: '8px'
        };
      case 3:
        return {
          backgroundColor: "#FFA500",
          color: "#ffffff",
          padding: '3px',
          borderRadius: '8px'
        };
      case 4:
        return {
          backgroundColor: "#00A36C",
          color: "#ffffff",
          padding: '3px',
          borderRadius: '8px'
        };
      default:
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
          padding: '3px',
          borderRadius: '8px'
        };
    }
  };
  // {
  //   field: "invoice_status",
  //   headerName: "Invoice Status",
  //   width: 200,
  //   headerClassName: "super-app-theme--header",
  //   renderCell: (params) => (
  //     <>
  //       {params?.value !== null &&
  //         <span
  //           className="px-4 rounded-lg"
  //           style={getStatusStyle(params?.value)}
  //         >
  //           {getVariable(params?.value)}
  //         </span>}
  //     </>
  //   ),
  // },
  const columns = [
    {
      field: "invoice_no",
      headerName: "Invoice No",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "proposal_no",
      headerName: "Proposal No",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "claim_no",
      headerName: "Claim No",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "insured_name",
      headerName: "Dealer Name",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "utr_no",
      headerName: "Utr No",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
   
    {
      field: "created_at",
      headerName: "Created Date",
      width: 180,
      headerClassName: "super-app-theme--header",
      valueFormatter: (params) => {
        const formattedDate = moment(params.value).format("DD-MM-YYYY");
        return formattedDate;
      },
    },
    {
      field: "actions",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 290,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '5px' }}>
        {params.row.utr_no===''&&  <div
            onClick={() => handleUtrAction(params)}
            style={{
              backgroundColor: "#007bff",
              width: 'fit-content',
              padding: '5px',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Update Utr No
          </div>}
     
        </div>
      ),
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
     <InvoiceModalComponent 
        isOpen={isUtrModalOpen} 
        onClose={() => setIsUtrModalOpen(false)}
        onSubmit={handleUtrSubmit}
        data={selectedRow}
      />


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

export default InvoiceGenerationListPageTable;
