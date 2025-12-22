/* Objet littéral qui centralise l'authentification. */
export const auth = {

  /** Génère un salt aléatoire */
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(16))
      .reduce((s, b) => s + b.toString(16).padStart(2, "0"), "");
  },

  /** Hash un mot de passe avec SHA-256 + salt + itérations */
  async hashPassword(password, salt, iterations = 100_000) {
    let data = password.trim() + salt;
    const cryptoObj = window.crypto || window.msCrypto;

    if (!cryptoObj?.subtle) {
      throw new Error("crypto.subtle non disponible : utilisez localhost ou HTTPS");
    }

    for (let i = 0; i < iterations; i++) {
      const msgUint8 = new TextEncoder().encode(data);
      const hashBuffer = await cryptoObj.subtle.digest("SHA-256", msgUint8);
      data = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    }

    return data;
  },

  /** Inscription */
  async register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    name = name.trim();
    email = email.trim();

    if (users.find(u => u.email === email)) {
      return { success: false, message: "Utilisateur existe déjà" };
    }

    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);

    users.push({ name, email, passwordHash, salt, agents: [] });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  },

  /** Connexion */
  async login(email, password) {
    email = email.trim();
    password = password.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }

    const hashTest = await this.hashPassword(password, user.salt);
    if (hashTest !== user.passwordHash) {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }

    localStorage.setItem("loggedEmail", email);
    return { success: true };
  },

  logout() {
    localStorage.removeItem("loggedEmail");
  },

  getUser() {
    const email = localStorage.getItem("loggedEmail")?.trim();
    if (!email) return null;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.email === email);
  },

  isAuthenticated() {
    return !!localStorage.getItem("loggedEmail")?.trim();
  }
};
