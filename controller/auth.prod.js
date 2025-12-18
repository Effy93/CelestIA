const auth = {
  // Regex pour valider email et mot de passe
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

  // Fonction pour hash le mot de passe
  hashPassword: async function(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  register: async function(name, email, password) {
    if (!this.emailRegex.test(email)) {
      return { success: false, message: "Email invalide !" };
    }
    if (!this.passwordRegex.test(password)) {
      return { success: false, message: "Mot de passe invalide !" };
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      return { success: false, message: "Cet utilisateur existe déjà !" };
    }

    const hashedPassword = await this.hashPassword(password);
    const user = { name, email, password: hashedPassword };
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true };
  },

  login: async function(email, password) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return { success: false, message: "Aucun utilisateur inscrit !" };

    const hashedPassword = await this.hashPassword(password);
    if (user.email === email && user.password === hashedPassword) {
      sessionStorage.setItem("isLogged", "true"); // session temporaire
      return { success: true };
    } else {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }
  },

  isAuthenticated: function() {
    return sessionStorage.getItem("isLogged") === "true";
  },

  logout: function() {
    sessionStorage.removeItem("isLogged");
  },

  getUser: function() {
    return JSON.parse(localStorage.getItem("user"));
  }
};
