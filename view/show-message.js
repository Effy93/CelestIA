
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
      max-width: 340px;
      text-align: center;
      box-shadow: 0 12px 30px rgba(0,0,0,0.2);
      animation: modalPop 0.3s ease-out;
      position: relative;
    `;

    modal.innerHTML = `
      <div style="position: relative; margin-bottom: 0.8rem;">
        <img src="assets/img/avatar/daine.svg" alt="Logo Daïne" class="daine-logo" style="width:60px; height:60px;">
        <div class="daine-bubble">À bientôt !</div>
      </div>
      <p style="margin-bottom:1.2rem; font-weight:500;">
        L’agent <strong>Daïne</strong> vous dit au revoir !<br>
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
          background: #3fa765ff;
          border:1px solid #ccc;
          padding:0.45rem 1rem;
          color:white;
          border-radius:6px;
          cursor:pointer;
        ">
          Rester connecté
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Logo wave */
      @keyframes wave {
        0% { transform: rotate(0deg); }
        20% { transform: rotate(15deg); }
        40% { transform: rotate(-10deg); }
        60% { transform: rotate(10deg); }
        80% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
      }
      .daine-logo {
        display: inline-block;
        animation: wave 1s ease-in-out;
      }

      /* Modal pop */
      @keyframes modalPop {
        0% { transform: scale(0.7); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }

      /* Bubble de dialogue */
      .daine-bubble {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%) scale(0);
        background: #00aaff;
        color: #fff;
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: bold;
        animation: bubblePop 0.5s ease-out 0.5s forwards;
        pointer-events: none;
      }
      @keyframes bubblePop {
        0% { transform: translateX(-50%) scale(0); opacity: 0; }
        80% { transform: translateX(-50%) scale(1.2); opacity: 1; }
        100% { transform: translateX(-50%) scale(1); opacity: 1; }
      }

      /* Clignement simple pour les yeux du SVG si tu as des classes dedans */
      /* Exemple si tu as <circle class="eye"> dans ton SVG */
      .eye { 
        animation: blink 3s infinite;
      }
      @keyframes blink {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.1); }
      }
    `;
    document.head.appendChild(style);

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


