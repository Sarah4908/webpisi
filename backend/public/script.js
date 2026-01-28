// Dashboard data template
let dashboardChart;

const dashboardData = {
  ph: { value: 7.8, status: "Normal", color: "rgb(186, 251, 188)" },
  temperature: { value: 29, status: "Normal", color: "rgb(186, 251, 188)" },
  waterLevel: { value: 50, status: "Normal", color: "rgb(186, 251, 188)" },
  plantHealth: { status: "Healthy 😊", color: "rgb(54, 179, 58)" }
};

// Store historical data for chart
const history = {
  ph: [],
  temperature: [],
  waterLevel: [],
  labels: []
};



// Function to determine status & color based on value
function getStatus(value, type) {
  switch (type) {
    case "ph":
      if (value < 6.5 || value > 8) return { status: "Critical", color: "rgb(141,4,4)" };
      return { status: "Normal", color: "rgb(217, 167, 97)" };
    case "temperature":
      if (value < 20 || value > 35) return { status: "Critical", color: "rgb(141,4,4)" };
      return { status: "Normal", color: "rgb(186,251,188)" };
    case "waterLevel":
      if (value < 20 || value > 80) return { status: "Warning", color: "rgb(255,165,0)" };
      return { status: "Normal", color: "rgb(112, 165, 175)" };
    case "plantHealth":
      if (value < 3) return { status: "Unhealthy 😢", color: "rgb(255,0,0)" };
      return { status: "Healthy 😊", color: "rgb(54,179,58)" };
  }
}


function updateChart(data) {
  const time = new Date().toLocaleTimeString();

  history.labels.push(time);
  history.ph.push(data.ph.value);
  history.temperature.push(data.temperature.value);
  history.waterLevel.push(data.waterLevel.value);

  if (history.labels.length > 10) { // keep last 10 points
    history.labels.shift();
    history.ph.shift();
    history.temperature.shift();
    history.waterLevel.shift();
  }

  // Update chart line colors dynamically
  dashboardChart.data.datasets[0].borderColor = getStatus(data.ph.value, "ph").color;
  dashboardChart.data.datasets[1].borderColor = getStatus(data.temperature.value, "temperature").color;
  dashboardChart.data.datasets[2].borderColor = getStatus(data.waterLevel.value, "waterLevel").color;

  dashboardChart.data.labels = history.labels;
  dashboardChart.data.datasets[0].data = history.ph;
  dashboardChart.data.datasets[1].data = history.temperature;
  dashboardChart.data.datasets[2].data = history.waterLevel;

  dashboardChart.update();
}

// Function to update dashboard cards
function updateDashboard(data) {
  document.getElementById("phValue").innerText = data.ph.value;
  document.getElementById("phStatus").innerText = data.ph.status;

  document.getElementById("tempValue").innerText = data.temperature.value;
  document.getElementById("tempStatus").innerText = data.temperature.status;

  document.getElementById("waterValue").innerText = data.waterLevel.value + "%";
  document.getElementById("waterStatus").innerText = data.waterLevel.status;

  document.getElementById("plantHealth").innerText = data.plantHealth;
}

// Function to fetch data from backend

async function fetchDashboardData() {
  try {
    const response = await fetch("/api/dashboard");
    const data = await response.json();
    updateDashboard(data);
    updateChart(data);  // <-- update the chart
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}


// Fetch data every 3 seconds
setInterval(fetchDashboardData, 3000);

// Initial load
fetchDashboardData();


// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Add initial values to history so chart isn't empty
  const time = new Date().toLocaleTimeString();
  history.labels.push(time);
  history.ph.push(dashboardData.ph.value);
  history.temperature.push(dashboardData.temperature.value);
  history.waterLevel.push(dashboardData.waterLevel.value);

  // Initial load of dashboard cards
  updateDashboard(dashboardData);

  // Create chart
  const ctx = document.getElementById('dashboardChart').getContext('2d');
  dashboardChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.labels,
      datasets: [
        {
          label: 'pH',
          data: history.ph,
          borderColor: dashboardData.ph.color,
          tension: 0.3
        },
        {
          label: 'Temperature (°C)',
          data: history.temperature,
          borderColor: dashboardData.temperature.color,
          tension: 0.3
        },
        {
          label: 'Water Level (%)',
          data: history.waterLevel,
          borderColor: dashboardData.waterLevel.color,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { color: '#ffff', font: { size: 12 } },
          title: { display: true, text: 'Time', color: '#ffffff' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#ffff', font: { size: 12 } },
          title: { display: true, text: 'Sensor Values', color: '#ffffff' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#ffffff', font: { size: 13 } }
        }
      }
    }
  });

  
});
