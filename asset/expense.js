
//=====================================
// Expense Management
//=====================================

// Input Elements
const expenseReason = document.getElementById("expenseReason");
const expenseAmount = document.getElementById("expenseAmount");
const expenseVendor = document.getElementById("expenseVendor");
const expenseDate = document.getElementById("expenseDate");
const paymentMethod = document.getElementById("paymentMethod");

// Buttons
const addExpenseBtn = document.getElementById("addExpenseBtn");
const updateExpenseBtn = document.getElementById("updateExpenseBtn");

// Table
const expenseTableBody = document.getElementById("expenseTableBody");

// Total
const totalExpense = document.getElementById("totalExpense");

// Search
const searchExpense = document.getElementById("searchExpense");

//=====================================
// Variables
//=====================================

let expenses = [];
let editIndex = -1;

//=====================================
// Add Expense
//=====================================

addExpenseBtn.addEventListener("click", addExpense);

function addExpense() {

    const reason = expenseReason.value.trim();
    const amount = expenseAmount.value.trim();
    const vendor = expenseVendor.value.trim();
    const date = expenseDate.value;
    const payment = paymentMethod.value;

    // Validation

    if (reason === "") {
        alert("Please select expense reason.");
        expenseReason.focus();
        return;
    }

    if (amount === "" || Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        expenseAmount.focus();
        return;
    }

    if (vendor === "") {
        alert("Please enter vendor name.");
        expenseVendor.focus();
        return;
    }

    if (date === "") {
        alert("Please select expense date.");
        expenseDate.focus();
        return;
    }

    if (payment === "") {
        alert("Please select payment method.");
        paymentMethod.focus();
        return;
    }

    const expense = {

        reason,
        amount: Number(amount),
        vendor,
        date,
        payment

    };

        expenses.push(expense);

        saveExpenses();

        displayExpenses();

        calculateTotal();

        clearForm();

}

//=====================================
// Display Expenses
//=====================================

function displayExpenses() {

    expenseTableBody.innerHTML = "";

    if (expenses.length === 0) {

        expenseTableBody.innerHTML = `

            <tr>

                <td colspan="7" class="no-data">

                    No expense records found.

                </td>

            </tr>

        `;

        return;

    }

    expenses.forEach((expense, index) => {

        expenseTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>

                    <span class="reason-badge">

                        ${expense.reason}

                    </span>

                </td>

                <td>

                    ${expense.amount.toFixed(2)}

                </td>

                <td>

                    ${expense.vendor}

                </td>

                <td>

                    ${expense.date}

                </td>

                <td>

                    <span class="payment-badge ${expense.payment.toLowerCase()}">

                        ${expense.payment}

                    </span>

                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editExpense(${index})">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteExpense(${index})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

//=====================================
// Calculate Total
//=====================================

function calculateTotal() {

    let total = 0;

    expenses.forEach(expense => {

        total += expense.amount;

    });

    totalExpense.textContent = total.toFixed(2);

}

//=====================================
// Clear Form
//=====================================

function clearForm() {

    expenseReason.value = "";
    expenseAmount.value = "";
    expenseVendor.value = "";
    expenseDate.value = "";
    paymentMethod.value = "";

}

//=====================================
// Initial Load
//=====================================

displayExpenses();
calculateTotal();

//=====================================
// Edit Expense
//=====================================

function editExpense(index) {

    editIndex = index;

    const expense = expenses[index];

    expenseReason.value = expense.reason;
    expenseAmount.value = expense.amount;
    expenseVendor.value = expense.vendor;
    expenseDate.value = expense.date;
    paymentMethod.value = expense.payment;

    addExpenseBtn.style.display = "none";
    updateExpenseBtn.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

//=====================================
// Update Expense
//=====================================

updateExpenseBtn.addEventListener("click", updateExpense);

function updateExpense() {

    const reason = expenseReason.value.trim();
    const amount = expenseAmount.value.trim();
    const vendor = expenseVendor.value.trim();
    const date = expenseDate.value;
    const payment = paymentMethod.value;

    // Validation

    if (reason === "") {
        alert("Please select expense reason.");
        return;
    }

    if (amount === "" || Number(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (vendor === "") {
        alert("Please enter vendor name.");
        return;
    }

    if (date === "") {
        alert("Please select expense date.");
        return;
    }

    if (payment === "") {
        alert("Please select payment method.");
        return;
    }

    expenses[editIndex] = {

        reason,
        amount: Number(amount),
        vendor,
        date,
        payment

    };

    saveExpenses();

    displayExpenses();

    calculateTotal();

    clearForm();

    addExpenseBtn.style.display = "block";
    updateExpenseBtn.style.display = "none";

    editIndex = -1;

}

//=====================================
// Delete Expense
//=====================================

function deleteExpense(index) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    expenses.splice(index, 1);

    saveExpenses();

    displayExpenses();

    calculateTotal();

}

//=====================================
// Search Expense
//=====================================

searchExpense.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = expenseTableBody.querySelectorAll("tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";

    });

});

//=====================================
// Save to Local Storage
//=====================================

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

//=====================================
// Load from Local Storage
//=====================================

function loadExpenses() {

    const data = localStorage.getItem("expenses");

    if (data) {

        expenses = JSON.parse(data);

    }

    displayExpenses();

    calculateTotal();

}

loadExpenses();

