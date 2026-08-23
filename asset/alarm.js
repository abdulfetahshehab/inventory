<<<<<<< HEAD

// =====================================
// Load Products From Local Storage
// =====================================


let products = JSON.parse(
    localStorage.getItem("products")
) || [


    {
        id:1,
        name:"Vitamin C Serum",
        brand:"Glow Beauty",
        quantity:5,
        minStock:10,
        viewed:false
    },


    {
        id:2,
        name:"Face Moisturizer",
        brand:"Pure Skin",
        quantity:0,
        minStock:15,
        viewed:false
    },


    {
        id:3,
        name:"Hair Shampoo",
        brand:"Nature Care",
        quantity:8,
        minStock:12,
        viewed:false
    },


    {
        id:4,
        name:"Lipstick",
        brand:"Luxury Make",
        quantity:0,
        minStock:5,
        viewed:false
    }


];






// Save Data

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}








// =====================================
// Elements
// =====================================


const lowStockTable =
document.getElementById("lowStockTable");


const outStockTable =
document.getElementById("outStockTable");


const lowStockCount =
document.getElementById("lowStockCount");


const outStockCount =
document.getElementById("outStockCount");


const searchProduct =
document.getElementById("searchProduct");








// =====================================
// Stock Detection
// =====================================


function lowStockProducts(data){

    return data.filter(product =>

        product.quantity > 0 &&
        product.quantity <= product.minStock

    );

}



function outStockProducts(data){

    return data.filter(product =>

        product.quantity === 0

    );

}








// =====================================
// Show Toast Notification
// =====================================


function showToast(message,type="danger"){


    let toast = document.createElement("div");


    toast.className = 
    `toast-message ${type}`;


    toast.innerHTML = `

        <i class="bi bi-bell-fill"></i>

        ${message}

    `;



    document.body.appendChild(toast);



    setTimeout(()=>{


        toast.classList.add("show");


    },100);




    setTimeout(()=>{


        toast.classList.remove("show");


        setTimeout(()=>{

            toast.remove();

        },500);



    },3000);



}









// =====================================
// Render Low Stock Table
// =====================================


function renderLowStock(data){


    lowStockTable.innerHTML="";


    data.forEach(product=>{


        lowStockTable.innerHTML += `


        <tr class="fade-row">


            <td>
                <b>${product.name}</b>
            </td>


            <td>
                ${product.brand}
            </td>


            <td>

                <span class="badge-low">

                ${product.quantity}

                </span>

            </td>


            <td>
                ${product.minStock}
            </td>


            <td>

                <span class="badge-low">

                Low Stock

                </span>

            </td>


            <td>


                <button 
                class="stock-btn"
                onclick="restock(${product.id})">

                <i class="bi bi-plus-circle"></i>
                Restock

                </button>


            </td>


        </tr>


        `;


    });


}









// =====================================
// Render Out Stock Table
// =====================================


function renderOutStock(data){


    outStockTable.innerHTML="";



    data.forEach(product=>{


        outStockTable.innerHTML += `


        <tr class="fade-row">


            <td>
                <b>${product.name}</b>
            </td>


            <td>
                ${product.brand}
            </td>



            <td>

                <span class="badge-out">

                ${product.quantity}

                </span>

            </td>



            <td>

                <span class="badge-out">

                Out Of Stock

                </span>


            </td>



            <td>


                <button 
                class="stock-btn"
                onclick="restock(${product.id})">


                <i class="bi bi-box"></i>

                Add Stock


                </button>


            </td>


        </tr>


        `;


    });


}








// =====================================
// Dashboard Update
// =====================================


function updateDashboard(data){



    let low =
    lowStockProducts(data);



    let out =
    outStockProducts(data);



    lowStockCount.innerHTML =
    low.length;



    outStockCount.innerHTML =
    out.length;



    renderLowStock(low);


    renderOutStock(out);





    if(low.length > 0){

        showToast(
            `${low.length} products have low stock`
        );

    }



    if(out.length > 0){

        showToast(
            `${out.length} products are out of stock`
        );

    }


}








// =====================================
// Restock Product
// =====================================


function restock(id){


    let product =
    products.find(
        item=>item.id===id
    );



    let qty =
    Number(
        prompt(
            `Add quantity for ${product.name}`
        )
    );



    if(qty > 0){


        product.quantity += qty;


        product.viewed=true;


        saveProducts();



        updateDashboard(products);



        showToast(
            `${product.name} restocked successfully`,
            "success"
        );


    }


}








// =====================================
// Search
// =====================================


searchProduct.addEventListener(
"keyup",
()=>{


    let value =
    searchProduct.value.toLowerCase();



    let filtered =
    products.filter(product=>

        product.name
        .toLowerCase()
        .includes(value)

        ||

        product.brand
        .toLowerCase()
        .includes(value)


    );



    updateDashboard(filtered);


});








// First Load

=======

// =====================================
// Load Products From Local Storage
// =====================================


let products = JSON.parse(
    localStorage.getItem("products")
) || [


    {
        id:1,
        name:"Vitamin C Serum",
        brand:"Glow Beauty",
        quantity:5,
        minStock:10,
        viewed:false
    },


    {
        id:2,
        name:"Face Moisturizer",
        brand:"Pure Skin",
        quantity:0,
        minStock:15,
        viewed:false
    },


    {
        id:3,
        name:"Hair Shampoo",
        brand:"Nature Care",
        quantity:8,
        minStock:12,
        viewed:false
    },


    {
        id:4,
        name:"Lipstick",
        brand:"Luxury Make",
        quantity:0,
        minStock:5,
        viewed:false
    }


];






// Save Data

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}








// =====================================
// Elements
// =====================================


const lowStockTable =
document.getElementById("lowStockTable");


const outStockTable =
document.getElementById("outStockTable");


const lowStockCount =
document.getElementById("lowStockCount");


const outStockCount =
document.getElementById("outStockCount");


const searchProduct =
document.getElementById("searchProduct");








// =====================================
// Stock Detection
// =====================================


function lowStockProducts(data){

    return data.filter(product =>

        product.quantity > 0 &&
        product.quantity <= product.minStock

    );

}



function outStockProducts(data){

    return data.filter(product =>

        product.quantity === 0

    );

}








// =====================================
// Show Toast Notification
// =====================================


function showToast(message,type="danger"){


    let toast = document.createElement("div");


    toast.className = 
    `toast-message ${type}`;


    toast.innerHTML = `

        <i class="bi bi-bell-fill"></i>

        ${message}

    `;



    document.body.appendChild(toast);



    setTimeout(()=>{


        toast.classList.add("show");


    },100);




    setTimeout(()=>{


        toast.classList.remove("show");


        setTimeout(()=>{

            toast.remove();

        },500);



    },3000);



}









// =====================================
// Render Low Stock Table
// =====================================


function renderLowStock(data){


    lowStockTable.innerHTML="";


    data.forEach(product=>{


        lowStockTable.innerHTML += `


        <tr class="fade-row">


            <td>
                <b>${product.name}</b>
            </td>


            <td>
                ${product.brand}
            </td>


            <td>

                <span class="badge-low">

                ${product.quantity}

                </span>

            </td>


            <td>
                ${product.minStock}
            </td>


            <td>

                <span class="badge-low">

                Low Stock

                </span>

            </td>


            <td>


                <button 
                class="stock-btn"
                onclick="restock(${product.id})">

                <i class="bi bi-plus-circle"></i>
                Restock

                </button>


            </td>


        </tr>


        `;


    });


}









// =====================================
// Render Out Stock Table
// =====================================


function renderOutStock(data){


    outStockTable.innerHTML="";



    data.forEach(product=>{


        outStockTable.innerHTML += `


        <tr class="fade-row">


            <td>
                <b>${product.name}</b>
            </td>


            <td>
                ${product.brand}
            </td>



            <td>

                <span class="badge-out">

                ${product.quantity}

                </span>

            </td>



            <td>

                <span class="badge-out">

                Out Of Stock

                </span>


            </td>



            <td>


                <button 
                class="stock-btn"
                onclick="restock(${product.id})">


                <i class="bi bi-box"></i>

                Add Stock


                </button>


            </td>


        </tr>


        `;


    });


}








// =====================================
// Dashboard Update
// =====================================


function updateDashboard(data){



    let low =
    lowStockProducts(data);



    let out =
    outStockProducts(data);



    lowStockCount.innerHTML =
    low.length;



    outStockCount.innerHTML =
    out.length;



    renderLowStock(low);


    renderOutStock(out);





    if(low.length > 0){

        showToast(
            `${low.length} products have low stock`
        );

    }



    if(out.length > 0){

        showToast(
            `${out.length} products are out of stock`
        );

    }


}








// =====================================
// Restock Product
// =====================================


function restock(id){


    let product =
    products.find(
        item=>item.id===id
    );



    let qty =
    Number(
        prompt(
            `Add quantity for ${product.name}`
        )
    );



    if(qty > 0){


        product.quantity += qty;


        product.viewed=true;


        saveProducts();



        updateDashboard(products);



        showToast(
            `${product.name} restocked successfully`,
            "success"
        );


    }


}








// =====================================
// Search
// =====================================


searchProduct.addEventListener(
"keyup",
()=>{


    let value =
    searchProduct.value.toLowerCase();



    let filtered =
    products.filter(product=>

        product.name
        .toLowerCase()
        .includes(value)

        ||

        product.brand
        .toLowerCase()
        .includes(value)


    );



    updateDashboard(filtered);


});








// First Load

>>>>>>> f3b2bc90ea3fb5a137f9296901058b59c4a16e73
updateDashboard(products);