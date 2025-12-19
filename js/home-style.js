const agents = [
  {name: "Daïne", desc: "IA spécialisée en analyse et optimisation des processus.", img: "assets/img/avatar/daine.svg", link: "#", color: "#d27dfb"},
  {name: "Kaï", desc: "IA créative pour la génération de contenu.", img: "assets/img/avatar/kai.svg", link: "#", color: "#4fc3f7"},
  {name: "Orion", desc: "IA marketing pour la publicité ciblée.", img: "assets/img/avatar/orion.svg", link: "#", color: "#4db6ac"},
  {name: "Aya", desc: "IA support client et gestion des tickets.", img: "assets/img/avatar/aya.svg", link: "#", color: "#ff8a65"}
];

const tabs = document.querySelectorAll(".agent-tab");

// Fonction pour afficher un agent
function showAgent(index) {
    tabs.forEach(t => t.classList.remove("active"));
    tabs[index].classList.add("active");

    const agent = agents[index];
    document.getElementById("agent-img").src = agent.img;
    document.getElementById("agent-name").textContent = agent.name;
    document.getElementById("agent-desc").textContent = agent.desc;
    document.getElementById("agent-link").href = agent.link;
    document.getElementById("agent-card").style.borderTop = `5px solid ${agent.color}`;
    document.getElementById("agent-link").style.backgroundColor = agent.color;
}

// Événement clic sur les tabs
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showAgent(index));
});

// ⚡ Appliquer le style du premier agent au chargement
showAgent(0);
