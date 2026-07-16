

const todaySales = document.getElementById("todaySales");
const todayRevenue = document.getElementById("todayRevenue");
const productsSold = document.getElementById("productsSold");
const totalProfit = document.getElementById("totalProfit");

const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");

const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

let revenueChart;
let paymentChart;
let productChart;

let products = JSON.parse(localStorage.getItem("products")) || [];


// Sales Array

let sales=[];
let loanSales = [];
let editId = null;

// ==========================
// HTML Elements
// ==========================

const form=document.getElementById("saleForm");
const product=document.getElementById("product");
const salesStock=document.getElementById("stock");
const price=document.getElementById("price");
const qty=document.getElementById("quantity");
const total=document.getElementById("total");
const payment=document.getElementById("paymentMethod");
const tbody=document.querySelector("#salesTable tbody");

// =========================
// Load Products
// =========================

function loadProducts(){

    product.innerHTML = `
    <option value="">Select Product</option>
    `;


    products.forEach(p=>{

        if(Number(p.quantity) > 0){

            product.innerHTML += `
            <option value="${p.id}">
                ${p.name} (Available: ${p.quantity})
            </option>
            `;

        }

    });

}

loadProducts();
console.log("Products loaded:", products);
console.log("Product dropdown:", product);

// =========================
// Product Changed
// =========================

product.addEventListener("change",()=>{

    const selected = products.find(
        p => p.id == product.value
    );


    if(selected){

        salesStock.value = selected.quantity;
        qty.value = "";
        total.value = "";

    }
    else{

        salesStock.value = "";

    }

});

// =========================
// Calculate Total
// =========================

qty.addEventListener("input",()=>{
const quantity=Number(qty.value);
const unitPrice=Number(price.value);
total.value=quantity*unitPrice;
});

// =========================
// Add Sale
// =========================
form.addEventListener("submit",function(e){
e.preventDefault();
// Validation
if(product.value==""){
alert("Please select product.");
return;
}
if(price.value==""){
alert("Enter Price.");
return;
}
if (qty.value == "" || Number(qty.value) <= 0) {
    alert("Invalid Quantity");
    return;
}
if(payment.value==""){
alert("Select payment method.");
return;
}
 const selected = products.find(p => p.id == product.value);

    if (!editId && Number(qty.value) > selected.stock) {
        alert("Insufficient Stock");
        return;
    }

    if (editId) {

        updateSale(selected);

    } else {

        addSale(selected);

    }

});


// =========================
// Display Sales
// =========================

function displaySales(){

tbody.innerHTML="";

sales.forEach((sale,index)=>{

tbody.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${sale.product}</td>

<td>${sale.qty}</td>

<td>${sale.price}</td>

<td>${sale.total}</td>

<td>${sale.payment}</td>

<td>${sale.date}</td>

<td>


<button
    class="btn btn-warning btn-sm"
    onclick="editSale(${sale.id})">

    Edit

</button>

<button
    class="btn btn-danger btn-sm"
    onclick="deleteSale(${sale.id})">

    Delete

</button>

</td>

</tr>

`;

});

}

updateDashboard(sales);

function addSale(selected) {

    const sale = {

        id: Date.now(),

        productId: selected.id,

        product: selected.name,

        qty: Number(qty.value),

        price:Number(price.value),

        total: Number(total.value),

        payment: payment.value,

        date:new Date().toISOString().split("T")[0]
    };

    if (sale.payment === "Loan") {

        loanSales.push(sale);

    } else {

        sales.push(sale);

    }

    selected.quantity -= sale.qty;

    localStorage.setItem(
    "products",
    JSON.stringify(products)
);

    displaySales();
    updateCharts();
    form.reset();

    salesStock.value = "";
    price.value = "";
    total.value = "";

}

function editSale(id) {

    const sale = sales.find(s => s.id == id);

    if (!sale) return;

    editId = id;

    const productObj = products.find(p => p.id == sale.productId);

    productObj.quantity += sale.qty;
    localStorage.setItem("products", JSON.stringify(products));
    product.value = sale.productId;

    salesStock.value = productObj.stock;

    price.value = sale.price;

    qty.value = sale.qty;

    total.value = sale.total;

    payment.value = sale.payment;

}
function updateSale(selected) {

    const sale = sales.find(s => s.id == editId);

    if (!sale) return;

    if (Number(qty.value) > Number(selected.stock)) {

        alert("Insufficient Stock");

        return;

    }

    sale.productId = selected.id;

    sale.product = selected.name;

    sale.qty = Number(qty.value);

    sale.price = Number(price.value);

    sale.total = Number(total.value);

    sale.payment = payment.value;

    selected.quantity -= sale.qty;

    editId = null;

    localStorage.setItem("products", JSON.stringify(products));

    displaySales();
    updateCharts();   
    form.reset();

    salesStock.value = "";

    price.value = "";

    total.value = "";

}
function deleteSale(id) {

    if (!confirm("Delete this sale?")) return;

    const index = sales.findIndex(s => s.id == id);

    if (index == -1) return;

    const sale = sales[index];

    const productObj = products.find(p => p.id == sale.productId);

    productObj.quantity += sale.qty;

    localStorage.setItem("products", JSON.stringify(products));
    sales.splice(index, 1);

    displaySales();
    updateCharts();   

}

function updateDashboard(data = sales){

    let revenue = 0;

    let profit = 0;

    let qty = 0;

    data.forEach(s=>{

        revenue += s.total;

        qty += s.qty;

        const p = products.find(x=>x.id == s.productId);

        if(p){

            profit += (p.price - p.cost) * s.qty;

        }

    });

    todaySales.textContent = data.length;

    todayRevenue.textContent = "ETB " + revenue.toFixed(2);

    productsSold.textContent = qty;

    totalProfit.textContent = "ETB " + profit.toFixed(2);

}

filterBtn.addEventListener("click",()=>{

    if(fromDate.value=="" || toDate.value==""){

        alert("Select both dates.");

        return;

    }

    const filtered = sales.filter(s=>{

        return s.date >= fromDate.value &&
               s.date <= toDate.value;

    });

    renderFiltered(filtered);

});
resetBtn.addEventListener("click",()=>{

    displaySales();

    updateDashboard(sales);

});

function renderFiltered(data){

    tbody.innerHTML="";

    data.forEach((sale,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${sale.product}</td>

            <td>${sale.qty}</td>

            <td>${sale.price}</td>

            <td>${sale.total}</td>

            <td>${sale.payment}</td>

            <td>${sale.date}</td>

            <td>

                <button class="btn btn-warning btn-sm"
                onclick="editSale(${sale.id})">

                Edit

                </button>

                <button class="btn btn-danger btn-sm"
                onclick="deleteSale(${sale.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboard(data);

}

function dailySales(){

    const today = new Date().toISOString().split("T")[0];

    return sales.filter(s=>s.date===today);

}

function monthlySales(){

    const month = new Date().toISOString().slice(0,7);

    return sales.filter(s=>s.date.startsWith(month));

}
function annualSales(){

    const year = new Date().getFullYear().toString();

    return sales.filter(s=>s.date.startsWith(year));

}

console.log(dailySales());

console.log(monthlySales());

console.log(annualSales());

function drawRevenueChart(){

    const months = {};
    
    sales.forEach(s=>{

        const month = s.date.substring(0,7);

        months[month] = (months[month] || 0) + s.total;

    });

    if(revenueChart){

        revenueChart.destroy();

    }

    revenueChart = new Chart(

        document.getElementById("revenueChart"),

        {

            type:"bar",

            data:{

                labels:Object.keys(months),

                datasets:[{

                    label:"Revenue",

                    data:Object.values(months)

                }]

            }

        }

    );

}

function drawPaymentChart(){

    const paymentData={};

    sales.forEach(s=>{

        paymentData[s.payment]=(paymentData[s.payment]||0)+1;

    });

    if(paymentChart){

        paymentChart.destroy();

    }

    paymentChart=new Chart(

        document.getElementById("paymentChart"),

        {

            type:"pie",

            data:{

                labels:Object.keys(paymentData),

                datasets:[{

                    data:Object.values(paymentData)

                }]

            }

        }

    );

}

function drawProductChart(){

    const productsData={};

    sales.forEach(s=>{

        productsData[s.product]=(productsData[s.product]||0)+s.qty;

    });

    if(productChart){

        productChart.destroy();

    }

    productChart=new Chart(

        document.getElementById("productChart"),

        {

            type:"bar",

            data:{

                labels:Object.keys(productsData),

                datasets:[{

                    label:"Quantity Sold",

                    data:Object.values(productsData)

                }]

            }

        }

    );

}

function updateCharts(){

    drawRevenueChart();

    drawPaymentChart();

    drawProductChart();

}
