import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.23.8/lib/index.mjs';

const form = document.querySelector('#form-cadastro');
const nomeINPUT = document.querySelector('#nome');
const emailINPUT = document.querySelector('#email');
const senhaINPUT = document.querySelector('#senha');
const tipoINPUT = document.querySelector('#tipo');
const senhaConfirmadaINPUT = document.querySelector('#senha-confirmada');

const URL_API = 'http://localhost:3333/v1/user';

const schemaCadastro = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    senhaConfirmada: z.string(),
    tipoADM: z.string()
}).refine((data) => data.senha === data.senhaConfirmada, {
    message: "As senhas digitadas não são iguais",
    path: ["senhaConfirmada"]
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: nomeINPUT.value,
        email: emailINPUT.value,
        senha: senhaINPUT.value,
        senhaConfirmada: senhaConfirmadaINPUT.value,
        tipoADM: tipoINPUT.value
    };

    const resultado = schemaCadastro.safeParse(dados);

    if(!resultado.success) {
        const primeiroErro = resultado.error.issues[0].message;
        alert(primeiroErro);
        return;
    }

    const response = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            role: dados.tipoADM
        })
    });

    if(!response.ok) {
        alert('Não foi possivel criar o usuario!');
        return;
    }

    window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
});