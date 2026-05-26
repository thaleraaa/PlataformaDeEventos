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
      // Token inválido ou expirado
      localStorage.removeItem('token');
      window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
    }
  } catch (err) {
    // Erro de rede ou servidor
    localStorage.removeItem('token');
    window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
  }
}

// Chame isso no início da página
checarAutenticacao();