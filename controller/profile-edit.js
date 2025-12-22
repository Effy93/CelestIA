import { auth } from "../model/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user) return;

  const editBtn = document.getElementById("editProfileBtn");
  const form = document.getElementById("editProfileForm");
  const nameInput = document.getElementById("editName");

  if (!editBtn || !form || !nameInput) return;

  // Pré-remplir le formulaire
  nameInput.value = user.name;

  // Afficher / cacher le formulaire
  editBtn.addEventListener("click", () => {
    form.style.display =
      form.style.display === "none" ? "block" : "none";
  });

  // Soumission du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newName = nameInput.value.trim();
    if (!newName) return;

    // Récupérer tous les utilisateurs
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Mettre à jour l’utilisateur (identifié par email)
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1) return;

    users[index].name = newName;
    user.name = newName;

    // Sauvegarde
    localStorage.setItem("users", JSON.stringify(users));

    alert("Profil mis à jour ✅");
    window.location.reload();
  });
});
