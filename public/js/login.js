const emailINPUT = document.querySelector('#email');
const senhaINPUT = document.querySelector('#senha');
const submit = document.querySelector('#form-login');
const botaoINPUT = document.querySelector('#cadastro');
import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.23.8/lib/index.mjs';
const URL_API = 'http://localhost:3333/v1/session';

const schemaLogin = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
});

submit.addEventListener('submit', async (e) => {

    e.preventDefault();

    const dados = {
        email: emailINPUT.value,
        senha: senhaINPUT.value
    };

    const resultado = schemaLogin.safeParse(dados);

    if(!resultado.success){
        const primeiroErro = resultado.error.issues[0].message;
        alert(primeiroErro);
        return;
    }

    const response = await fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    if(!response.ok) {
        alert('Email ou senha invalido');
        return;
    }

    const resposta = await response.json();

    localStorage.setItem('token', resposta.token);
    window.location.href = 'http://127.0.0.1:5500/public/index.html';
});

botaoINPUT.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5500/public/pages/cadastro.html'
})