import React, { useEffect } from 'react';
import Chart from "chart.js/auto"
import { Box } from '@mui/material';
import { Line } from "react-chartjs-2";

// const data = [
//   { region: 'Magazines', val: 35 },
//   { region: 'Toothpaste', val: 20 },
//   { region: 'Shampoo', val: 15 },
//   { region: 'Water bottles', val: 5 },
//   { region: 'Footwear', val: 10 },
//   { region: 'Bread', val: 5 },
// ];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Dashboard = () => {

  let line_chart_income = null
  let line_chart_income2 = null
  let pi_chart_categories = null
  let pi_chart_brand = null

  useEffect(() => {
    load_line_chart_income();
    load_line_chart_income2();
    load_pi_chart_categories();
    load_pi_chart_brand();
  }, [])


  const load_line_chart_income = () => {
    if (line_chart_income) line_chart_income.destroy()
    const id = document.getElementById('line_chart_income');
    line_chart_income = new Chart(id, {
      // The type of chart we want to create
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          data: [41265, 25459, 35080, 62381, 58956, 74155, 46940, 58932, 42586, 64782, 77114, 55286],
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        }],
        borderWidth: 2,
      },
      // Configuration options go here
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Income of 2022",
            color: "white",
            size: "40px"
          },
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            gridLines: {
              display: false,
            },
            ticks: { color: 'white' }
          },
          x: {
            ticks: { color: 'white' }
          }
        }
      }
    });
  }


  const load_line_chart_income2 = () => {
    if (line_chart_income2) line_chart_income2.destroy()
    const id = document.getElementById('line_chart_income2');
    line_chart_income2 = new Chart(id, {
      // The type of chart we want to create
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          data: [41265, 34155, 42586, 45286],
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        }],
        borderWidth: 2,
      },
      // Configuration options go here
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Income of 2023",
            color: "white",
            size: "40px"
          },
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            gridLines: {
              display: false,
            },
            ticks: { color: 'white' }
          },
          x: {
            ticks: { color: 'white' }
          }
        }
      }
    });
  }

  const load_pi_chart_categories = () => {
    if (pi_chart_categories) pi_chart_categories.destroy()
    const id = document.getElementById('pi_chart_categories');
    pi_chart_categories = new Chart(id, {
      // The type of chart we want to create
      type: 'pie',
      data: {
        labels: ["Magazines", "Toothpaste", "Shampoo", "Water bottles", "Footwear","Bread"],
        datasets: [{
          data: [35, 20, 45, 60],
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        }],
        borderWidth: 2,
      },
      // Configuration options go here
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Categories",
            color: "white",
            size: "40px"
          },
          legend: {
            display: false
          },
        },
      }
    });
  }

  const load_pi_chart_brand = () => {
    if (pi_chart_brand) pi_chart_brand.destroy()
    const id = document.getElementById('pi_chart_brand');
    pi_chart_brand = new Chart(id, {
      // The type of chart we want to create
      type: 'pie',
      data: {
        labels: ["Clogard", "NOLIMIT", "Samsung", "LIFE BOY", "DSA", "Local", "Dairy Milk"],
        datasets: [{
          data: [120, 90, 74, 60,50],
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        }],
        borderWidth: 2,
      },
      // Configuration options go here
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Brands",
            color: "white",
            size: "40px"
          },
          legend: {
            display: false
          },
        },
      }
    });
  }

  return (
    <Box width="100%">

      <Box display="flex">
        <Box width="50%" m={2} boxSizing="border-box">
          <canvas id="line_chart_income"></canvas>
        </Box>
        <Box width="50%" m={2} boxSizing="border-box">
          <canvas id="line_chart_income2"></canvas>
        </Box>
      </Box>

      <Box display="flex">
        <Box width="25%" m={2} boxSizing="border-box">
          <canvas id="pi_chart_categories"></canvas>
        </Box>
        <Box width="25%" m={2} boxSizing="border-box">
          <canvas id="pi_chart_brand"></canvas>
        </Box>
        
        {/* <Box width="50%" m={2} boxSizing="border-box">
          <canvas id="pi_chart_products"></canvas>
        </Box> */}
      </Box>

    </Box>
  );
};

export default Dashboard;
