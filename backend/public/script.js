// Dashboard data template
let dashboardChart;

// Store historical data for chart
const history = {
  ph: [],
  temperature: [],
  waterLevel: [],
  labels: []
};


function showLoading() {
  document.getElementById("phValue").innerText = "Loading...";
  document.getElementById("phStatus").innerText = "--";

  document.getElementById("tempValue").innerText = "Loading...";
  document.getElementById("tempStatus").innerText = "--";

  document.getElementById("waterValue").innerText = "Loading...";
  document.getElementById("waterStatus").innerText = "--";

  document.getElementById("plantHealth").innerText = "Checking plant health...";
}


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

//update values
function updateDashboard(data) {
  document.getElementById("phValue").innerText = data.ph;
  document.getElementById("tempValue").innerText = data.temperature + " °C";
  document.getElementById("waterValue").innerText = data.waterLevel + "%";

  document.getElementById("phStatus").innerText =
    getStatus(data.ph, "ph").status;

  document.getElementById("tempStatus").innerText =
    getStatus(data.temperature, "temperature").status;

  document.getElementById("waterStatus").innerText =
    getStatus(data.waterLevel, "waterLevel").status;

  document.getElementById("plantHealth").innerText = "Healthy 😊";
}



// Function to update dashboard cards
function updateChart(data) {
  if (!dashboardChart) return;
  history.labels = [];
  history.ph = [];
  history.temperature = [];
  history.waterLevel = [];

  data.history.forEach(item => {
    history.labels.push(
      new Date(item.createdAt).toLocaleTimeString()
    );
    history.ph.push(item.ph);
    history.temperature.push(item.temperature);
    history.waterLevel.push(item.waterLevel);
  });

  dashboardChart.data.datasets[0].borderColor =
    getStatus(data.current.ph, "ph").color;

  dashboardChart.data.datasets[1].borderColor =
    getStatus(data.current.temperature, "temperature").color;

  dashboardChart.data.datasets[2].borderColor =
    getStatus(data.current.waterLevel, "waterLevel").color;

  dashboardChart.data.labels = history.labels;
  dashboardChart.data.datasets[0].data = history.ph;
  dashboardChart.data.datasets[1].data = history.temperature;
  dashboardChart.data.datasets[2].data = history.waterLevel;

  dashboardChart.update();
}




// Function to fetch data from backend
async function fetchDashboardData() {
  try {
    const response = await fetch("/api/dashboard");

    // 🔐 NOT LOGGED IN
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    const result = await response.json();
    updateDashboard(result.current);
    updateChart(result);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  
  showLoading();

 // Add initial values to history so chart isn't empty
  const time = new Date().toLocaleTimeString();
  history.labels.push(time);

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
          borderColor: "#ffff",
          tension: 0.3
        },
        {
          label: 'Temperature (°C)',
          data: history.temperature,
          borderColor: "#ffff",
          tension: 0.3
        },
        {
          label: 'Water Level (%)',
          data: history.waterLevel,
          borderColor: "#ffff",
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { color: '#ffff', font: { size: 12 } },
          title: { display: true, text: 'Time', color: '#ffff' }
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

  document.getElementById("logoutBtn").addEventListener("click", async () => {
      await fetch("/logout", { method: "POST" });
      window.location.href = "/login";
  });

  // Fetch data every 3 seconds
  setInterval(fetchDashboardData, 3000);

  // Initial load
  fetchDashboardData();
  document.getElementById("lastUpdated").innerText =
    "Last updated: " + new Date().toLocaleTimeString();

});


