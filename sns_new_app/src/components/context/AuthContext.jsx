import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    },
  ]);
  const [user, setUser] = useState(null);

  // Login functionality
  const login = ({ email, password }) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  // Signup functionality
  const signup = ({ email, password, name }) => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return { success: false, message: "Email already exists" };
    }

    // Add new user
    const newUser = {
      email,
      password,
      name,
      role: "user",
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    return { success: true, message: "Signup successful" };
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
