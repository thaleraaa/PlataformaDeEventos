async function checarAutenticacao() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'pages/login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:3333/v1/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
    }
  } catch (err) {
    localStorage.removeItem('token');
    window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
  }
}

checarAutenticacao();