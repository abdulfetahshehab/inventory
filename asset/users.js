<<<<<<< HEAD

/*====================================================
    USER MANAGEMENT
====================================================*/

let users = JSON.parse(localStorage.getItem("users")) || [];

const addUserModal = new bootstrap.Modal(document.getElementById("addUserModal"));

/*====================================================
    SAVE USERS
====================================================*/

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

/*====================================================
    LOAD PAGE
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    renderUsers();
    updateSummary();

});

/*====================================================
    SUMMARY CARDS
====================================================*/

function updateSummary() {

    document.getElementById("totalUsers").textContent = users.length;

    let employees = users.filter(user => user.role !== "Admin").length;

    document.getElementById("totalEmployees").textContent = employees;

}

/*====================================================
    DISPLAY USERS
====================================================*/

function renderUsers() {

    const tbody = document.getElementById("userTableBody");

    tbody.innerHTML = "";

    if (users.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    No users found.
                </td>
            </tr>
        `;

        return;
    }

    users.forEach((user, index) => {

        tbody.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${user.fullName}</td>

                <td>${user.username}</td>

                <td>${user.phone}</td>

                <td>

                    <span class="badge bg-primary">
                        ${user.role}
                    </span>

                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="openEditModal(${index})"
                        title="Edit">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="action-btn reset-btn"
                        onclick="resetPassword(${index})"
                        title="Reset Password">

                        <i class="bi bi-key"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="openDeleteModal(${index})"
                        title="Delete">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

/*====================================================
    ADD USER
====================================================*/

document.getElementById("saveUserBtn").addEventListener("click", () => {

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    /* Validation */

    if (
        fullName === "" ||
        username === "" ||
        role === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }
    if(password.length <6){
        alert("Password should be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    /* Duplicate Username */

    let exists = users.some(user =>

        user.username.toLowerCase() === username.toLowerCase()

    );

    if (exists) {

        alert("Username already exists.");

        return;

    }

    /* Save */

    users.push({

        fullName,
        username,
        phone,
        role,
        password

    });

    saveUsers();

    renderUsers();

    updateSummary();

    document.getElementById("addUserForm").reset();

    addUserModal.hide();

});

/*====================================================
    SEARCH USER
====================================================*/

document.getElementById("searchUser").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#userTableBody tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)

            ? ""

            : "none";

    });

});

/*====================================================
    EDIT USER
====================================================*/

const editUserModal = new bootstrap.Modal(
    document.getElementById("editUserModal")
);

function openEditModal(index) {

    const user = users[index];

    document.getElementById("editIndex").value = index;
    document.getElementById("editFullName").value = user.fullName;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editPhone").value = user.phone;
    document.getElementById("editRole").value = user.role;

    editUserModal.show();

}

document.getElementById("updateUserBtn").addEventListener("click", () => {

    const index = document.getElementById("editIndex").value;

    const fullName = document.getElementById("editFullName").value.trim();
    const username = document.getElementById("editUsername").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const role = document.getElementById("editRole").value;

    if (fullName === "" || username === "" || role === "") {

        alert("Please fill all required fields.");
        return;

    }

    // Check duplicate username
    const duplicate = users.some((user, i) => {

        return (
            i != index &&
            user.username.toLowerCase() === username.toLowerCase()
        );

    });

    if (duplicate) {

        alert("Username already exists.");
        return;

    }

    users[index].fullName = fullName;
    users[index].username = username;
    users[index].phone = phone;
    users[index].role = role;

    saveUsers();
    renderUsers();
    updateSummary();

    editUserModal.hide();

});


/*====================================================
    DELETE USER
====================================================*/

const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
);

function openDeleteModal(index) {

    document.getElementById("deleteIndex").value = index;

    deleteModal.show();

}

document.getElementById("confirmDelete").addEventListener("click", () => {

    const index = document.getElementById("deleteIndex").value;

    // Prevent deleting the only Admin
    if (
        users[index].role === "Admin" &&
        users.filter(user => user.role === "Admin").length === 1
    ) {

        alert("The only Admin account cannot be deleted.");
        return;

    }

    users.splice(index, 1);

    saveUsers();
    renderUsers();
    updateSummary();

    deleteModal.hide();

});


/*====================================================
    RESET PASSWORD
====================================================*/

function resetPassword(index) {

    const newPassword = prompt("Enter a new password:");

    if (newPassword === null) return;

    if (newPassword.trim().length < 4) {

        alert("Password must contain at least 4 characters.");
        return;

    }

    users[index].password = newPassword.trim();

    saveUsers();

    alert("Password has been reset successfully.");

}


/*====================================================
    OPTIONAL:
    CREATE DEFAULT ADMIN IF NONE EXISTS
====================================================*/

if (users.length === 0) {

    users.push({

        fullName: "System Administrator",
        username: "admin",
        phone: "",
        role: "Admin",
        password: "admin123"

    });

    saveUsers();

}
/*====================================================
    USERS.JS - PART 5
    Final Validation & Utility Functions
====================================================*/


/*=========================================
    ALLOW ONLY LETTERS IN NAME
=========================================*/

document.getElementById("fullName").addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

});

document.getElementById("editFullName").addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

});


/*=========================================
    ALLOW ONLY NUMBERS IN PHONE
=========================================*/

document.getElementById("phone").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});

document.getElementById("editPhone").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});


/*=========================================
    USERNAME FORMAT
=========================================*/

document.getElementById("username").addEventListener("input", function () {

    this.value = this.value
        .toLowerCase()
        .replace(/\s/g, "");

});

document.getElementById("editUsername").addEventListener("input", function () {

    this.value = this.value
        .toLowerCase()
        .replace(/\s/g, "");

});


/*=========================================
    ENTER KEY SUPPORT
=========================================*/

document.getElementById("addUserForm")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("saveUserBtn").click();

    }

});


document.getElementById("editUserForm")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("updateUserBtn").click();

    }

});


/*=========================================
    CLEAR ADD FORM
=========================================*/

function clearAddForm() {

    document.getElementById("addUserForm").reset();

}


/*=========================================
    AUTO CLEAR WHEN MODAL CLOSES
=========================================*/

document.getElementById("addUserModal")
.addEventListener("hidden.bs.modal", clearAddForm);


/*=========================================
    PASSWORD LENGTH CHECK
=========================================*/

document.getElementById("password")
.addEventListener("blur", function () {

    if (this.value.length > 0 && this.value.length < 6) {

        alert("Password should be at least 6 characters.");

        this.value= "";

    }

});


/*=========================================
    PASSWORD MATCH CHECK
=========================================*/

document.getElementById("confirmPassword")
.addEventListener("blur", function () {

    if (this.value !== document.getElementById("password").value) {

        alert("Passwords do not match.");

        this.value = "";

    }

});


/*=========================================
    REFRESH TABLE
=========================================*/

function refreshUsers() {

    users = JSON.parse(localStorage.getItem("users")) || [];

    renderUsers();

    updateSummary();

}


/*=========================================
    INITIAL REFRESH
=========================================*/

refreshUsers();


=======

/*====================================================
    USER MANAGEMENT
====================================================*/

let users = JSON.parse(localStorage.getItem("users")) || [];

const addUserModal = new bootstrap.Modal(document.getElementById("addUserModal"));

/*====================================================
    SAVE USERS
====================================================*/

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

/*====================================================
    LOAD PAGE
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    renderUsers();
    updateSummary();

});

/*====================================================
    SUMMARY CARDS
====================================================*/

function updateSummary() {

    document.getElementById("totalUsers").textContent = users.length;

    let employees = users.filter(user => user.role !== "Admin").length;

    document.getElementById("totalEmployees").textContent = employees;

}

/*====================================================
    DISPLAY USERS
====================================================*/

function renderUsers() {

    const tbody = document.getElementById("userTableBody");

    tbody.innerHTML = "";

    if (users.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    No users found.
                </td>
            </tr>
        `;

        return;
    }

    users.forEach((user, index) => {

        tbody.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${user.fullName}</td>

                <td>${user.username}</td>

                <td>${user.phone}</td>

                <td>

                    <span class="badge bg-primary">
                        ${user.role}
                    </span>

                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="openEditModal(${index})"
                        title="Edit">

                        <i class="bi bi-pencil"></i>

                    </button>

                    <button
                        class="action-btn reset-btn"
                        onclick="resetPassword(${index})"
                        title="Reset Password">

                        <i class="bi bi-key"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="openDeleteModal(${index})"
                        title="Delete">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

}

/*====================================================
    ADD USER
====================================================*/

document.getElementById("saveUserBtn").addEventListener("click", () => {

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    /* Validation */

    if (
        fullName === "" ||
        username === "" ||
        role === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }
    if(password.length <6){
        alert("Password should be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    /* Duplicate Username */

    let exists = users.some(user =>

        user.username.toLowerCase() === username.toLowerCase()

    );

    if (exists) {

        alert("Username already exists.");

        return;

    }

    /* Save */

    users.push({

        fullName,
        username,
        phone,
        role,
        password

    });

    saveUsers();

    renderUsers();

    updateSummary();

    document.getElementById("addUserForm").reset();

    addUserModal.hide();

});

/*====================================================
    SEARCH USER
====================================================*/

document.getElementById("searchUser").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#userTableBody tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)

            ? ""

            : "none";

    });

});

/*====================================================
    EDIT USER
====================================================*/

const editUserModal = new bootstrap.Modal(
    document.getElementById("editUserModal")
);

function openEditModal(index) {

    const user = users[index];

    document.getElementById("editIndex").value = index;
    document.getElementById("editFullName").value = user.fullName;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editPhone").value = user.phone;
    document.getElementById("editRole").value = user.role;

    editUserModal.show();

}

document.getElementById("updateUserBtn").addEventListener("click", () => {

    const index = document.getElementById("editIndex").value;

    const fullName = document.getElementById("editFullName").value.trim();
    const username = document.getElementById("editUsername").value.trim();
    const phone = document.getElementById("editPhone").value.trim();
    const role = document.getElementById("editRole").value;

    if (fullName === "" || username === "" || role === "") {

        alert("Please fill all required fields.");
        return;

    }

    // Check duplicate username
    const duplicate = users.some((user, i) => {

        return (
            i != index &&
            user.username.toLowerCase() === username.toLowerCase()
        );

    });

    if (duplicate) {

        alert("Username already exists.");
        return;

    }

    users[index].fullName = fullName;
    users[index].username = username;
    users[index].phone = phone;
    users[index].role = role;

    saveUsers();
    renderUsers();
    updateSummary();

    editUserModal.hide();

});


/*====================================================
    DELETE USER
====================================================*/

const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
);

function openDeleteModal(index) {

    document.getElementById("deleteIndex").value = index;

    deleteModal.show();

}

document.getElementById("confirmDelete").addEventListener("click", () => {

    const index = document.getElementById("deleteIndex").value;

    // Prevent deleting the only Admin
    if (
        users[index].role === "Admin" &&
        users.filter(user => user.role === "Admin").length === 1
    ) {

        alert("The only Admin account cannot be deleted.");
        return;

    }

    users.splice(index, 1);

    saveUsers();
    renderUsers();
    updateSummary();

    deleteModal.hide();

});


/*====================================================
    RESET PASSWORD
====================================================*/

function resetPassword(index) {

    const newPassword = prompt("Enter a new password:");

    if (newPassword === null) return;

    if (newPassword.trim().length < 4) {

        alert("Password must contain at least 4 characters.");
        return;

    }

    users[index].password = newPassword.trim();

    saveUsers();

    alert("Password has been reset successfully.");

}


/*====================================================
    OPTIONAL:
    CREATE DEFAULT ADMIN IF NONE EXISTS
====================================================*/

if (users.length === 0) {

    users.push({

        fullName: "System Administrator",
        username: "admin",
        phone: "",
        role: "Admin",
        password: "admin123"

    });

    saveUsers();

}
/*====================================================
    USERS.JS - PART 5
    Final Validation & Utility Functions
====================================================*/


/*=========================================
    ALLOW ONLY LETTERS IN NAME
=========================================*/

document.getElementById("fullName").addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

});

document.getElementById("editFullName").addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");

});


/*=========================================
    ALLOW ONLY NUMBERS IN PHONE
=========================================*/

document.getElementById("phone").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});

document.getElementById("editPhone").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});


/*=========================================
    USERNAME FORMAT
=========================================*/

document.getElementById("username").addEventListener("input", function () {

    this.value = this.value
        .toLowerCase()
        .replace(/\s/g, "");

});

document.getElementById("editUsername").addEventListener("input", function () {

    this.value = this.value
        .toLowerCase()
        .replace(/\s/g, "");

});


/*=========================================
    ENTER KEY SUPPORT
=========================================*/

document.getElementById("addUserForm")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("saveUserBtn").click();

    }

});


document.getElementById("editUserForm")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("updateUserBtn").click();

    }

});


/*=========================================
    CLEAR ADD FORM
=========================================*/

function clearAddForm() {

    document.getElementById("addUserForm").reset();

}


/*=========================================
    AUTO CLEAR WHEN MODAL CLOSES
=========================================*/

document.getElementById("addUserModal")
.addEventListener("hidden.bs.modal", clearAddForm);


/*=========================================
    PASSWORD LENGTH CHECK
=========================================*/

document.getElementById("password")
.addEventListener("blur", function () {

    if (this.value.length > 0 && this.value.length < 6) {

        alert("Password should be at least 6 characters.");

        this.value= "";

    }

});


/*=========================================
    PASSWORD MATCH CHECK
=========================================*/

document.getElementById("confirmPassword")
.addEventListener("blur", function () {

    if (this.value !== document.getElementById("password").value) {

        alert("Passwords do not match.");

        this.value = "";

    }

});


/*=========================================
    REFRESH TABLE
=========================================*/

function refreshUsers() {

    users = JSON.parse(localStorage.getItem("users")) || [];

    renderUsers();

    updateSummary();

}


/*=========================================
    INITIAL REFRESH
=========================================*/

refreshUsers();


>>>>>>> f3b2bc90ea3fb5a137f9296901058b59c4a16e73
