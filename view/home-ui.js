import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "./agent-renderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser() || { agents: [] };
  const buyBtn = document.getElementById("agent-link");
  const purchaseMessage = document.getElementById("purchase-message");
  const tabs = document.querySelectorAll(".agent-tab");

  // t = one tab (un onglet)
  function showAgent(index) {
    tabs.forEach(t => t.classList.remove("active"));
    tabs[index].classList.add("active");
    renderAgent(agents[index], user);
  }

  tabs.forEach((tab, i) => tab.addEventListener("click", () => showAgent(i)));

  if (buyBtn) {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const agentName = buyBtn.dataset.agent;
      if (!user.agents.includes(agentName)) {
        user.agents.push(agentName);
        auth.saveUser(user);  // sauvegarde définitive
        renderAgent(agents.find(a => a.name === agentName), user);

        // message UX friendly
        purchaseMessage.textContent = `Vous avez bien acheté l'agent ${agentName} !`;
        purchaseMessage.style.color = "#4fc3f7";
        purchaseMessage.style.fontWeight = "bold";
      }
    });
  }

  // Toujours afficher **Daïne par défaut**, peu importe ce qui est acheté
  showAgent(0);
});
