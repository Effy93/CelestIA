// Logique métier : objet littéral gérant l'inscription, le login, le logout,
// l'état d'authentification et la récupération de l'utilisateur.

const auth = {

  register: function(name, email, password) {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      return { success: false, message: "Cet utilisateur existe déjà !" };
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true };
  },

  login: function(email, password) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return { success: false, message: "Aucun utilisateur inscrit !" };

    if (user.email === email && user.password === password) {
      localStorage.setItem("isLogged", "true");
      return { success: true };
    } else {
      return { success: false, message: "Email ou mot de passe incorrect" };
    }
  },

  isAuthenticated: function() {
    return localStorage.getItem("isLogged") === "true";
  },

  logout: function() {
    localStorage.removeItem("isLogged");
  },

  getUser: function() {
    return JSON.parse(localStorage.getItem("user"));
  }
};
