
// =====================================
// PROFIT & LOSS MANAGEMENT SYSTEM
// PART 3 - CALCULATION ENGINE
// =====================================



// ===============================
// SAMPLE BUSINESS DATA
// (Later replace with database/API)
// ===============================


const salesData = [

    {
        date:"2026-01-05",
        product:"Laptop",
        revenue:120000,
        cost:75000
    },

    {
        date:"2026-01-20",
        product:"Phone",
        revenue:80000,
        cost:50000
    },


    {
        date:"2026-02-10",
        product:"Printer",
        revenue:95000,
        cost:52000
    },


    {
        date:"2026-03-15",
        product:"Computer",
        revenue:180000,
        cost:100000
    },


    {
        date:"2026-04-18",
        product:"Camera",
        revenue:90000,
        cost:45000
    },


    {
        date:"2026-05-22",
        product:"Monitor",
        revenue:70000,
        cost:35000
    },


    {
        date:"2026-06-10",
        product:"Router",
        revenue:60000,
        cost:25000
    },


    {
        date:"2026-07-25",
        product:"Server",
        revenue:250000,
        cost:150000
    },


];





// ===============================
// EXPENSE DATA
// ===============================


const expenseData = [


    {
        date:"2026-01-15",
        category:"Office Rent",
        amount:15000
    },


    {
        date:"2026-02-10",
        category:"Salary",
        amount:25000
    },


    {
        date:"2026-03-20",
        category:"Transportation",
        amount:8000
    },


    {
        date:"2026-04-15",
        category:"Electricity",
        amount:5000
    },


    {
        date:"2026-05-20",
        category:"Salary",
        amount:30000
    },


    {
        date:"2026-06-18",
        category:"Maintenance",
        amount:12000
    },


    {
        date:"2026-07-05",
        category:"Marketing",
        amount:10000
    }


];





// ===============================
// MONTH LIST
// ===============================


const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];





// ===============================
// GLOBAL FINANCIAL STORAGE
// ===============================


let monthlyReport = [];





// ===============================
// CALCULATE PROFIT & LOSS
// ===============================


function calculateProfitLoss(year = 2026){


    monthlyReport = [];



    for(let month = 0; month < 12; month++){


        let revenue = 0;

        let cogs = 0;

        let expense = 0;



        // SALES CALCULATION

        salesData.forEach(item=>{


            let date = new Date(item.date);


            if(
                date.getFullYear() == year &&
                date.getMonth() == month
            ){

                revenue += item.revenue;

                cogs += item.cost;

            }


        });





        // EXPENSE CALCULATION


        expenseData.forEach(item=>{


            let date = new Date(item.date);



            if(

                date.getFullYear() == year &&
                date.getMonth() == month

            ){

                expense += item.amount;

            }


        });






        let grossProfit = revenue - cogs;


        let netProfit = grossProfit - expense;





        monthlyReport.push({


            month:months[month],

            revenue:revenue,

            cogs:cogs,

            grossProfit:grossProfit,

            expense:expense,

            netProfit:netProfit


        });



    }



}





// ===============================
// FILTER DATA
// ===============================


function filterReport(){


    let monthValue =
        document.getElementById("filterMonth").value;



    if(monthValue === "all"){

        return monthlyReport;

    }



    return monthlyReport.filter(item=>{


        return months.indexOf(item.month)
        == Number(monthValue);


    });


}






// ===============================
// NUMBER FORMATTER
// ===============================


function formatMoney(value){


    return new Intl.NumberFormat(
        "en-US",
        {

            style:"currency",

            currency:"ETB",

            minimumFractionDigits:2

        }

    ).format(value);


}






// ===============================
// UPDATE SUMMARY VALUES
// ===============================


function updateSummary(){


    let data = filterReport();



    let totalCOGS = 0;

    let totalGross = 0;

    let totalExpense = 0;

    let totalNet = 0;



    data.forEach(item=>{


        totalCOGS += item.cogs;

        totalGross += item.grossProfit;

        totalExpense += item.expense;

        totalNet += item.netProfit;


    });





    document.getElementById("cogsValue")
    .innerHTML=formatMoney(totalCOGS);



    document.getElementById("grossProfitValue")
    .innerHTML=formatMoney(totalGross);



    document.getElementById("expenseValue")
    .innerHTML=formatMoney(totalExpense);



    document.getElementById("netProfitValue")
    .innerHTML=formatMoney(totalNet);



}







// ===============================
// FINANCIAL ANALYSIS GENERATOR
// ===============================


function generateAnalysis(){


    let highestProfit =
        monthlyReport.reduce(
            (a,b)=>
            a.netProfit>b.netProfit?a:b
        );



    let highestExpense =
        monthlyReport.reduce(
            (a,b)=>
            a.expense>b.expense?a:b
        );



    let averageProfit =
        monthlyReport.reduce(
            (sum,item)=>
            sum+item.netProfit,0
        )
        /
        monthlyReport.length;




    document.getElementById(
        "financialAnalysis"
    ).innerHTML = `


    <div class="analysis-item">

        Highest Net Profit<br>

        ${highestProfit.month}

        <br>

        ${formatMoney(highestProfit.netProfit)}

    </div>



    <div class="analysis-item">

        Highest Expense<br>

        ${highestExpense.month}

        <br>

        ${formatMoney(highestExpense.expense)}

    </div>



    <div class="analysis-item">

        Average Monthly Profit<br>

        ${formatMoney(averageProfit)}

    </div>


    `;


}







// ===============================
// INITIAL LOAD
// ===============================


calculateProfitLoss();

updateSummary();

generateAnalysis();

// =====================================
// PART 4 - CHARTS & REPORT TABLE
// =====================================



// ===============================
// CHART VARIABLES
// ===============================


let cogsChart;

let grossProfitChart;

let expenseChart;

let netProfitChart;






// ===============================
// CHART CONFIGURATION
// ===============================


function createCharts(){


    let data = monthlyReport;



    let labels = data.map(item=>item.month);


    let cogs = data.map(item=>item.cogs);


    let gross = data.map(item=>item.grossProfit);


    let expense = data.map(item=>item.expense);


    let net = data.map(item=>item.netProfit);





    // ===============================
    // COGS CHART
    // ===============================


    let cogsContext =
        document.getElementById(
            "cogsChart"
        );


    cogsChart = new Chart(
        cogsContext,
        {

            type:"line",

            data:{


                labels:labels,


                datasets:[{

                    label:"Cost of Goods Sold",

                    data:cogs,

                    tension:.4,

                    fill:true

                }]

            },


            options:{


                responsive:true,


                maintainAspectRatio:false,


                animation:{

                    duration:1500

                },


                plugins:{


                    legend:{

                        display:true

                    }


                }


            }


        }
    );







    // ===============================
    // GROSS PROFIT CHART
    // ===============================



    grossProfitChart =
    new Chart(

        document.getElementById(
            "grossProfitChart"
        ),

        {


            type:"bar",


            data:{


                labels:labels,


                datasets:[{


                    label:"Gross Profit",

                    data:gross


                }]


            },


            options:{


                responsive:true,

                maintainAspectRatio:false,


                animation:{

                    duration:1500

                }



            }



        }

    );







    // ===============================
    // EXPENSE CHART
    // ===============================



    expenseChart =

    new Chart(

        document.getElementById(
            "expenseChart"
        ),

        {


            type:"line",


            data:{


                labels:labels,


                datasets:[{


                    label:"Total Expense",

                    data:expense,

                    tension:.4,

                    fill:true


                }]


            },


            options:{


                responsive:true,


                maintainAspectRatio:false,


                animation:{

                    duration:1500

                }


            }


        }

    );








    // ===============================
    // NET PROFIT CHART
    // ===============================


    netProfitChart =

    new Chart(

        document.getElementById(
            "netProfitChart"
        ),

        {


            type:"line",


            data:{


                labels:labels,


                datasets:[{


                    label:"Net Profit",

                    data:net,

                    tension:.4


                }]


            },


            options:{


                responsive:true,


                maintainAspectRatio:false,


                animation:{

                    duration:1800

                }



            }



        }

    );



}









// ===============================
// UPDATE CHARTS
// ===============================


function updateCharts(){


    let data = filterReport();



    let labels =
        data.map(item=>item.month);



    let cogs =
        data.map(item=>item.cogs);



    let gross =
        data.map(item=>item.grossProfit);



    let expense =
        data.map(item=>item.expense);



    let net =
        data.map(item=>item.netProfit);





    cogsChart.data.labels = labels;

    cogsChart.data.datasets[0].data = cogs;



    grossProfitChart.data.labels = labels;

    grossProfitChart.data.datasets[0].data = gross;



    expenseChart.data.labels = labels;

    expenseChart.data.datasets[0].data = expense;



    netProfitChart.data.labels = labels;

    netProfitChart.data.datasets[0].data = net;





    cogsChart.update();

    grossProfitChart.update();

    expenseChart.update();

    netProfitChart.update();



}









// ===============================
// REPORT TABLE
// ===============================


function generateTable(){


    let table =
    document.getElementById(
        "reportTableBody"
    );



    table.innerHTML="";



    let data = filterReport();



    data.forEach(item=>{


        let status;



        if(item.netProfit > 0){


            status =
            `
            <span class="status-profit">
            Profit
            </span>
            `;


        }


        else if(item.netProfit < 0){


            status =
            `
            <span class="status-loss">
            Loss
            </span>
            `;


        }


        else{


            status =
            `
            <span class="status-break">
            Break Even
            </span>
            `;


        }







        table.innerHTML += `


        <tr>


            <td>
                ${item.month}
            </td>


            <td>
                ${formatMoney(item.cogs)}
            </td>



            <td>
                ${formatMoney(item.grossProfit)}
            </td>



            <td>
                ${formatMoney(item.expense)}
            </td>



            <td>
                ${formatMoney(item.netProfit)}
            </td>



            <td>
                ${status}
            </td>



        </tr>


        `;



    });



}









// ===============================
// FILTER EVENT
// ===============================


document
.getElementById("btnApplyFilter")
.addEventListener(
"click",
()=>{


    updateSummary();


    updateCharts();


    generateTable();


});








// ===============================
// REFRESH BUTTON
// ===============================


document
.getElementById("btnRefresh")
.addEventListener(
"click",
()=>{


    calculateProfitLoss();


    updateSummary();


    updateCharts();


    generateTable();


    generateAnalysis();



});








// ===============================
// LOAD DASHBOARD
// ===============================


window.onload=function(){


    createCharts();


    generateTable();


};

// =====================================
// PART 5 - EXPORT & PRINT
// =====================================



// ===============================
// EXPORT TO EXCEL
// ===============================


document
.getElementById("btnExport")
.addEventListener(
"click",
()=>{


    let data = filterReport();



    let excelData = data.map(item=>{


        return {


            Month:item.month,


            "Cost of Goods Sold":
            item.cogs,


            "Gross Profit":
            item.grossProfit,


            "Total Expense":
            item.expense,


            "Net Profit":
            item.netProfit,


            Status:
            item.netProfit > 0
            ?
            "Profit"
            :
            item.netProfit < 0
            ?
            "Loss"
            :
            "Break Even"



        };


    });





    let worksheet =
    XLSX.utils.json_to_sheet(excelData);



    let workbook =
    XLSX.utils.book_new();



    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Profit Loss Report"
    );





    XLSX.writeFile(
        workbook,
        "Profit_Loss_Report.xlsx"
    );



});








// ===============================
// PRINT REPORT
// ===============================


document
.getElementById("btnPrint")
.addEventListener(
"click",
()=>{


    let reportDate =
    new Date()
    .toLocaleDateString();



    let printWindow =
    window.open(
        "",
        "",
        "width=1000,height=700"
    );





    printWindow.document.write(`


    <html>

    <head>

    <title>
    Profit & Loss Report
    </title>


    <style>


    body{

        font-family:Arial;
        padding:30px;

    }



    h1{

        text-align:center;

    }



    table{

        width:100%;

        border-collapse:collapse;

        margin-top:30px;

    }



    th,td{

        border:1px solid #ccc;

        padding:12px;

        text-align:center;

    }



    th{

        background:#f1f5f9;

    }



    .profit{

        color:green;

        font-weight:bold;

    }



    .loss{

        color:red;

        font-weight:bold;

    }


    </style>


    </head>



    <body>


    <h1>
    Profit & Loss Management Report
    </h1>


    <p>
    Generated Date:
    ${reportDate}
    </p>



    <table>


    <thead>

    <tr>


    <th>
    Month
    </th>


    <th>
    COGS
    </th>


    <th>
    Gross Profit
    </th>


    <th>
    Expense
    </th>


    <th>
    Net Profit
    </th>


    <th>
    Status
    </th>


    </tr>


    </thead>



    <tbody>


    ${


    filterReport()
    .map(item=>{


        return `


        <tr>


        <td>
        ${item.month}
        </td>



        <td>
        ${formatMoney(item.cogs)}
        </td>



        <td>
        ${formatMoney(item.grossProfit)}
        </td>



        <td>
        ${formatMoney(item.expense)}
        </td>



        <td>
        ${formatMoney(item.netProfit)}
        </td>



        <td class="${
        
        item.netProfit > 0
        ?
        "profit"
        :
        "loss"

        }">


        ${
        item.netProfit > 0
        ?
        "Profit"
        :
        "Loss"

        }


        </td>



        </tr>


        `;


    })

    .join("")



    }



    </tbody>



    </table>


    </body>


    </html>


    `);





    printWindow.document.close();



    printWindow.print();



});