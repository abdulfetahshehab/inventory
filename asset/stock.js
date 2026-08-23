<<<<<<< HEAD

// ================================
// Store Products Data
// ================================

let storeProducts = JSON.parse(localStorage.getItem("storeProducts")) || [

    {
        id:1,
        name:"Donex",
        brand:"china",
        purchasePrice:900,
        sellingPrice:1200,
        quantity:50
    },

    {
        id:2,
        name:"Berrak",
        brand:"Turkiye",
        purchasePrice:350,
        sellingPrice:500,
        quantity:30
    },

    {
        id:3,
        name:"Brix",
        brand:"China",
        purchasePrice:700,
        sellingPrice:900,
        quantity:15
    }

];
if (!localStorage.getItem("storeProducts")) {
    localStorage.setItem("storeProducts", JSON.stringify(storeProducts));
}


// ================================
// Add Store Product
// ================================

document.getElementById("storeForm").addEventListener("submit", function(e){

    e.preventDefault();

    const product = {

        id: Date.now(),

        name: document.getElementById("storeProductName").value.trim(),

        brand: document.getElementById("storeBrand").value.trim(),

        purchasePrice: Number(document.getElementById("storePurchasePrice").value),

        sellingPrice: Number(document.getElementById("storeSellingPrice").value),

        quantity: Number(document.getElementById("storeQuantity").value)

    };

    storeProducts.push(product);

    localStorage.setItem(
        "storeProducts",
        JSON.stringify(storeProducts)
    );

    displayStoreProducts();
    updateSummary();

    this.reset();

    bootstrap.Modal.getInstance(
        document.getElementById("addProductModal")
    ).hide();

    alert("Product added successfully.");

});

// ================================
// Shop Products Data
// (Connected with Product Management)
// ================================

let shopProducts = JSON.parse(localStorage.getItem("products")) || [];




// ================================
// Display Store Products
// ================================

function displayStoreProducts(){

    let table = document.getElementById("storeTable");

    table.innerHTML="";


    storeProducts.forEach((product,index)=>{


        let status = "";

        if(product.quantity <= 0){

            status = `
            <span class="badge bg-danger">
            Out Stock
            </span>
            `;

        }
        else if(product.quantity <= 5){

            status = `
            <span class="badge bg-warning text-dark">
            Low Stock
            </span>
            `;

        }
        else{

            status = `
            <span class="badge bg-success">
            Available
            </span>
            `;

        }



        table.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${product.name}</td>

            <td>${product.brand}</td>

            <td>${product.purchasePrice}</td>
            <td>${product.sellingPrice}</td>

            <td>${product.quantity}</td>

            <td>
                ${status}
            </td>


            <td>

                <button
                    class="btn btn-primary btn-sm me-1"
                    onclick="editStoreProduct(${product.id})">
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    class="btn btn-danger btn-sm me-1"
                    onclick="deleteStoreProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>

                <button
                    class="btn btn-success btn-sm"
                    onclick="openTransfer(${index})">
                    <i class="bi bi-arrow-left-right"></i>
                    Transfer
                </button>

            </td>


        </tr>

        `;


    });



}



// ================================
// Open Transfer Modal
// ================================

function openTransfer(index){


    let product = storeProducts[index];


    document.getElementById("transferIndex").value=index;


    document.getElementById("transferProduct").value=
    product.name;


    document.getElementById("availableQuantity").value=
    product.quantity;



    document.getElementById("transferQuantity").value="";



    document.getElementById("transferDate").value =
    new Date().toISOString().split("T")[0];



    let modal =
    new bootstrap.Modal(
        document.getElementById("transferModal")
    );


    modal.show();



}




// ================================
// Transfer Submit
// ================================


document
.getElementById("transferForm")
.addEventListener("submit",function(e){


    e.preventDefault();



    let index =
    document.getElementById("transferIndex").value;



    let quantity =
    Number(
    document.getElementById("transferQuantity").value
    );



    let product =
    storeProducts[index];



    // Validation

    if(quantity > product.quantity){

        alert(
        "Transfer quantity cannot be greater than available stock"
        );

        return;

    }



    if(quantity <=0){

        alert(
        "Enter valid quantity"
        );

        return;

    }



    // =========================
    // Reduce Store Quantity
    // =========================

    product.quantity -= quantity;

    localStorage.setItem(
    "storeProducts",
    JSON.stringify(storeProducts)
);

    // =========================
    // Add To Shop
    // =========================


 // ============================
// Add Product Quantity To Shop
// ============================


let existingProduct = shopProducts.find(item =>

    item.name === product.name &&
    item.brand === product.brand

);



if(existingProduct){


    // Product already exists in shop

    existingProduct.quantity += quantity;


}

else{


    // New product comes to shop

    shopProducts.push({

        id: Date.now(),

        name: product.name,

        brand: product.brand,

        purchasePrice: product.purchasePrice,

        sellingPrice: product.sellingPrice,

        quantity: quantity,

        status:"Available"

    });


}



    // Save data

    localStorage.setItem(
    "products",
    JSON.stringify(shopProducts)
    );






    // Save transfer history

    saveTransferHistory({

        product:product.name,

        quantity:quantity,

        date:
        document.getElementById("transferDate").value,

        destination:"Shop"

    });


    bootstrap.Modal
    .getInstance(
    document.getElementById("transferModal")
    )
    .hide();


    displayStoreProducts();
    updateSummary();

    alert(
    "Product transferred successfully"
    );
});





// ================================
// Transfer History
// ================================


function saveTransferHistory(data){


    let history =
    JSON.parse(
    localStorage.getItem("transferHistory")
    ) || [];



    history.push(data);



    localStorage.setItem(
        "transferHistory",
        JSON.stringify(history)
    );

    

}

function deleteStoreProduct(id){


    if(!confirm("Delete this product?")) return;

    storeProducts = storeProducts.filter(product => product.id !== id);

    localStorage.setItem(
        "storeProducts",
        JSON.stringify(storeProducts)
    );

    displayStoreProducts();
    updateSummary();

}

function editStoreProduct(id){

    let product = storeProducts.find(product => product.id === id);

    if(!product) return;

    alert(
        "Connect this function to your Add/Edit Product Modal.\n\nProduct: "
        + product.name
    );


}

function updateSummary(){

    document.getElementById("totalProducts").innerText =
        storeProducts.length;

    document.getElementById("availableProducts").innerText =
        storeProducts.filter(p=>p.quantity>5).length;

    document.getElementById("lowStock").innerText =
        storeProducts.filter(p=>p.quantity>0 && p.quantity<=5).length;

    document.getElementById("outStock").innerText =
        storeProducts.filter(p=>p.quantity==0).length;

}

// ================================
// Search Store Products
// ================================

document.getElementById("searchStoreProduct").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#storeTable tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        row.style.display = text.includes(keyword) ? "" : "none";

    });

});



// Load Page

displayStoreProducts();
updateSummary();
=======

// ================================
// Store Products Data
// ================================

let storeProducts = JSON.parse(localStorage.getItem("storeProducts")) || [

    {
        id:1,
        name:"Donex",
        brand:"china",
        purchasePrice:900,
        sellingPrice:1200,
        quantity:50
    },

    {
        id:2,
        name:"Berrak",
        brand:"Turkiye",
        purchasePrice:350,
        sellingPrice:500,
        quantity:30
    },

    {
        id:3,
        name:"Brix",
        brand:"China",
        purchasePrice:700,
        sellingPrice:900,
        quantity:15
    }

];
if (!localStorage.getItem("storeProducts")) {
    localStorage.setItem("storeProducts", JSON.stringify(storeProducts));
}


// ================================
// Add Store Product
// ================================

document.getElementById("storeForm").addEventListener("submit", function(e){

    e.preventDefault();

    const product = {

        id: Date.now(),

        name: document.getElementById("storeProductName").value.trim(),

        brand: document.getElementById("storeBrand").value.trim(),

        purchasePrice: Number(document.getElementById("storePurchasePrice").value),

        sellingPrice: Number(document.getElementById("storeSellingPrice").value),

        quantity: Number(document.getElementById("storeQuantity").value)

    };

    storeProducts.push(product);

    localStorage.setItem(
        "storeProducts",
        JSON.stringify(storeProducts)
    );

    displayStoreProducts();
    updateSummary();

    this.reset();

    bootstrap.Modal.getInstance(
        document.getElementById("addProductModal")
    ).hide();

    alert("Product added successfully.");

});

// ================================
// Shop Products Data
// (Connected with Product Management)
// ================================

let shopProducts = JSON.parse(localStorage.getItem("products")) || [];




// ================================
// Display Store Products
// ================================

function displayStoreProducts(){

    let table = document.getElementById("storeTable");

    table.innerHTML="";


    storeProducts.forEach((product,index)=>{


        let status = "";

        if(product.quantity <= 0){

            status = `
            <span class="badge bg-danger">
            Out Stock
            </span>
            `;

        }
        else if(product.quantity <= 5){

            status = `
            <span class="badge bg-warning text-dark">
            Low Stock
            </span>
            `;

        }
        else{

            status = `
            <span class="badge bg-success">
            Available
            </span>
            `;

        }



        table.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${product.name}</td>

            <td>${product.brand}</td>

            <td>${product.purchasePrice}</td>
            <td>${product.sellingPrice}</td>

            <td>${product.quantity}</td>

            <td>
                ${status}
            </td>


            <td>

                <button
                    class="btn btn-primary btn-sm me-1"
                    onclick="editStoreProduct(${product.id})">
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    class="btn btn-danger btn-sm me-1"
                    onclick="deleteStoreProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>

                <button
                    class="btn btn-success btn-sm"
                    onclick="openTransfer(${index})">
                    <i class="bi bi-arrow-left-right"></i>
                    Transfer
                </button>

            </td>


        </tr>

        `;


    });



}



// ================================
// Open Transfer Modal
// ================================

function openTransfer(index){


    let product = storeProducts[index];


    document.getElementById("transferIndex").value=index;


    document.getElementById("transferProduct").value=
    product.name;


    document.getElementById("availableQuantity").value=
    product.quantity;



    document.getElementById("transferQuantity").value="";



    document.getElementById("transferDate").value =
    new Date().toISOString().split("T")[0];



    let modal =
    new bootstrap.Modal(
        document.getElementById("transferModal")
    );


    modal.show();



}




// ================================
// Transfer Submit
// ================================


document
.getElementById("transferForm")
.addEventListener("submit",function(e){


    e.preventDefault();



    let index =
    document.getElementById("transferIndex").value;



    let quantity =
    Number(
    document.getElementById("transferQuantity").value
    );



    let product =
    storeProducts[index];



    // Validation

    if(quantity > product.quantity){

        alert(
        "Transfer quantity cannot be greater than available stock"
        );

        return;

    }



    if(quantity <=0){

        alert(
        "Enter valid quantity"
        );

        return;

    }



    // =========================
    // Reduce Store Quantity
    // =========================

    product.quantity -= quantity;

    localStorage.setItem(
    "storeProducts",
    JSON.stringify(storeProducts)
);

    // =========================
    // Add To Shop
    // =========================


 // ============================
// Add Product Quantity To Shop
// ============================


let existingProduct = shopProducts.find(item =>

    item.name === product.name &&
    item.brand === product.brand

);



if(existingProduct){


    // Product already exists in shop

    existingProduct.quantity += quantity;


}

else{


    // New product comes to shop

    shopProducts.push({

        id: Date.now(),

        name: product.name,

        brand: product.brand,

        purchasePrice: product.purchasePrice,

        sellingPrice: product.sellingPrice,

        quantity: quantity,

        status:"Available"

    });


}



    // Save data

    localStorage.setItem(
    "products",
    JSON.stringify(shopProducts)
    );






    // Save transfer history

    saveTransferHistory({

        product:product.name,

        quantity:quantity,

        date:
        document.getElementById("transferDate").value,

        destination:"Shop"

    });


    bootstrap.Modal
    .getInstance(
    document.getElementById("transferModal")
    )
    .hide();


    displayStoreProducts();
    updateSummary();

    alert(
    "Product transferred successfully"
    );
});





// ================================
// Transfer History
// ================================


function saveTransferHistory(data){


    let history =
    JSON.parse(
    localStorage.getItem("transferHistory")
    ) || [];



    history.push(data);



    localStorage.setItem(
        "transferHistory",
        JSON.stringify(history)
    );

    

}

function deleteStoreProduct(id){


    if(!confirm("Delete this product?")) return;

    storeProducts = storeProducts.filter(product => product.id !== id);

    localStorage.setItem(
        "storeProducts",
        JSON.stringify(storeProducts)
    );

    displayStoreProducts();
    updateSummary();

}

function editStoreProduct(id){

    let product = storeProducts.find(product => product.id === id);

    if(!product) return;

    alert(
        "Connect this function to your Add/Edit Product Modal.\n\nProduct: "
        + product.name
    );


}

function updateSummary(){

    document.getElementById("totalProducts").innerText =
        storeProducts.length;

    document.getElementById("availableProducts").innerText =
        storeProducts.filter(p=>p.quantity>5).length;

    document.getElementById("lowStock").innerText =
        storeProducts.filter(p=>p.quantity>0 && p.quantity<=5).length;

    document.getElementById("outStock").innerText =
        storeProducts.filter(p=>p.quantity==0).length;

}

// ================================
// Search Store Products
// ================================

document.getElementById("searchStoreProduct").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#storeTable tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        row.style.display = text.includes(keyword) ? "" : "none";

    });

});



// Load Page

displayStoreProducts();
updateSummary();
>>>>>>> f3b2bc90ea3fb5a137f9296901058b59c4a16e73
