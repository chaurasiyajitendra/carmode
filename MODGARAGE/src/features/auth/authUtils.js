// Database mock helper for simulated accounts registry
const USERS_DB_KEY = "modgarage_registered_users";

export const getRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : [
      // Pre-seed a default developer account for quick demo logins
      {
        fullName: "Ashutosh Master Tuner",
        username: "ashutosh",
        email: "demo@modgarage.com",
        password: "Password123"
      }
    ];
  } catch {
    return [];
  }
};

export const registerUserMock = (fullName, username, email, password) => {
  const users = getRegisteredUsers();
  
  // Validation check
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    throw new Error("Email or Username is already registered on our Master Deck.");
  }

  const newUser = { fullName, username, email, password };
  users.push(newUser);
  
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to sync client-side users database:", err);
  }

  return {
    user: { fullName, username, email },
    token: `mock_jwt_token_${Date.now()}`
  };
};

export const loginUserMock = (emailOrUsername, password) => {
  const users = getRegisteredUsers();
  const lowerInput = emailOrUsername.toLowerCase();
  
  const user = users.find(u => 
    u.email.toLowerCase() === lowerInput || 
    u.username.toLowerCase() === lowerInput
  );

  if (!user || user.password !== password) {
    throw new Error("Invalid master credentials. Access denied.");
  }

  return {
    user: {
      fullName: user.fullName,
      username: user.username,
      email: user.email
    },
    token: `mock_jwt_token_${Date.now()}`
  };
};

export const checkPasswordStrength = (pwd) => {
  if (pwd.length < 6) return "weak";
  
  const hasLetters = /[a-zA-Z]/.test(pwd);
  const hasNumbers = /[0-9]/.test(pwd);
  const hasSpecials = /[^a-zA-Z0-9]/.test(pwd);
  
  if (hasLetters && hasNumbers && hasSpecials && pwd.length >= 8) {
    return "strong";
  }
  if (hasLetters && hasNumbers) {
    return "medium";
  }
  return "weak";
};
