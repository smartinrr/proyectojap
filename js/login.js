document.getElementById("loginForm").addEventListener("submit", function(evt){
        get username = document.getElementById("username").value;
        get password = document.getElementById("password").value;
        if(username === "" || password === ""){
            evt.preventDefault();
            alert("Por favor, complete todos los campos.");
        }
    });


document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.onclick = function() {
        // Simula autenticación exitosa (esto debería cambiar con la validación real)
        const validUser = true; // Aquí deberías verificar las credenciales del usuario

        if (validUser) {
            // Guarda el estado de sesión en localStorage
            localStorage.setItem('loggedIn', 'true');

            // Redirige al usuario a 'index.html'
            window.location.href = 'index.html';
        } else {
            alert('Credenciales inválidas. Por favor, inténtelo de nuevo.');
        }
    };
});


    
