battery = [
    { "1:00": 70 },
    { "2:00": 65 },
    { "3:00": 61 },
    { "4:00": 57 },
    { "5:00": 50 },
    { "6:00": 40 },
    { "7:00": 97 },
    { "8:00": 93 },
    { "9:00": 90 },
    { "10:00": 86 },
    { "11:00": 81 },
    { "12:00": 75 },
    { "13:00": 72 },
    { "14:00": 68 },
    { "15:00": 64 },
    { "16:00": 60 },
    { "17:00": 58 },
    { "18:00": 58 },
    { "19:00": 53 },
    { "20:00": 50 },
    { "21:00": 45 },
    { "22:00": 43 },
    { "23:00": 98 },
    { "24:00": 90 },
]


document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myChart5');
  
    // Filter the battery data for the last 12 hours
    const currentHour = new Date().getHours();
    const last12HoursData = battery.filter(obj => {
        const hour = parseInt(Object.keys(obj)[0]);
        return hour >= currentHour - 12 && hour <= currentHour;
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: last12HoursData.map(obj => Object.keys(obj)[0]),
        datasets: [{
          label: 'KM',
          data: last12HoursData.map(obj => Object.values(obj)[0]),
          borderWidth: 1,
          backgroundColor: 'rgba(38, 255, 0, 0.9)',
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
                return `${value}%`;
              }
            }
          }
        }
      }
    });
});

