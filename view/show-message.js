
export function showMessage(element, msg, type = "error") {
  element.textContent = msg;
  element.style.display = "block";
  element.style.padding = "12px 18px";
  element.style.borderRadius = "8px";
  element.style.marginBottom = "15px";
  element.style.fontWeight = "500";
  element.style.textAlign = "center";
  element.style.transition = "all 0.3s ease";

  switch(type) {
    case "error":
      element.style.backgroundColor = "#e74c3c";
      element.style.color = "#fff";
      element.style.border = "1px solid #c0392b";
      break;
    case "success":
      element.style.backgroundColor = "#67cd5aff";
      element.style.color = "#fff";
      element.style.border = "1px solid #267050ff";
      break;
  }
}

export function confirmLogout() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    const modal = document.createElement("div");

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

    modal.style.cssText = `
      background: #fff;
      padding: 1.5rem;
      border-radius: 14px;
      width: 90%;
      max-width: 320px;
      text-align: center;
      box-shadow: 0 12px 30px rgba(0,0,0,0.2);
    `;

    modal.innerHTML = `
      <p style="margin-bottom:1.2rem; font-weight:500;">
        Êtes-vous sûr de vouloir vous déconnecter ?
      </p>
      <div style="display:flex; justify-content:center; gap:0.6rem;">
        <button id="logout-confirm" style="
          background:#e74c3c;
          color:#fff;
          border:none;
          padding:0.45rem 1rem;
          border-radius:6px;
          cursor:pointer;
        ">
          Se déconnecter
        </button>

        <button id="logout-cancel" style="
          background:#f0f0f0;
          border:1px solid #ccc;
          padding:0.45rem 1rem;
          border-radius:6px;
          cursor:pointer;
        ">
          Annuler
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#logout-confirm").onclick = () => {
      overlay.remove();
      resolve(true);
    };

    modal.querySelector("#logout-cancel").onclick = () => {
      overlay.remove();
      resolve(false);
    };
  });
}
