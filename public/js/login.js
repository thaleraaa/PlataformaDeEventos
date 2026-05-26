const emailINPUT = document.querySelector('#email');
const senhaINPUT = document.querySelector('#senha');
const submit = document.querySelector('#form-login');

const URL_API = 'http://localhost:3333/v1/session';


submit.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = emailINPUT.value;
    const senha = senhaINPUT.value;

    const response = await fetch(URL_API, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email,
            senha
        })
    });

    if(!response.ok) {
        alert('Email ou senha invalido');
        return;
    }

    const dados = await response.json();

    localStorage.setItem('token', dados.token);
    window.location.href = 'http://127.0.0.1:5500/public/index.html'
    alert('Login feito com sucesso!');
});