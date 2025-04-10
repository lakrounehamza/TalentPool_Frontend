const token = localStorage.getItem('token');

if (!token) {
    window.location.href = "../auth/login.html";
}

const xhr = new XMLHttpRequest();
const url = "http://127.0.0.1:8000/api/stats/globales";

xhr.open("GET", url, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', `Bearer ${token}`);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                dashboard(response);
            } catch (error) {
                console.error("Erreur lors de l'analyse du JSON :", error);
            }
        } else {
            console.error("Échec de la requête, statut :", xhr.status);
        }
    }
};

xhr.onerror = function () {
    console.error("Erreur réseau lors de la requête.");
};

xhr.send();

function dashboard(dashboardData) {
    document.getElementById("nombreCandidates").innerHTML = dashboardData.candidates;
    document.getElementById("nombreRecruteurs").innerHTML = dashboardData.recruteurs;
    document.getElementById("nombreAnnonces").innerHTML = dashboardData.annonces;
    document.getElementById("nombreCandidatures").innerHTML = dashboardData.candidatures;
}
