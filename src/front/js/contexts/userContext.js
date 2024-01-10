import React, { createContext, useContext, useEffect, useState } from 'react';

import { login, fetchUser} from "../../client-API/backendAPI";

// Crear el contexto para el store
export const UserContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  user: {},
  token: "",
  loading: {
      isLoadingUser: false
  },
  error: {
      errorMessage: ""
  }
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function UserContextProvider({ children }) {
    // ================== STORE ================== //
    // Contiene los datos del Contexto.
    const [store, setStore] = useState(storeInitialState);
  
   
    // =============== ACTIONS ================= //
    // Contiene las funciones que modifican el store.
    const actions = {
        setToken: () => {
            login(email, password)
            .then(data => {
                setStore({...store, token: data})
            });
        },
        setUser: (token) => { // No requiere id porque se extrae del JWT token
            fetchUser(token)
            .then(data => {
                setStore({...store, user: data});
            });
        },
        synkWithLocalStorage: () => {
          setStore({...store, user: localStorage.getItem("user")});
          setStore({...store, token: localStorage.getItem("token")})
        }
    }
  
  
    // Sincronizar el estado global con los datos del localstorage si este tiene datos
    useEffect(() => {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        actions.synkWithLocalStorage();
      }
    }, []); 
    
  
    return (
      <UserContext.Provider value={{ store, actions }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  
  // Hook personalizado para acceder al contexto
  export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext debe ser usado dentro de un UserContextProvider');
    }
    return context;
  };