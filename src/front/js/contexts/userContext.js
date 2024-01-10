import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchUser, getToken} from "../../client-API/backendAPI";

// Crear el contexto para el store
export const CharactersContext = createContext(null);

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
export function CharactersContextProvider({ children }) {
    // ================== STORE ================== //
    // Contiene los datos del Contexto.
    const [store, setStore] = useState(storeInitialState);
  
   
    // =============== ACTIONS ================= //
    // Contiene las funciones que modifican el store.
    const actions = {
        setToken: () => {
            getToken(email, password)
            .then(data => {
                setStore({...store, token: data})
            });
        },
        setUser: (token) => { // No requiere id porque se extrae del JWT token
            fetchUser(token)
            .then(data => {
                setStore({...store, user: data});
            });
        }
    }
  
  
     // Sincronizar el estado global con los contactos de la API al montar el contexto
     useEffect(() => {
      actions.syncCharacterstList();
  
    }, []); 
    
  
    return (
      <CharactersContext.Provider value={{ store, actions }}>
        {children}
      </CharactersContext.Provider>
    );
  };
  
  
  // Hook personalizado para acceder al contexto
  export function useCharactersContext() {
    const context = useContext(CharactersContext);
    if (!context) {
      throw new Error('useCharactersContext debe ser usado dentro de un CharactersContextProvider');
    }
    return context;
  };