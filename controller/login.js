const formLogin = document.getElementById("loginForm");
const errorLogin = document.getElementById("error");
const goRegister = document.getElementById("goRegister");

if (goRegister) {
  goRegister.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = auth.login(email, password);

    if (!result.success) {
      errorLogin.textContent = result.message;
      return;
    }

    alert("Connexion réussie !");
    window.location.href = "profile.html";
  });
}
