//     const distance = [
//   {
//     day: "Day 1",
//     hours: {
//       "0-1": 42,
//       "1-2": 36,
//       "2-3": 50,
//       "3-4": 65,
//       "4-5": 31,
//       "5-6": 55,
//       "6-7": 40,
//       "7-8": 72,
//       "8-9": 60,
//       "9-10": 48,
//       "10-11": 33,
//       "11-12": 70,
//       "12-13": 45,
//       "13-14": 38,
//       "14-15": 58,
//       "15-16": 67,
//       "16-17": 34,
//       "17-18": 52,
//       "18-19": 74,
//       "19-20": 43,
//       "20-21": 68,
//       "21-22": 37,
//       "22-23": 51,
//       "23-24": 30
//     }
//   },
//   {
//     day: "Day 2",
//     hours: {
//       "0-1": 61,
//       "1-2": 35,
//       "2-3": 47,
//       "3-4": 69,
//       "4-5": 41,
//       "5-6": 54,
//       "6-7": 32,
//       "7-8": 73,
//       "8-9": 56,
//       "9-10": 44,
//       "10-11": 30,
//       "11-12": 71,
//       "12-13": 46,
//       "13-14": 39,
//       "14-15": 59,
//       "15-16": 64,
//       "16-17": 37,
//       "17-18": 53,
//       "18-19": 75,
//       "19-20": 50,
//       "20-21": 66,
//       "21-22": 42,
//       "22-23": 58,
//       "23-24": 33
//     }
//   },
//   {
//     day: "Day 3",
//     hours: {
//       "0-1": 68,
//       "1-2": 38,
//       "2-3": 51,
//       "3-4": 72,
//       "4-5": 36,
//       "5-6": 49,
//       "6-7": 34,
//       "7-8": 60,
//       "8-9": 57,
//       "9-10": 47,
//       "10-11": 31,
//       "11-12": 70,
//       "12-13": 45,
//       "13-14": 40,
//       "14-15": 62,
//       "15-16": 66,
//       "16-17": 39,
//       "17-18": 54,
//       "18-19": 74,
//       "19-20": 43,
//       "20-21": 65,
//       "21-22": 37,
//       "22-23": 52,
//       "23-24": 30
//     }
//   },
//   {
//     day: "Day 4",
//     hours: {
//       "0-1": 62,
//       "1-2": 36,
//       "2-3": 48,
//       "3-4": 70,
//       "4-5": 32,
//       "5-6": 55,
//       "6-7": 41,
//       "7-8": 73,
//       "8-9": 59,
//       "9-10": 45,
//       "10-11": 33,
//       "11-12": 69,
//       "12-13": 46,
//       "13-14": 39,
//       "14-15": 64,
//       "15-16": 67,
//       "16-17": 35,
//       "17-18": 53,
//       "18-19": 75,
//       "19-20": 50,
//       "20-21": 63,
//       "21-22": 37,
//       "22-23": 52,
//       "23-24": 30
//     }
//   },
//   {
//     day: "Day 5",
//     hours: {
//       "0-1": 60,
//       "1-2": 35,
//       "2-3": 50,
//       "3-4": 71,
//       "4-5": 33,
//       "5-6": 56,
//       "6-7": 42,
//       "7-8": 74,
//       "8-9": 58,
//       "9-10": 47,
//       "10-11": 31,
//       "11-12": 69,
//       "12-13": 44,
//       "13-14": 38,
//       "14-15": 63,
//       "15-16": 66,
//       "16-17": 40,
//       "17-18": 52,
//       "18-19": 73,
//       "19-20": 43,
//       "20-21": 65,
//       "21-22": 37,
//       "22-23": 54,
//       "23-24": 30
//     }
//   }
// ]

function updateChart3() {
  // Calculate the range of past 10 hours
  const now = new Date();
  const currentHour = now.getHours();
  let startHour = currentHour - 11;
  if (startHour < 0) {
    startHour += 23;
  }

  // Access values for the past 10 hours for the current truck
  const past10HoursValues = {};
  for (let i = 0; i < 12; i++) {
    const hour = (startHour + i) % 24;
    const key = `${hour}-${hour + 1}`;
    if (key in distance[truck].hours) {
      past10HoursValues[key] = distance[truck].hours[key];
    }
  }

  // Update the chart data
  const chart = Chart.getChart("myChart3");
  chart.data.labels = Object.keys(past10HoursValues);
  chart.data.datasets[0].data = Object.values(past10HoursValues);
  chart.update();
}

document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('myChart3');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Km/Hr',
        data: [],
        borderWidth: 1,
        backgroundColor:'rgba(247, 112, 0,0.9)',
        borderRadius: {
            topLeft: 5,
            topRight: 5
          }
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              return `${value}Km/Hr`;
            }
          }
        }
      }
    }
  });

  // Initially update the chart
  updateChart3();
});