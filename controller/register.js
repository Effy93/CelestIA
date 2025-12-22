import { auth } from "../model/user.js";

const formRegister = document.getElementById("registerForm");
const errorRegister = document.getElementById("error");

if (formRegister) {
  formRegister.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm_email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    function showError(msg) {
      errorRegister.textContent = msg;
    }

    if (email !== confirmEmail) return showError("Les adresses email ne correspondent pas !");
    if (password !== confirmPassword) return showError("Les mots de passe ne correspondent pas !");

    try {
      const result = await auth.register(name, email, password);
      if (!result.success) return showError(result.message);

      alert("Inscription réussie !");
      window.location.href = "login.html";
    } catch (err) {
      showError("Erreur technique, réessayez plus tard.");
      console.error(err);
    }
  });
}
