function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function showLoginForm() {
  hideAll();
  document.getElementById('loginForm').classList.remove('hidden');
}
function showRegisterForm() {
  hideAll();
  document.getElementById('registerForm').classList.remove('hidden');
}
function showForgotForm() {
  hideAll();
  document.getElementById('forgotForm').classList.remove('hidden');
}
function showAdminLogin() {
  hideAll();
  document.getElementById('adminLoginForm').classList.remove('hidden');
}
function hideAll() {
  document.querySelectorAll(".login-box").forEach(el => el.classList.add("hidden"));
}
function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  if (!email || !password) return alert("All fields are required");
  let users = getUsers();
  if (users.find(u => u.email === email)) {
    return alert("User already exists");
  }
  users.push({ email, password });
  saveUsers(users);
  alert("Account created! Please log in.");
  showLoginForm();
}
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  let users = getUsers();
  let user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert("Login successful!");
  } else {
    alert("Invalid email or password");
  }
}
function recoverPassword() {
  const email = document.getElementById("forgotEmail").value;
  let users = getUsers();
  let user = users.find(u => u.email === email);
  if (user) {
    alert("Your password is: " + user.password);
  } else {
    alert("Email not found");
  }
}
const adminEmail = "admin@example.com";
const adminPassword = "admin123";
function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  if (email === adminEmail && password === adminPassword) {
    showAdminPanel();
  } else {
    alert("Unauthorized access");
  }
}
function showAdminPanel() {
  hideAll();
  document.getElementById("adminPanel").classList.remove("hidden");
  let users = getUsers();
  let table = document.getElementById("userTable");
  table.innerHTML = "";
  users.forEach(user => {
    table.innerHTML += `<tr><td>${user.email}</td><td>${user.password}</td></tr>`;
  });
}
function logoutAdmin() {
  showLoginForm();
}
