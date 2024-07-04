/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { Api_Endpoints } from '../../Api/apiEndpoint'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

import { makeApiCall } from '../../Api/makeApiCall'
import FilterContainer from '../../components/FilterComponent/FilterContainer'
import { showErrorToast, showSuccessToast } from '../../utils/toastService'
import './ReportDownloadPage.css'

const ReportDownloadPage = () => {
const [dropDownData,setdropDownData]=useState([])
const [excelData,setExcelData]=useState('')
const [state,setstate]=useState('')

const [headers, setHeaders] = useState([]);
const [rowCount, setRowCount] = useState(0);
const [colCount, setColCount] = useState(0);


const handleFilterChange = async (data) => {

  try {
    let endpoint = '';

    // Switch-case statement to select endpoint based on selected report
    switch (data.report_type) {
      case 'sold_policy':
        endpoint = Api_Endpoints.allWarantyHolderData;
        break;
      case 'claim':
        endpoint = Api_Endpoints.getClaimedPolicy;
        break;
      case 'invoices':
        endpoint = Api_Endpoints.getInvoices;
        break;
      default:
        // Default case or additional cases can be added as needed
        break;
    }


    let postData={

      type:0,
status:data?.status??'',
startDate:data?.startDate??'',
endDate:data?.endDate??'',
searchTerm:data?.search??''
    }
    if (endpoint) {
      const response = await makeApiCall(endpoint, 'GET',postData);
if(response?.status===200){

if(response?.data?.data.length!==0){

  generateExcelFile(response)}else{
  showSuccessToast('No Record Found')

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

const generateExcelFile = (exceldata) => {
  // Check if the data is in the expected format
  if (!exceldata || !exceldata.data || !exceldata.data.data || exceldata.data.data.length === 0) {
      console.error('Data is not in the expected format');
      return;
  }

  const tableHeaders = exceldata.data.tableHeaders;
  const filteredHeaders = tableHeaders.filter(header => header.rowId !== 'actions'); // Exclude 'Actions' column
  const headerLabels = filteredHeaders?.map(header => header.label);

  // Extract data values excluding 'actions' field
  const dataArray = exceldata.data.data?.map(obj => filteredHeaders?.map(header => obj[header.rowId]));

  const ws = XLSX.utils.aoa_to_sheet([headerLabels, ...dataArray]);

  // Set header style
  const headerStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: 'FF0000' } }, // Change 'FF0000' to the desired color
  };
  ws['!rows'] = [{}, headerStyle];

  // Auto-size columns based on content
  const range = XLSX.utils.decode_range(ws['!ref']);
  if (range && range.s && range.e) {
      for (let i = range.s.c; i <= range.e.c; ++i) {
          const columnHeader = XLSX.utils.encode_col(i);
          let maxColumnWidth = columnHeader.length; // Initialize with header length
          for (let j = range.s.r + 1; j <= range.e.r; ++j) {
              const cell = ws[XLSX.utils.encode_cell({ r: j, c: i })];
              if (cell && cell.v) {
                  const cellContentWidth = cell.v.toString().length;
                  maxColumnWidth = Math.max(maxColumnWidth, cellContentWidth);
              }
          }
          console.log('Column header:', columnHeader, 'Max column width:', maxColumnWidth);
          ws[columnHeader] = { ...ws[columnHeader], width: maxColumnWidth }; // Set column width to max content width
      }
  }

  // Set row height
  ws['!rows'] = Array.from({ length: range.e.r + 1 }, () => ({ hpt: 24 }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const fileName = 'report.xlsx';
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), fileName);

  // Call the fileHandler function with the excelBuffer parameter
  fileHandler({ target: { files: [new File([excelBuffer], fileName)] } });
};


// const generateExcelFile = (event) => {
//   let fileObj = event.target.files[0];
//   //just pass the fileObj as parameter
//   ExcelRenderer(fileObj, (err, resp) => {
//     if(err){
//       console.log(err);            
//     }
//     else{
//       setstate({
//         cols: resp.cols,
//         rows: resp.rows
//       });
//     }
//   });               
// }






const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonSheet[0];
    const rowCount = jsonSheet.length;
    const colCount = headers.length;

    setHeaders(headers);
    setRowCount(rowCount);
    setColCount(colCount);
  };

  reader.readAsArrayBuffer(file);
};


const getColumnWidth = (ws, columnHeader) => {
  const maxColumnWidth = 50; // Maximum column width
  const defaultColumnWidth = 10; // Default column width
  if (ws && ws[columnHeader] && ws[columnHeader].wch) {
    return Math.min(maxColumnWidth, defaultColumnWidth + ws[columnHeader].wch);
  }
  return defaultColumnWidth;
};




  const handleSearchChange = (event) => {
  
    // setFilterValue(prevData=>({
    //   ...prevData,searchParam:event.target.value
    // }))
  };
  
  const handleReset = () => {
    setstate(null)

    
  };
  const handleDropdownChange =(e,field)=>{
    const selectedValue=e.target.value;
    // setFilterValue(prevData=>({
    //   ...prevData,[field]:selectedValue
    // })) 
  }

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
        if (err) {
            console.log(err);
        } else {
            // Exclude the first row (headers) and the first column (row numbers)
            const rows = resp.rows; // Exclude the first row
            const cols = resp.cols; // Exclude the first column

            setstate({
                cols: cols,
                rows: rows
            });
        }
    });
}

  const fetchData=async()=>{
const getstatus =      await   makeApiCall(Api_Endpoints.getStatus, 'GET');

if(getstatus?.status===200){
  const dropdownData = [
    {
      label: "report_type",
      placeholder:'Select Report',
      options: [
        { value: "sold_policy", label: "Sold Policy" },
        { value: "claim", label: "Claim" },
        { value: "invoices", label: "Invoices" }
      ]
    },
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
  
  return (
    <div className='ReportContainer'>
      {/* <input type="file" onChange={generateExcelFile} style={{"padding":"10px"}} /> */}

 <FilterContainer
       handleFilterChange={handleFilterChange}
        handleReset={handleReset}
        dropdownData={dropDownData}
        removeSearchBar={true}

      />  
<input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {headers.length > 0 && (
        <div>
          <h3>Headers</h3>
          <ul>
            {headers.map((header, index) => (
              <li key={index}>{header}</li>
            ))}
          </ul>
          <p>Number of Rows: {rowCount}</p>
          <p>Number of Columns: {colCount}</p>
        </div>
      )}
     {/* {state&& <h3>Recent Downloaded Reports</h3>} */}

{/* {state&&      <OutTable data={state?.rows} columns={state?.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
}   */}
      </div>
  )
}

export default ReportDownloadPage
