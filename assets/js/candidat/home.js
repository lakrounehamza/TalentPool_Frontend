if(!localStorage.getItem('token'))
    window.location.href = "../auth/login.html";
    
const token = localStorage.getItem('token');

window.onload = function () {
    const url_data = "http://127.0.0.1:8000/api/annonces";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url_data, true);    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const announcements = Array.isArray(response) ? response : [response];
                    
                    document.getElementById("annonces").innerHTML = "";
                    
                    for (const item of announcements) {
                        console.log(item);
                        getAllAnnonces(item);
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            } else {
                console.error("Request failed with status:", xhr.status);
            }
        }
    };
    
    xhr.onerror = function () {
        console.error("Request failed");
    };
    
    xhr.send();
};

function getAllAnnonces(cardData) {
    const lesAnnonces = document.getElementById("annonces");
    const container = document.createElement("div");
    
    const header = document.createElement("div");
    header.className = "flex justify-between p-4 bg-gray-100";
    
    const idBadge = document.createElement("span");
    idBadge.className = "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full";
    idBadge.textContent = `ID: ${cardData.id}`;
    
    const statusBadge = document.createElement("span");
    statusBadge.className = "bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full";
    statusBadge.textContent = cardData.status;
    
    header.appendChild(idBadge);
    header.appendChild(statusBadge);
   
    const title = document.createElement("h3");
    title.className = "text-xl font-medium text-gray-800 mb-2 px-4 pt-2";
    title.textContent = cardData.title;
    
    const description = document.createElement("p");
    description.className = "text-gray-700 text-base px-4 pb-4";
    description.textContent = cardData.description;
    
    const footer = document.createElement("div");
    footer.className = "flex justify-between text-sm text-gray-600 p-4 bg-gray-50";
    
    const recruiter = document.createElement("span");
    recruiter.textContent = `Recruteur: ${cardData.recruteur_id}`;
    
    const date = document.createElement("span");
    date.textContent = new Date(cardData.created_at).toLocaleDateString();
    
    footer.appendChild(recruiter);
    footer.appendChild(date);
    
    container.appendChild(header);
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(footer);
    
    container.className = "bg-white rounded-lg shadow-md overflow-hidden mb-6";
    lesAnnonces.appendChild(container);
}