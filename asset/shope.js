<<<<<<< HEAD
// ===============================
// Product Storage
// ===============================

let products = JSON.parse(localStorage.getItem("products")) || [];




// ===============================
// Load Products When Page Opens
// ===============================

window.onload = function(){

    displayProducts();

    updateDashboard();

};


// ===============================
// Add Product
// ===============================


document
.getElementById("productForm")
.addEventListener("submit",function(e){


e.preventDefault();



let product = {


id:Date.now(),


name:
document.getElementById("productName").value.trim(),


brand:
document.getElementById("brand").value.trim(),



purchasePrice:
Number(
document.getElementById("purchasePrice").value
),



sellingPrice:
Number(
document.getElementById("sellingPrice").value
),



quantity:
Number(
document.getElementById("quantity").value
)



};





if(
product.name==="" ||
product.brand==="" ||
product.purchasePrice<=0 ||
product.sellingPrice<=0 ||
product.quantity<0
){

alert("Please enter valid information");
return;

}




product.status=getStatus(product.quantity);



products.push(product);



saveProducts();


displayProducts();


updateDashboard();



this.reset();



bootstrap.Modal
.getInstance(
document.getElementById("addProductModal")
)
.hide();



});







// ===============================
// Status Calculation
// ===============================


function getStatus(quantity){


if(quantity===0){

return "Out Of Stock";

}

else if(quantity<=5){

return "Low Stock";

}

else{

return "Available";

}


}







// ===============================
// Display Product Table
// ===============================


function displayProducts(data=products){


let table=
document.getElementById("productTable");


table.innerHTML="";



data.forEach((product,index)=>{



let badge;



if(product.status==="Available"){

badge="available";

}

else if(product.status==="Low Stock"){

badge="low-stock";

}

else{

badge="out-stock";

}





table.innerHTML +=`


<tr>


<td>${index+1}</td>


<td>
<strong>${product.name}</strong>
</td>


<td>${product.brand}</td>



<td>$${product.purchasePrice}</td>



<td>$${product.sellingPrice}</td>



<td>${product.quantity}</td>



<td>

<span class="status-badge ${badge}">
${product.status}
</span>

</td>



<td>


<button 
class="btn btn-sm btn-warning"
onclick="editProduct(${product.id})">

<i class="bi bi-pencil"></i>

</button>



<button 
class="btn btn-sm btn-danger"
onclick="deleteProduct(${product.id})">

<i class="bi bi-trash"></i>

</button>


</td>



</tr>


`;



});


}








// ===============================
// Delete Product
// ===============================


function deleteProduct(id){


if(confirm("Delete this product?")){


products =
products.filter(
product=>product.id!==id
);



saveProducts();


displayProducts();


updateDashboard();



}


}








// ===============================
// Edit Product
// ===============================


function editProduct(id){


let product =
products.find(
p=>p.id===id
);



document.getElementById("productName").value=
product.name;


document.getElementById("brand").value=
product.brand;


document.getElementById("purchasePrice").value=
product.purchasePrice;


document.getElementById("sellingPrice").value=
product.sellingPrice;


document.getElementById("quantity").value=
product.quantity;



deleteProduct(id);



let modal =
new bootstrap.Modal(
document.getElementById("addProductModal")
);


modal.show();



}







// ===============================
// Search Product
// ===============================


document
.getElementById("searchProduct")
.addEventListener("keyup",function(){



let keyword=
this.value.toLowerCase();



let result =
products.filter(product=>

product.name
.toLowerCase()
.includes(keyword)

||

product.brand
.toLowerCase()
.includes(keyword)


);



displayProducts(result);



});







// ===============================
// Save Data
// ===============================


function saveProducts(){


localStorage.setItem(
"products",
JSON.stringify(products)
);


}







// ===============================
// Dashboard
// ===============================


function updateDashboard(){



document
.getElementById("totalProducts")
.innerHTML=
products.length;




document
.getElementById("availableProducts")
.innerHTML=
products.filter(
p=>p.status==="Available"
).length;




document
.getElementById("lowStock")
.innerHTML=
products.filter(
p=>p.status==="Low Stock"
).length;




document
.getElementById("outStock")
.innerHTML=
products.filter(
p=>p.status==="Out Of Stock"
).length;



}


products.push({
    id: Date.now(),
    name: productName,
    brand: brand,
    purchasePrice: purchasePrice,
    sellingPrice: sellingPrice,
    quantity: quantity
});


localStorage.setItem("products", JSON.stringify(products));

window.addEventListener("storage", function(){

    displayProducts();

=======
// ===============================
// Product Storage
// ===============================

let products = JSON.parse(localStorage.getItem("products")) || [];




// ===============================
// Load Products When Page Opens
// ===============================

window.onload = function(){

    displayProducts();

    updateDashboard();

};


// ===============================
// Add Product
// ===============================


document
.getElementById("productForm")
.addEventListener("submit",function(e){


e.preventDefault();



let product = {


id:Date.now(),


name:
document.getElementById("productName").value.trim(),


brand:
document.getElementById("brand").value.trim(),



purchasePrice:
Number(
document.getElementById("purchasePrice").value
),



sellingPrice:
Number(
document.getElementById("sellingPrice").value
),



quantity:
Number(
document.getElementById("quantity").value
)



};





if(
product.name==="" ||
product.brand==="" ||
product.purchasePrice<=0 ||
product.sellingPrice<=0 ||
product.quantity<0
){

alert("Please enter valid information");
return;

}




product.status=getStatus(product.quantity);



products.push(product);



saveProducts();


displayProducts();


updateDashboard();



this.reset();



bootstrap.Modal
.getInstance(
document.getElementById("addProductModal")
)
.hide();



});







// ===============================
// Status Calculation
// ===============================


function getStatus(quantity){


if(quantity===0){

return "Out Of Stock";

}

else if(quantity<=5){

return "Low Stock";

}

else{

return "Available";

}


}







// ===============================
// Display Product Table
// ===============================


function displayProducts(data=products){


let table=
document.getElementById("productTable");


table.innerHTML="";



data.forEach((product,index)=>{



let badge;



if(product.status==="Available"){

badge="available";

}

else if(product.status==="Low Stock"){

badge="low-stock";

}

else{

badge="out-stock";

}





table.innerHTML +=`


<tr>


<td>${index+1}</td>


<td>
<strong>${product.name}</strong>
</td>


<td>${product.brand}</td>



<td>$${product.purchasePrice}</td>



<td>$${product.sellingPrice}</td>



<td>${product.quantity}</td>



<td>

<span class="status-badge ${badge}">
${product.status}
</span>

</td>



<td>


<button 
class="btn btn-sm btn-warning"
onclick="editProduct(${product.id})">

<i class="bi bi-pencil"></i>

</button>



<button 
class="btn btn-sm btn-danger"
onclick="deleteProduct(${product.id})">

<i class="bi bi-trash"></i>

</button>


</td>



</tr>


`;



});


}








// ===============================
// Delete Product
// ===============================


function deleteProduct(id){


if(confirm("Delete this product?")){


products =
products.filter(
product=>product.id!==id
);



saveProducts();


displayProducts();


updateDashboard();



}


}








// ===============================
// Edit Product
// ===============================


function editProduct(id){


let product =
products.find(
p=>p.id===id
);



document.getElementById("productName").value=
product.name;


document.getElementById("brand").value=
product.brand;


document.getElementById("purchasePrice").value=
product.purchasePrice;


document.getElementById("sellingPrice").value=
product.sellingPrice;


document.getElementById("quantity").value=
product.quantity;



deleteProduct(id);



let modal =
new bootstrap.Modal(
document.getElementById("addProductModal")
);


modal.show();



}







// ===============================
// Search Product
// ===============================


document
.getElementById("searchProduct")
.addEventListener("keyup",function(){



let keyword=
this.value.toLowerCase();



let result =
products.filter(product=>

product.name
.toLowerCase()
.includes(keyword)

||

product.brand
.toLowerCase()
.includes(keyword)


);



displayProducts(result);



});







// ===============================
// Save Data
// ===============================


function saveProducts(){


localStorage.setItem(
"products",
JSON.stringify(products)
);


}







// ===============================
// Dashboard
// ===============================


function updateDashboard(){



document
.getElementById("totalProducts")
.innerHTML=
products.length;




document
.getElementById("availableProducts")
.innerHTML=
products.filter(
p=>p.status==="Available"
).length;




document
.getElementById("lowStock")
.innerHTML=
products.filter(
p=>p.status==="Low Stock"
).length;




document
.getElementById("outStock")
.innerHTML=
products.filter(
p=>p.status==="Out Of Stock"
).length;



}


products.push({
    id: Date.now(),
    name: productName,
    brand: brand,
    purchasePrice: purchasePrice,
    sellingPrice: sellingPrice,
    quantity: quantity
});


localStorage.setItem("products", JSON.stringify(products));

window.addEventListener("storage", function(){

    displayProducts();

>>>>>>> f3b2bc90ea3fb5a137f9296901058b59c4a16e73
});