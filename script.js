

// Función para registrar al usuario
async function registerUser(nick, password) {
    const userData = {
        name: nick,
        password: password
    };

    try {
        const response = await fetch('TU_API_GENERADA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('response').innerHTML = `<p>Registro exitoso: ${data.name}</p>`;
            // Redirigir a otra página web después de un registro exitoso
            window.location.href = 'TU_PAGINA_WEB'; // Cambia esta URL a la página que desees
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
