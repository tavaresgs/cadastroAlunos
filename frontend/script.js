const tabela = document.querySelector('table');
var cadastro = document.querySelector('#cadastro');
const escondido = document.querySelector('#null');


cadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const body = {
        "ra": cadastro.ra.value,
        "nome": cadastro.nome.value,
        "nasc": cadastro.nasc.value,
        "uf": cadastro.uf.value,
        "cep": cadastro.cep.value,
        "escola": cadastro.escola.value
        }

    const options = {
        'method': "POST",
        'headers': {
            'Content-Type': 'application/json'
        }
    }

    options.body = JSON.stringify(body);

    fetch('http://localhost:3000/aluno/cadastrar', options)
        .then((resp) => {return resp.status})
        .then((resp, err) => {
            if(err == null){ 
                window.location.reload();
                if(cadastro.tel.value != 0) adicionarTelefone(); // if user type some phone number
            } else {
                alert('Erro ao enviar os dados');
                console.log(err);
            }
        });
    }
);

function adicionarTelefone() {
    const body = {
        "ra": cadastro.ra.value,
        "tel": cadastro.tel.value
    }

    const options = {
        'method': "POST",
        'headers': {
            'Content-Type': 'application/json'
        }
    }

    options.body = JSON.stringify(body);

    fetch('http://localhost:3000/aluno/telefone', options)
    .then(resp => { return resp.json() })
    .then(data => {
    });
}

function appear() {
    let main = document.querySelector('main');
    main.classList.toggle('none');
}

function listar(){
    fetch('http://localhost:3000/alunos', {
        "method": "GET",
        "headers": {
            "Content-type": "application/json"
        }
    })
    .then((resp) => {
        return resp.json();
    })
    .then((data) => {
        data.forEach((aluno)=> {
            listarAlunos(aluno);      
        });
        mostrarTabela(data)
    });
}

function listarAlunos(aluno) {
    let linha = document.createElement('tr');
    let ra = document.createElement('td');
    let nome = document.createElement('td');
    let cidade = document.createElement('td');
    let escola = document.createElement('td');
    let info = document.createElement('td');

    ra.innerHTML = aluno.ra;
    nome.innerHTML += aluno.nome;
    cidade.innerHTML += aluno.cep;
    escola.innerHTML += aluno.escola;
    // create a label for active the checkbox and the div appear
    info.innerHTML = `<label for="check">
    <img src='./assets/info.png' width ='40px' onclick="informacoes('${aluno.data_nasc}', '${aluno.ra}'); appear()">
    </label>`;

    linha.appendChild(ra);
    linha.appendChild(nome);
    linha.appendChild(cidade);
    linha.appendChild(escola);
    linha.appendChild(info)

    tabela.appendChild(linha);
}

function informacoes(nasc, ra) {
    let pNasc = document.querySelector('#pNasc');
    let btnExcluir = document.querySelector('#excluir');
    btnExcluir.classList.value = ''
    btnExcluir.classList.add(`${ra}`);

    let data = new Date(nasc); // transform date (yyyy-mm-dd) to (dd-mm-yyyy)
    let opcoes = {day: '2-digit', month: '2-digit', year: 'numeric'};
    let formato = new Intl.DateTimeFormat('pt-BR', opcoes);
    let dataFormatada = formato.format(data);

    pNasc.innerHTML = `Data de nascimento: ${dataFormatada}`;

    mostrarTelefone(ra);
}

function mostrarTelefone(ra) {
    let pTel = document.querySelector('#pTel');
    fetch(`http://localhost:3000/telefones/${ra}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    .then((resp) => { return resp.json() })
    .then(data => {
        if(data[0] == undefined) {
            pTel.innerHTML = 'Telefone não cadastrado'
        } else {
            pTel.innerHTML = `Telefone: ${data[0].telefone}`;
        }
    });
}

function mostrarTabela(data) {
    if(data.length != 0){
        tabela.classList.remove('none');
        escondido.style.display = 'none'
    } else {
        tabela.classList.add('none');
        escondido.style.display = 'block';
    }
}

function confirmar(element) {
    let resposta = confirm('Você realmente deseja excluir os dados do aluno?');
    if(resposta == true) {
        excluir(element);
    }
}

function excluir(element) {
    let ra = element.value;
    fetch(`http://localhost:3000/aluno/excluir/${ra}`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        }
    })
    .then(resp => { return resp.json() })
    .then(data => {
        window.location.reload();
    });
}