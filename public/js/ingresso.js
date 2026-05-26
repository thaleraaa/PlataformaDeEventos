const URL_API = 'http://localhost:3333/v1';
const eventos = document.querySelector('.ingressos');

let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    const token = localStorage.getItem('token');

    const response = await fetch(`${URL_API}/ingressos`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const dados = await response.json();
    console.log(dados);
    return dados;
}

async function exibir() {
    const meusEventos = dados;
    meusEventos.forEach(ingresso => {
        const imagemUrl = `${URL_API}/evento/imagem?filename=${ingresso.evento.imagem}`;
        eventos.innerHTML += `
            <div class="ingresso">
                <div class="ingresso-info">
                    <p>${ingresso.evento.nome}</p>
                    <p>${ingresso.evento.valor}</p>
                    <p>${ingresso.evento.data}</p>
                    <p>${ingresso.evento.horario}</p>
                </div>
                <img src="${imagemUrl}" alt="">
            </div>
        `;
    });
}

carregarDados();
