import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "../view/agent-renderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser() || { agents: [] };
  const buyBtn = document.getElementById("agent-link");
  const purchaseMessage = document.getElementById("purchase-message");
  const tabs = document.querySelectorAll(".agent-tab");

  // Affiche un agent selon l'index
  function showAgent(index) {
    if (!tabs[index]) return;
    tabs.forEach(t => t.classList.remove("active"));
    tabs[index].classList.add("active");

    const agent = agents[index];
    if (!agent) return;

    renderAgent(agent, user);
  }

  // Gestion des onglets
  tabs.forEach((tab, i) => tab.addEventListener("click", () => showAgent(i)));

  // Logique d'achat (devrait etre dans un autre controller - purchase)
  if (buyBtn) {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // PAS CONNECTÉ
      if (!user || !auth.isAuthenticated()) {
        window.location.href = "login.html";
        return;
      }

      const agentName = (buyBtn.dataset.agent || "").trim();
      if (!agentName) return;

      if (!user.agents.includes(agentName)) {
        user.agents.push(agentName);

        // --- Mise à jour dans localStorage ---
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
          users[index] = user;
          localStorage.setItem("users", JSON.stringify(users));
        }

        // Affichage de l’agent acheté
        const agent = agents.find(a => a.name === agentName);
        renderAgent(agent, user);

        // Message UX friendly
        if (purchaseMessage) {
          purchaseMessage.textContent = `Vous avez bien acheté l'agent ${agentName} !`;
          purchaseMessage.style.color = agent.color;
          purchaseMessage.style.fontWeight = "bold";
        }
      }
    });
  }

  // Toujours afficher **Daïne par défaut**
  showAgent(0);
});
