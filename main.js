/* ==========================================
   ELEMENTOS DO SITE
========================================== */

const numeroSenha =
    document.querySelector('.parametro-senhatexto');

const botoesTamanho =
    document.querySelectorAll('.parametro-senhabotao');

const campoSenha =
    document.querySelector('#campo-senha');

const checkbox =
    document.querySelectorAll('.checkbox');

const forcaSenha =
    document.querySelector('.forca');

const nivelSenha =
    document.querySelector('#nivel');

const mensagem =
    document.querySelector('.entropia');

const copiar =
    document.querySelector('#copiar');

const pontuacao =
    document.querySelector('#pontuacao');


/* ==========================================
   CONFIGURAÇÕES
========================================== */

let tamanhoSenha = 12;


/* ==========================================
   CARACTERES
========================================== */

const letrasMaiusculas =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas =
    'abcdefghijklmnopqrstuvwxyz';

const numeros =
    '0123456789';

const simbolos =
    '!?*#%@';


/* ==========================================
   BANCO DE PALAVRAS
========================================== */

/*
   São palavras simples e fáceis de lembrar.
   O sistema transforma parte delas em Leetspeak.
*/

const palavras = [
    'Aurora',
    'Brisa',
    'Chama',
    'Coral',
    'Estrela',
    'Fenix',
    'Flora',
    'Galaxia',
    'Jardim',
    'Lenda',
    'Lobo',
    'Luar',
    'Lumen',
    'Marfim',
    'Montanha',
    'Nebula',
    'Nexus',
    'Onda',
    'Orion',
    'Planeta',
    'Raio',
    'Sombra',
    'Sol',
    'Tempestade',
    'Tigre',
    'Universo',
    'Vento',
    'Vulcao'
];


/* ==========================================
   LEETSPEAK
========================================== */

const leet = {

    a: ['4', '@'],
    e: ['3'],
    i: ['1', '!'],
    o: ['0'],
    s: ['5', '$'],
    t: ['7'],
    g: ['9'],
    b: ['8'],
    l: ['1']

};


/* ==========================================
   NÚMERO ALEATÓRIO SEGURO
========================================== */

function numeroAleatorio(maximo) {

    if (maximo <= 0) {
        return 0;
    }

    /*
       crypto.getRandomValues() fornece valores
       aleatórios fortes no navegador.
    */

    if (
        window.crypto &&
        window.crypto.getRandomValues
    ) {

        const array =
            new Uint32Array(1);

        window.crypto.getRandomValues(array);

        return array[0] % maximo;
    }

    /*
       Fallback para navegadores antigos.
    */

    return Math.floor(
        Math.random() * maximo
    );
}


/* ==========================================
   ESCOLHER ITEM
========================================== */

function escolher(array) {

    return array[
        numeroAleatorio(array.length)
    ];
}


/* ==========================================
   ESCOLHER CARACTERE
========================================== */

function escolherCaractere(texto) {

    return texto[
        numeroAleatorio(texto.length)
    ];
}


/* ==========================================
   PALAVRA ALEATÓRIA
========================================== */

function gerarPalavra() {

    return escolher(palavras);
}


/* ==========================================
   TRANSFORMAR EM LEETSPEAK
========================================== */

function transformarLeet(palavra) {

    let resultado = '';

    for (const letra of palavra) {

        const minuscula =
            letra.toLowerCase();


        /*
           Não transformamos tudo.
           Isso deixa a palavra ainda
           reconhecível por humanos.
        */

        if (
            leet[minuscula] &&
            numeroAleatorio(100) < 60
        ) {

            resultado +=
                escolher(leet[minuscula]);

        } else {

            resultado += letra;
        }
    }

    return resultado;
}


/* ==========================================
   OBTÉM ALFABETO SELECIONADO
========================================== */

function obterAlfabeto() {

    let alfabeto = '';

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto += numeros;
    }

    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    return alfabeto;
}


/* ==========================================
   GARANTE UM CARACTERE DE CADA TIPO
========================================== */

function caracteresObrigatorios() {

    let resultado = '';

    if (checkbox[0].checked) {

        resultado +=
            escolherCaractere(
                letrasMaiusculas
            );
    }

    if (checkbox[1].checked) {

        resultado +=
            escolherCaractere(
                letrasMinusculas
            );
    }

    if (checkbox[2].checked) {

        resultado +=
            escolherCaractere(
                numeros
            );
    }

    if (checkbox[3].checked) {

        resultado +=
            escolherCaractere(
                simbolos
            );
    }

    return resultado;
}


/* ==========================================
   EMBARALHAR
========================================== */

function embaralhar(texto) {

    const array =
        texto.split('');

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            numeroAleatorio(i + 1);

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }

    return array.join('');
}


/* ==========================================
   GERAR SENHA INTELIGENTE
========================================== */

function geraSenha() {

    const alfabeto =
        obterAlfabeto();


    /* -------------------------------
       NENHUMA OPÇÃO SELECIONADA
    -------------------------------- */

    if (alfabeto.length === 0) {

        campoSenha.value =
            'Selecione uma opção';

        classificaSenha(0);

        return;
    }


    /*
       Criamos uma palavra humana.
    */

    const palavra =
        gerarPalavra();


    /*
       Transformamos a palavra
       parcialmente em Leetspeak.
    */

    let senha =
        transformarLeet(palavra);


    /*
       Garantimos os tipos selecionados.

       Exemplo:

       Palavra:
       Aurora

       Pode virar:

       4ur0r4

       Depois adicionamos:

       A
       7
       @
    */

    senha +=
        caracteresObrigatorios();


    /*
       Completa até o tamanho escolhido.
    */

    while (
        senha.length < tamanhoSenha
    ) {

        senha +=
            escolherCaractere(
                alfabeto
            );
    }


    /*
       Se ultrapassar o tamanho,
       cortamos.
    */

    if (
        senha.length > tamanhoSenha
    ) {

        senha =
            senha.substring(
                0,
                tamanhoSenha
            );
    }


    /*
       Para evitar que a senha fique
       sempre previsível, embaralhamos.

       Mantemos os caracteres da palavra
       presentes na senha.
    */

    senha =
        embaralhar(senha);


    campoSenha.value =
        senha;


    classificaSenha(
        alfabeto.length
    );
}


/* ==========================================
   DIMINUIR TAMANHO
========================================== */

function diminuiTamanho() {

    if (tamanhoSenha > 4) {

        tamanhoSenha--;
    }

    numeroSenha.textContent =
        tamanhoSenha;

    geraSenha();
}


/* ==========================================
   AUMENTAR TAMANHO
========================================== */

function aumentaTamanho() {

    if (tamanhoSenha < 30) {

        tamanhoSenha++;
    }

    numeroSenha.textContent =
        tamanhoSenha;

    geraSenha();
}


/* ==========================================
   BOTÕES + E -
========================================== */

botoesTamanho[0].addEventListener(
    'click',
    diminuiTamanho
);

botoesTamanho[1].addEventListener(
    'click',
    aumentaTamanho
);


/* ==========================================
   CHECKBOXES
========================================== */

checkbox.forEach(
    function (item) {

        item.addEventListener(
            'change',
            geraSenha
        );
    }
);


/* ==========================================
   COPIAR
========================================== */

copiar.addEventListener(
    'click',
    async function () {

        const senha =
            campoSenha.value;


        if (
            !senha ||
            senha === 'Selecione uma opção'
        ) {

            return;
        }


        try {

            await navigator.clipboard.writeText(
                senha
            );

        } catch (erro) {

            /*
               Fallback para navegadores
               que não permitem Clipboard API.
            */

            campoSenha.select();

            document.execCommand(
                'copy'
            );
        }


        copiar.textContent =
            'COPIADO!';


        setTimeout(
            function () {

                copiar.textContent =
                    'COPIAR';

            },
            1000
        );
    }
);


/* ==========================================
   CLASSIFICAÇÃO DE SEGURANÇA
========================================== */

function classificaSenha(
    tamanhoAlfabeto
) {

    /* -------------------------------
       SEM OPÇÕES
    -------------------------------- */

    if (tamanhoAlfabeto === 0) {

        forcaSenha.style.width =
            '0%';

        forcaSenha.style.backgroundColor =
            '#6b1010';

        nivelSenha.textContent =
            'SEM SENHA';

        nivelSenha.style.color =
            '#e32626';

        mensagem.textContent =
            'Escolha pelo menos uma característica.';

        pontuacao.textContent =
            '0';

        return;
    }


    /*
       Cálculo de entropia.
    */

    const entropia =
        tamanhoSenha *
        Math.log2(tamanhoAlfabeto);


    /* -------------------------------
       MUITO FRACA
    -------------------------------- */

    if (entropia < 30) {

        forcaSenha.style.width =
            '20%';

        forcaSenha.style.backgroundColor =
            '#6b1010';

        nivelSenha.textContent =
            'MUITO FRACA';

        nivelSenha.style.color =
            '#e32626';
    }


    /* -------------------------------
       FRACA
    -------------------------------- */

    else if (entropia < 45) {

        forcaSenha.style.width =
            '40%';

        forcaSenha.style.backgroundColor =
            '#e32626';

        nivelSenha.textContent =
            'FRACA';

        nivelSenha.style.color =
            '#e32626';
    }


    /* -------------------------------
       MODERADA
    -------------------------------- */

    else if (entropia < 60) {

        forcaSenha.style.width =
            '60%';

        forcaSenha.style.backgroundColor =
            '#ff9d00';

        nivelSenha.textContent =
            'MODERADA';

        nivelSenha.style.color =
            '#ff9d00';
    }


    /* -------------------------------
       FORTE
    -------------------------------- */

    else if (entropia < 75) {

        forcaSenha.style.width =
            '80%';

        forcaSenha.style.backgroundColor =
            '#00c853';

        nivelSenha.textContent =
            'FORTE';

        nivelSenha.style.color =
            '#00e676';
    }


    /* -------------------------------
       LEGENDÁRIA
    -------------------------------- */

    else {

        forcaSenha.style.width =
            '100%';

        forcaSenha.style.backgroundColor =
            '#8b35ff';

        nivelSenha.textContent =
            'LEGENDÁRIA';

        nivelSenha.style.color =
            '#b77aff';
    }


    /* -------------------------------
       SCORE
    -------------------------------- */

    pontuacao.textContent =
        Math.floor(entropia);


    /* -------------------------------
       MENSAGEM
    -------------------------------- */

    mensagem.textContent =
        'Nível de segurança: ' +
        Math.floor(entropia) +
        ' pontos.';
}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

numeroSenha.textContent =
    tamanhoSenha;

geraSenha();
