import { auth } from "../model/user.js";

const formLogin = document.getElementById("loginForm");
const errorLogin = document.getElementById("error");
const goRegister = document.getElementById("goRegister");

if (goRegister) {
  goRegister.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const result = await auth.login(email, password);
      if (result.success) {
        window.location.href = "profile.html";
      } else {
        errorLogin.textContent = result.message;
      }
    } catch (err) {
      errorLogin.textContent = "Erreur technique, réessayez plus tard.";
      console.error(err);
    }
  });
}
