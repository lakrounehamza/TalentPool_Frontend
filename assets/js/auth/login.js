
document.getElementById('login').addEventListener('click', login);

function login(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  fetch("http://127.0.0.1:8000/api/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(response => response.json()
    )
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        // switch (date.user.role) {
        //   case 'candidat': window.location.href = "../candidat/home.html"; break;
        //   case 'admin': window.location.href = '../admin/dashbord.html'; break;
        //   default: window.location.href = "../candidat/home.html"; break;
        // }
        let role = data.user.role;
        if (role === 'candidat'){
          window.location.href = "../candidat/home.html";
          exit;
        }
        if(role === 'admin'){
          
          window.location.href = "../admin/dashbord.html";
          exit ;
        }


      }
      document.getElementById('message').textContent = data.token;
      document.getElementById('password').value = '';
      document.getElementById('email').value = '';
      console.log(data);
    })
    .catch(error => console.error(error));
}
