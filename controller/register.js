import { auth } from "../model/user.js";

const formRegister = document.getElementById("registerForm");
const errorRegister = document.getElementById("error");
const msgRegister = document.getElementById("register-message");

if (formRegister) {
  formRegister.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm_email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    function showMessage(msg, type = "error") {
      msgRegister.textContent = msg;
      msgRegister.style.display = "block";
      msgRegister.style.padding = "12px 18px";
      msgRegister.style.borderRadius = "8px";
      msgRegister.style.marginBottom = "15px";
      msgRegister.style.fontWeight = "500";
      msgRegister.style.textAlign = "center";
      msgRegister.style.transition = "all 0.3s ease";

      switch(type) {
        case "error":
          msgRegister.style.backgroundColor = "#e74c3c";
          msgRegister.style.color = "#fff";
          msgRegister.style.border = "1px solid #c0392b";
          break;
        case "success":
          msgRegister.style.backgroundColor = "#67cd5aff";
          msgRegister.style.color = "#fff";
          msgRegister.style.border = "1px solid #267050ff";
          break;
      }
    }

    // validations
    if (email !== confirmEmail) return showMessage("Les adresses email ne correspondent pas !");
    if (password !== confirmPassword) return showMessage("Les mots de passe ne correspondent pas !");

    try {
      const result = await auth.register(name, email, password);
      if (!result.success) return showMessage(result.message);

      showMessage("Inscription réussie ! Redirection...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (err) {
      showMessage("Erreur technique, réessayez plus tard.");
      console.error(err);
    }
  });
}
