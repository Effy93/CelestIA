const userNameElement = document.getElementById("userName");
const logoutBtn = document.getElementById("nav-btn-logout");

if (auth.isAuthenticated()) {
  const user = auth.getUser();
  if (user && user.name) {
    userNameElement.textContent = `Bienvenue, ${user.name}!`;
  }
} else {
  window.location.href = "login.html";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.logout();
    window.location.href = "index.html";
  });
}
