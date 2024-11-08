// URL de la API
const API_URL = 'TU_API_GENERADA';

// Función para registrar al usuario
async function registerUser(nick, password) {
    const userData = {
        name: nick,
        password: password
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('response').innerHTML = `<p>Registro exitoso: ${data.name}</p>`;
            // Redirigir a otra página web después de un registro exitoso (opcional)
            window.location.href = 'TU_PAGINA_WEB'; // Cambia esta URL a la página que desees
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Función para verificar si el nombre de usuario ya existe
async function checkUsernameExistence(nick) {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        
        // Comprobamos si el nombre de usuario ya existe, ignorando mayúsculas y minúsculas
        const userExists = users.some(user => user.name.toLowerCase() === nick.toLowerCase());

        return userExists;
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error al comprobar el nombre de usuario: ${error.message}</p>`;
        return false; // En caso de error, asumimos que no existe
    }
} 

// Capturar el evento de envío del formulario
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nick = document.getElementById('nick').value;
    const password = document.getElementById('password').value;

    // Validación de longitud mínima
    if (nick.length < 5) {
        document.getElementById('response').innerHTML = "<p>El nombre de usuario debe tener al menos 5 caracteres.</p>";
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('response').innerHTML = "<p>La contraseña debe tener al menos 6 caracteres.</p>";
        return;
    }

    // Verificamos si el nombre de usuario ya está registrado
    const userExists = await checkUsernameExistence(nick);
    
    if (userExists) {
        document.getElementById('response').innerHTML = `<p>El nombre de usuario ya está en uso. Por favor, elige otro.</p>`;
    } else {
        // Si el nombre de usuario no existe, procedemos con el registro
        registerUser(nick, password);
    }
});
