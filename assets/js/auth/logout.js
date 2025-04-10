document.getElementById('logout').addEventListener('click', logout);

function logout() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Aucun token trouvé');
        cleanAndRedirect();
        // window.location.reload();
        return;
    }

    const xhr = new XMLHttpRequest();
    const logoutUrl = 'http://127.0.0.1:8000/api/auth/logout';

    xhr.open('POST', logoutUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            cleanAndRedirect();

            if (xhr.status !== 200) {
                console.error('Erreur lors de la déconnexion côté serveur');
            }
        }
    };

    xhr.send();
}

function cleanAndRedirect() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    sessionStorage.clear();
    window.location.reload();
}
