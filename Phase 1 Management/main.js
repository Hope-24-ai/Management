document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");

    // Admins from JSON
    fetch("employees.json")
        .then(response => response.json())
        .then(data => {
            const admins = data.admins;
            const foundAdmin = admins.find(admin => admin.email === username && admin.password === password);

            if (foundAdmin) {
                successMsg.textContent = "Login Successful! Welcome, " + foundAdmin.name;
                errorMsg.textContent = "";
                
                // Employee Data Section
                document.getElementById("employee-section").style.display = "block";

                // Load Employees
                loadEmployees(data.employees);
            } else {
                errorMsg.textContent = "Invalid username or password.";
                successMsg.textContent = "";
            }
        })
        .catch(error => console.error("Error fetching admin data:", error));
});

function loadEmployees(employees) {
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";
    employees.forEach(user => {
        const row = `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.position}</td></tr>`;
        table.innerHTML += row;
    });
}
