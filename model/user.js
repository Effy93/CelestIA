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

  /** Inscription // devrait être dans controller register */
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

  /** Fonction connexion  // devrait être dans controller login */
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
    //garde en mémoire l'utilisateur connecté
    localStorage.setItem("loggedEmail", email);
    return { success: true };
  },

  logout() {
    localStorage.removeItem("loggedEmail");
  },

  // getUser
  // Va chercher les données utilisateurs
  // ?. verifie si la valeur existe et n'est pas nulle = email stocké dans localSotrage, sinon renvoi undefined (mais pas d'erreur)
  // trim() en cas de caractère involontaire (espace) = sécurité est robustesse même si pas forcement nécessaire ici
  getUser() {
    const email = localStorage.getItem("loggedEmail")?.trim();
    if (!email) return null;

    // JSON.parse fait le travail inverse de stringify = il remet en tableau 
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // find cherche le premier utilisateur dont l’email correspond à l’email stocké
    return users.find(u => u.email === email);
  },

//  isAuthenticated 
// retourne true si loggedEmail n’est pas vide ou nul (grâce au ?.),
// enlève les espaces au début et à la fin grâce à .trim(),
// et retourne true ou false grâce au double !!, qui inverse deux fois les valeurs et permet de créer un vrai booléen, même avec une donnée sortie de localStorage (qui est donc une chaîne de caractères).
  // Verifie si l'utilisateur est connecté
  //   - Premier ! inverse la valeur
  //   - Deuxième ! inverse à nouveau pour obtenir true ou false
  // Résultat : true si un utilisateur est connecté, false sinon
  // transforme la chaine de caractère renvoyer par localStorage, en vrai booleen et non en undifined ou null
  isAuthenticated() {
    return !!localStorage.getItem("loggedEmail")?.trim();
  }
};

