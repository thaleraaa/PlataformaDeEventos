const form = document.querySelector('#form-cadastro');
const nomeINPUT = document.querySelector('#nome');
const emailINPUT = document.querySelector('#email');
const senhaINPUT = document.querySelector('#senha');
const senhaConfirmadaINPUT = document.querySelector('#senha-confirmada');

const URL_API = 'http://localhost:3333/v1/user';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = nomeINPUT.value;
    const email = emailINPUT.value;
    const senha = senhaINPUT.value;
    const senhaConfirmada = senhaConfirmadaINPUT.value;

    if(senha !== senhaConfirmada) {
        alert("As senhas digitadas não são iguais");
        return;
    }

    const response = await fetch(URL_API, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    });

    if(!response.ok) {
        alert('Não foi possivel criar o usuario!');
        return;
    }

    window.location.href = 'http://127.0.0.1:5500/public/pages/login.html'
    alert('Cadastro feito com sucesso!');
});
