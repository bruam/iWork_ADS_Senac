import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AuthDataService from "../services/AuthService";

import { api } from "../http-common";

export const AuthContext = createContext();

// children traz o conteúdo "abraçado" pelo componente
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // state para controlar tempo de execução do useEffect, espera ele ser executado para carregar página
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // se usuário existe no localStorage armazena ele no state com json
    if (recoveredUser && token) {
      setUser(recoveredUser);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await AuthDataService.login({ email, password });

    console.log("login", response.data);

    const loggedUser = response.data.userId;
    const token = response.data.token;

    localStorage.setItem("user", loggedUser);
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser);
    navigate("/");
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
