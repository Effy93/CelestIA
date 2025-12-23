import { auth } from "../model/user.js";
import { showMessage } from "../view/show-message.js";

const formRegister = document.getElementById("registerForm");
const msgRegister = document.getElementById("register-message");

if (formRegister) {
  formRegister.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm_email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (email !== confirmEmail) return showMessage(msgRegister, "Les adresses email ne correspondent pas !", "error");
    if (password !== confirmPassword) return showMessage(msgRegister, "Les mots de passe ne correspondent pas !", "error");

    try {
      const result = await auth.register(name, email, password);
      if (!result.success) return showMessage(msgRegister, result.message, "error");

      showMessage(msgRegister, "Inscription réussie ! Redirection...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch (err) {
      showMessage(msgRegister, "Erreur technique, réessayez plus tard.", "error");
      console.error(err);
    }
  });
}
