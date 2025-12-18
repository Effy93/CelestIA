// Récupère et valide le formulaire
// enregistre l’utilisateur via auth.register 
// gestion des erreurs ou redirection.

const formRegister = document.getElementById("registerForm");
const errorRegister = document.getElementById("error");

if (formRegister) {
  formRegister.addEventListener("submit", function(e) {
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

    const result = auth.register(name, email, password);

    if (!result.success) return showError(result.message);

    alert("Inscription réussie !");
    window.location.href = "login.html";
  });
}
