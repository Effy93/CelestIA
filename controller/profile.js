import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "../view/agent-renderer.js";
import { setupLogout } from "./logout.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user || !auth.isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const sidebar = document.querySelector(".ia-container .sidebar");
  const agentCardContainer = document.querySelector(".agent-info");
  const logoutBtn = document.getElementById("nav-btn-logout");

  // Affichage user
  if (userNameEl) userNameEl.textContent = `Bienvenue ${user.name}`;
  if (userEmailEl) userEmailEl.textContent = ` ${user.email}`;

  // Affichage logout
  if (logoutBtn) {
    if (auth.isAuthenticated()) {
      logoutBtn.style.display = "inline";
      setupLogout(logoutBtn);
    } else {
      logoutBtn.style.display = "none";
    }
  }

  if (!user.agents || user.agents.length === 0) {
    agentCardContainer.innerHTML = "<p>Vous n'avez aucune IA pour le moment </p>";
    return;
  }

  // Création des onglets dynamiques
  user.agents.forEach((agentName, index) => {
    const agentObj = agents.find(a => a.name === agentName);
    if (!agentObj) return;

    const btn = document.createElement("button");
    btn.className = "agent-tab";
    btn.dataset.agent = index;
    btn.textContent = agentObj.name;
    sidebar.appendChild(btn);

    if (index === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      sidebar.querySelectorAll(".agent-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderAgent(agentObj, user);
    });
  });

  // Affiche la première IA
  renderAgent(agents.find(a => a.name === user.agents[0]), user);
});
