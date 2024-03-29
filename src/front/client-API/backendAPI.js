const apiUrlBase = "https://fictional-spork-pwg67w97jg9f6wxv-3001.app.github.dev"

// Registrar usuario
export const signup = async (newUser) => {
    try {
        const response = await fetch(`${apiUrlBase}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        return true;

    } catch (error) {
        console.error('Error trying to register user', error);
        throw error; // Lanzar la excepción para que se propague hacia arriba
    }
}

// Obtener el token de autenticación
export const login = async (email, password) => {
    try {
        const response = await fetch(`${apiUrlBase}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        const data = await response.json();
        return data.token;

    } catch (error) {
        console.error('Error fetching token:', error);
        throw error; // Lanzar la excepción para que se propague hacia arriba
    }
}

// Obtener los datos del usuario
export const fetchUser = async token => {
    try {
      const response = await fetch(`${apiUrlBase}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Lanzar la excepción para que se propague hacia arriba
    }
  };