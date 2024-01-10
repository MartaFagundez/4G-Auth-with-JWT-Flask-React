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
            throw new Error('Error al intentar registrar el usuario');
        }

        return 1;

    } catch (error) {
        console.error('Error on signup:', error);
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
            throw new Error('Error al intentar logearse');
        }

        const data = await response.json();
        return data.token;

    } catch (error) {
        console.error('Error on login:', error);
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
        throw new Error('Error al obtener los datos del usuario');
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };