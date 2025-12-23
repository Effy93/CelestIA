import { auth } from "../model/user.js";
import { showMessage} from "../view/show-message.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user) return;

  const editBtn = document.getElementById("editProfileBtn");
  const form = document.getElementById("editProfileForm");
  const nameInput = document.getElementById("editName");
  const msgEdit = document.getElementById("edit-message");

  if (!editBtn || !form || !nameInput || !msgEdit) return;

  // Pré-remplir le formulaire
  nameInput.value = user.name;

  // Afficher / cacher le formulaire
  editBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  // Soumission du formulaire
 form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = nameInput.value.trim();
  if (!newName) return showMessage(msgEdit, "Le nom ne peut pas être vide", "error");

  // Mettre à jour le nom
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.email === user.email);

  users[index].name = newName;
  user.name = newName;

  localStorage.setItem("users", JSON.stringify(users));
  showMessage(msgEdit, "Profil mis à jour ", "success");

  setTimeout(() => {
    window.location.reload();
  }, 1200);
});

});
