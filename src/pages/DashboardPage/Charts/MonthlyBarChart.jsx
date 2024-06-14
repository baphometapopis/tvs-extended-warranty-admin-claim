import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MonthlyBarChart = ({ monthlyData,applyYear }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [inputYear, setInputYear] = useState(currentYear);

  const handleYearChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setInputYear(value);
    }
  };

  const handleOkClick = () => {
    const parsedYear = parseInt(inputYear, 10);
    if (parsedYear<=currentYear) {
      setYear(parsedYear);
      applyYear(parsedYear)
    } else {
      alert(`Please enter a year between 2023 to ${currentYear} `);
    }
  };

  const data = monthlyData

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: 'Claim Count',
      },
    },
    fill: {
      colors: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
    },
  };

  const series = [
    {
      name: 'Pending',
      data: data.map(item => item.pending),
    },
    {
      name: 'Approved',
      data: data.map(item => item.approved),
    },
    {
      name: 'Rejected',
      data: data.map(item => item.rejected),
    },
    {
      name: 'Referred-Back',
      data: data.map(item => item.referredBack),
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{ color: '#253C80' }}>{year} Monthly Data</h2>
        <div style={{ marginBottom: '20px', display: 'flex' }}>
          <input
            type="number"
            value={inputYear}
            placeholder={currentYear}
            onChange={handleYearChange}
            min={2023}
            max={currentYear}
            style={{ width: '80px', marginRight: '10px', height: '25px', marginTop: '15px' }}
          />
          <div 
            onClick={handleOkClick}
            style={{ color: '#253C80', height: 'fit-content', marginTop: '15px', borderRadius: '10px', border: '1px solid #253C80', cursor: 'pointer' }}
          >
            <p style={{ margin: '5px 10px' }}>Apply</p>
          </div>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={220} width={'100%'} />
    </div>
  );
};

export default MonthlyBarChart;
