function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

// new DataTable('#table');
new DataTable("#table", {
  searching: false,
  lengthChange: false,
});
// SELES CHART
const sel = document.getElementById("salesChart");
new Chart(sel, {
  type: "line", // Change to 'line' if you want a line graph

  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],

    datasets: [
      {
        label: "Sales (ETB)",
        data: [150000, 245000, 198500, 320000, 130000, 210000, 120000],

        backgroundColor: [
          "#3498db",
          "#3498db",
          "#3498db",
          "#3498db",
          "#3498db",
          "#3498db",
          "#3498db",
        ],

        borderColor: "#2980b9",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false, // ← this is critical
    layout: {
      padding: {
        bottom: 10, // extra space under the x-axis
        left: 5,
        right: 5,
        top: 5,
      },
    },
    animations: {
      duration: 2000,
      easing: "easeOutQuart",
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          maxRotation: 45, // rotate labels if needed
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8, // don’t overcrowd on mobile
          font: {
            size: 11, // smaller font helps on mobile
          },
        },
        grid: {
          display: false, // optional – cleaner look
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  },
});

// PROFIT CHART

const prof = document.getElementById("profitChart");

const weeklyProfits = [15000, 50000, 28000, 75000, 13000, 23000, 10000];

new Chart(prof, {
  type: "bar",
  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Profit (ETB)",
        data: weeklyProfits,
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#FF5722",
          "#9C27B0",
          "#00BCD4",
          "#8BC34A",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // ← this is critical
    layout: {
      padding: {
        bottom: 12, // extra space under the x-axis
        left: 5,
        right: 5,
        top: 5,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // rotate labels if needed
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8, // don’t overcrowd on mobile
          font: {
            size: 11, // smaller font helps on mobile
          },
        },
        grid: {
          display: false, // optional – cleaner look
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  },
});

// MOST SELLING
const most = document.getElementById("mostSalesChart");

new Chart(most, {
  type: "pie",
  data: {
    labels: ["CK", "China Donex", "Berrak", "Jenilesi", "Brix J"],
    datasets: [
      {
        label: "Most-Selling",
        data: [80, 60, 45, 30, 25],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#FF5722",
          "#9C27B0",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // ← this is critical
    layout: {
      padding: {
        bottom: 10, // extra space under the x-axis
        left: 5,
        right: 5,
        top: 5,
      },
    },

    plugins: {
      title: {
        display: true,
        text: "Weekly Most-Selling Products (dz)",
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // rotate labels if needed
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8, // don’t overcrowd on mobile
          font: {
            size: 11, // smaller font helps on mobile
          },
        },
        grid: {
          display: false, // optional – cleaner look
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  },
});

// LOW STOCK

const stock = document.getElementById("lowStockChart");

new Chart(stock, {
  type: "bar",
  data: {
    labels: ["Demka", "Jiadabao", "CK", "China Sock", "Brix Boxer"],
    datasets: [
      {
        label: "Remaining Stock",
        data: [10, 2, 22, 30, 8],
        backgroundColor: [
          "#dc3545",
          "#fd7e14",
          "#ffc107",
          "#dc3545",
          "#fd7e14",
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  },
  options: {
    indexAxis: "y", // Makes the chart horizontal
    maintainAspectRatio: false, // ← this is critical
    responsive: true,
    layout: {
      padding: {
        bottom: 10, // extra space under the x-axis
        left: 5,
        right: 5,
        top: 5,
      },
    },

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Products That Need Restocking",
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity Remaining (dz)",
        },
        ticks: {
          maxRotation: 45, // rotate labels if needed
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8, // don’t overcrowd on mobile
          font: {
            size: 11, // smaller font helps on mobile
          },
        },
        grid: {
          display: false, // optional – cleaner look
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Product",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  },
});

// CARD ANIMATION
const card = document.querySelectorAll(".card-animate");
const observerCard = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
card.forEach((card) => observerCard.observe(card));

const card2 = document.querySelectorAll(".card-animate2");
const observerCard2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
card2.forEach((card) => observerCard2.observe(card));

// GRAPH ANIMATION

const graph = document.querySelectorAll(".graph-animate");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
graph.forEach((card) => observer.observe(card));

const graph2 = document.querySelectorAll(".graph-animate2");
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show2");
      } else {
        entry.target.classList.remove("show2");
      }
    });
  },
  {
    threshold: 0.4,
  },
);
graph2.forEach((card) => observer2.observe(card));

// scales: {
//   x: {
//     ticks: {
//       font: {
//         size: window.innerWidth < 576 ? 10 : 12
//       }
//     }
//   }
// }
// options: {
//   responsive: true,
//   maintainAspectRatio: false,

//   // Give space for the x-axis labels
//   layout: {
//     padding: {
//       bottom: 10,   // extra space under the x-axis
//       left: 5,
//       right: 5,
//       top: 5
//     }
//   },

//   plugins: {
//     legend: {
//       position: 'bottom',
//       labels: {
//         boxWidth: 12,
//         padding: 15
//       }
//     }
//   },

//   scales: {
//     x: {
//       ticks: {
//         maxRotation: 45,        // rotate labels if needed
//         minRotation: 0,
//         autoSkip: true,
//         maxTicksLimit: 8,       // don’t overcrowd on mobile
//         font: {
//           size: 11              // smaller font helps on mobile
//         }
//       },
//       grid: {
//         display: false          // optional – cleaner look
//       }
//     },
//     y: {
//       beginAtZero: true,
//       ticks: {
//         font: {
//           size: 11
//         }
//       }
//     }
//   }
// }
