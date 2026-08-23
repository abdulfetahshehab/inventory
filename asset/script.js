function toggleSidebar(){

    const sidebar = document.getElementById("sidebar");

    sidebar.classList.toggle("active");

}

// new DataTable('#table');
new DataTable('#table', {
    searching: false,
    lengthChange: false
});
    // SELES CHART
const sel = document.getElementById('salesChart');
new Chart(sel, {
    type: 'line',   // Change to 'line' if you want a line graph

    data: {
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],

        datasets: [{
            label: 'Sales (ETB)',
            data: [150000, 245000, 198500, 320000, 130000, 210000, 120000],

            backgroundColor: [
                '#3498db',
                '#3498db',
                '#3498db',
                '#3498db',
                '#3498db',
                '#3498db',
                '#3498db'
            ],

            borderColor: '#2980b9',
            borderWidth: 3,
            fill: true,
            tension:0.4
        }]
    },

    options: {
        responsive: true,
        animations:{
            duration:2000,
            easing: "easeOutQuart"
        },

        plugins: {
            legend: {
                display: true
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// PROFIT CHART

const prof = document.getElementById('profitChart');

const weeklyProfits = [15000, 50000, 28000, 75000, 13000, 23000, 10000];

new Chart(prof, {
    type: 'bar',
    data: {
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        datasets: [{
            label: 'Profit (ETB)',
            data: weeklyProfits,
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FFC107',
                '#FF5722',
                '#9C27B0',
                '#00BCD4',
                '#8BC34A'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Profit (ETB)'
                }
            }
        }
    }
});

// MOST SELLING
const most = document.getElementById('mostSalesChart');

new Chart(most, {
    type: 'pie',
    data: {
        labels: [
            'CK',
            'China Donex',
            'Berrak',
            'Jenilesi',
            'Brix J'
        ],
        datasets: [{
            label: 'Most-Selling',
            data: [80, 60, 45, 30, 25],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FFC107',
                '#FF5722',
                '#9C27B0'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Weekly Most-Selling Products (dz)'
            },
            legend: {
                position: 'bottom'
            }
        }
    }
});


// LOW STOCK

const stock = document.getElementById('lowStockChart');

new Chart(stock, {
    type: 'bar',
    data: {
        labels: [
            'Demka',
            'Jiadabao',
            'CK',
            'China Sock',
            'Brix Boxer'
        ],
        datasets: [{
            label: 'Remaining Stock',
            data: [10, 2, 22, 30, 8],
            backgroundColor: [
                '#dc3545',
                '#fd7e14',
                '#ffc107',
                '#dc3545',
                '#fd7e14'
            ],
            borderRadius: 8,
            borderSkipped: false
        }]
    },
    options: {
        indexAxis: 'y', // Makes the chart horizontal

        responsive: true,

        plugins: {
            legend: {
                display: false
            },

            title: {
                display: true,
                text: 'Products That Need Restocking'
            }
        },

        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity Remaining (dz)'
                }
            },

            y: {
                title: {
                    display: true,
                    text: 'Product'
                }
            }
        }
    }
});

// CARD ANIMATION
const card=document.querySelectorAll(".card-animate");
const observerCard=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
});
card.forEach(card=>observerCard.observe(card));

const card2=document.querySelectorAll(".card-animate2");
const observerCard2=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
});
card2.forEach(card=>observerCard2.observe(card));

// GRAPH ANIMATION

const graph=document.querySelectorAll(".graph-animate");
const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
});
graph.forEach(card=>observer.observe(card));

const graph2=document.querySelectorAll(".graph-animate2");
const observer2=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show2");
        }else{
            entry.target.classList.remove("show2");
        }
    });
},{
    threshold:.4
});
graph2.forEach(card=>observer2.observe(card));



