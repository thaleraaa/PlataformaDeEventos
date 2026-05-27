const URL_API = 'http://localhost:3333/v1';
const eventos = document.querySelector('.ingressos');
const modalBTN = document.querySelector('#input-dados');
const addBTN = document.querySelector('#adicionar-evento');
const modal = document.querySelector('.modal');
const body = document.querySelector('#overlay');
const nomeINPUT = document.querySelector('#nome');
const dataINPUT = document.querySelector('#data');
const horarioINPUT = document.querySelector('#horario');
const valorINPUT = document.querySelector('#valor');
const imagemINPUT = document.querySelector('#imagem')
let modoEdicao = false;
let eventoEditandoId = null;
let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    const response = await fetch(`${URL_API}/eventos/me`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        alert('Token invalido!');
        window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
        return
    }

    const dados = await response.json();
    return dados
}

async function exibir() {
    dados.forEach(evento => {
        const imagemUrl = `${URL_API}/evento/imagem?filename=${evento.imagem}`;
        
        const div = document.createElement('div');
        div.classList.add('ingresso');
        div.innerHTML = `
            <div class="ingresso-info">
                <p>${evento.nome}</p>
                <p>${evento.valor}</p>
                <p>${evento.data}</p>
                <p>${evento.horario}</p>
            </div>
            <img class="btn-remover" src="../assets/imgs/lixeira.png" alt="">
            <img class="btn-editar" src="../assets/imgs/editar.png" alt="">
            <img src="${imagemUrl}" alt="">
        `;

        div.querySelector('.btn-remover').addEventListener('click', () => {
            deletarEvento(evento.id);
        });

        div.querySelector('.btn-editar').addEventListener('click', () => {
            editarEvento(evento);
        });

        eventos.appendChild(div);
    });
}

async function deletarEvento(id) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${URL_API}/evento/remove?id=${id}`, {
        method: 'DELETE',

        headers: {
            'Authorization': `Bearer ${token}`
        }
    }); 

    if(!response.ok) {
        alert("Não foi possivel remover!");
        return;
    }
    alert("Remoção feita com sucesso!");
    window.location.reload();
}

async function editarEvento(evento) {
    nomeINPUT.value = evento.nome;
    dataINPUT.value = evento.data;
    horarioINPUT.value = evento.horario;
    valorINPUT.value = evento.valor;

    modoEdicao = true;
    eventoEditandoId = evento.id;
    modalBTN.innerText = 'EDITAR'
    modal.style.display = 'block';
    body.style.opacity = 0.5;
}

addBTN.addEventListener('click', () => {
    modoEdicao = false;
    eventoEditandoId = null;
    nomeINPUT.value = '';
    dataINPUT.value = '';
    horarioINPUT.value = '';
    valorINPUT.value = '';
    modalBTN.innerText = 'ADICIONAR'
    modal.style.display = 'block';
    body.style.opacity = 0.5;
});

modalBTN.addEventListener('click', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nome', nomeINPUT.value);
    formData.append('data', dataINPUT.value);
    formData.append('horario', horarioINPUT.value);
    formData.append('valor', valorINPUT.value);
    formData.append('file', imagemINPUT.files[0]);

    let url;
    let method;

    if (modoEdicao) {
        url = `${URL_API}/evento/edit?id=${eventoEditandoId}`;
        method = 'PUT';
    } else {
        url = `${URL_API}/evento`;
        method = 'POST';
    }

    const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    });

    if (!response.ok) {
        if (modoEdicao) {
            alert("Não foi possivel editar!");
        } else {
            alert("Não foi possivel cadastrar!");
        }
        return;
    }

    if (modoEdicao) {
        alert('Edição feita com sucesso!');
    } else {
        alert('Evento cadastrado com sucesso!');
    }

    modal.style.display = 'none';
    window.location.reload();
});

carregarDados();
