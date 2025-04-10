const url = "http://127.0.0.1:8000/api/auth/register";
document.getElementById('register').addEventListener('click', register);
function register(event) {
    event.preventDefault(); 
    console.log("onclick   pour ce  button");
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photoProfile').value;

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password, 
            phone,
            role,
            photo,
        })
    })
    .then(response => response.json())
    .then(data => {
        // const messageElement = document.getElementById('message');
        // messageElement.innerText = data.message || "Inscription réussie !";
        console.log('oui');
    })
    .catch(error => {
        console.error("Erreur lors de l'inscription :", error);
        // document.getElementById('message').innerText = "Erreur lors de l'inscription.";
        console.log("uoi");
    });
}

console.log("page register");
