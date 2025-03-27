function fetchEmployees() {
    const jobTitles = ["Software Engineer", "Project Manager", "HR Specialist", "Data Analyst", "UX Designer"];
    
    fetch('https://randomuser.me/api/?results=5') 
        .then(response => response.json())
        .then(data => {
            const employees = data.results;
            const tableBody = document.getElementById('employeeTable');
            tableBody.innerHTML = ''; 

            employees.forEach(user => {
                const randomJob = jobTitles[Math.floor(Math.random() * jobTitles.length)];
                const employee = {
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    position: randomJob
                };

                
                const row = `
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.position}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;

                // Save employee to db.json
                saveEmployee(employee);
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
}

function saveEmployee(employee) {
    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(data => console.log('Saved to db.json:', data))
    .catch(error => console.error('Error saving employee:', error));
}
fetch('db.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
  function toggleLogin() {
    document.getElementById("login-container").classList.toggle("hidden");
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            const users = data.users || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                document.getElementById("login-container").classList.add("hidden");
                document.getElementById("dashboard").classList.remove("hidden");
                document.getElementById("user-name").innerText = user.username;
            } else {
                document.getElementById("error-msg").innerText = "Invalid username or password!";
            }
        })
        .catch(error => console.error("Error:", error));
}

function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-msg").innerText = "";
}