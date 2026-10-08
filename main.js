/* =========================================
   ELEMENTOS
========================================= */

const campoSenha =
    document.querySelector('#campo-senha');

const palavraBase =
    document.querySelector('#palavra-base');

const novaPalavra =
    document.querySelector('#nova-palavra');

const tamanhoSlider =
    document.querySelector('#tamanho');

const valorTamanho =
    document.querySelector('#valor-tamanho');

const checkboxes =
    document.querySelectorAll('.checkbox');

const botoesModo =
    document.querySelectorAll('.modo-botao');

const copiar =
    document.querySelector('#copiar');

const forcaSenha =
    document.querySelector('.forca');

const nivelSenha =
    document.querySelector('#nivel');

const mensagem =
    document.querySelector('.entropia');

const pontuacao =
    document.querySelector('#pontuacao');


/* =========================================
   CONFIGURAÇÕES
========================================= */

let tamanhoSenha = 12;

let modoAtual = 'leetspeak';

let palavraAtual = '';


/* =========================================
   CONJUNTOS DE CARACTERES
========================================= */

const letrasMaiusculas =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas =
    'abcdefghijklmnopqrstuvwxyz';

const numeros =
    '0123456789';

const simbolos =
    '!?*#%@';


/* =========================================
   BANCO DE PALAVRAS
========================================= */

const palavras = [
    'Aurora',
    'Brisa',
    'Cavalo',
    'Chama',
    'Cobra',
    'Coral',
    'Estrela',
    'Fenix',
    'Flora',
    'Forte',
    'Galaxia',
    'Jardim',
    'Lago',
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
    'Rio',
    'Sombra',
    'Sol',
    'Tempestade',
    'Tigre',
    'Universo',
    'Vento',
    'Vulcao'
];


/* =========================================
   ALEATÓRIO SEGURO
========================================= */

function numeroAleatorio(maximo) {

    if (maximo <= 0) {
        return 0;
    }


    /*
        Usa crypto quando disponível.
        Isso é melhor para gerar senhas
        do que Math.random().
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


    return Math.floor(
        Math.random() * maximo
    );
}


/* =========================================
   ESCOLHE ITEM
========================================= */

function escolher(array) {

    return array[
        numeroAleatorio(array.length)
    ];
}


/* =========================================
   CARACTERES ALEATÓRIOS
========================================= */

function escolherCaractere(texto) {

    return texto[
        numeroAleatorio(texto.length)
    ];
}


/* =========================================
   OBTÉM ALFABETO
========================================= */

function obterAlfabeto() {

    let alfabeto = '';

    if (checkboxes[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkboxes[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkboxes[2].checked) {
        alfabeto += numeros;
    }

    if (checkboxes[3].checked) {
        alfabeto += simbolos;
    }

    return alfabeto;
}


/* =========================================
   GERA PALAVRA BASE
========================================= */

function gerarPalavra() {

    palavraAtual =
        escolher(palavras);

    palavraBase.textContent =
        palavraAtual;
}


/* =========================================
   LEETSPEAK
========================================= */

const mapaLeet = {

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


function transformarLeet(texto) {

    let resultado = '';


    for (const caractere of texto) {

        const letra =
            caractere.toLowerCase();


        /*
            Mantemos algumas letras normais
            para que a senha continue legível.
        */

        if (
            mapaLeet[letra] &&
            numeroAleatorio(100) < 65
        ) {

            resultado +=
                escolher(mapaLeet[letra]);

        } else {

            resultado += caractere;

        }
    }


    return resultado;
}


/* =========================================
   EMBARALHAR
========================================= */

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


/* =========================================
   VERIFICA TIPOS SELECIONADOS
========================================= */

function tiposSelecionados() {

    return {

        maiusculas:
            checkboxes[0].checked,

        minusculas:
            checkboxes[1].checked,

        numeros:
            checkboxes[2].checked,

        simbolos:
            checkboxes[3].checked

    };
}


/* =========================================
   GERA CARACTERE DE CADA TIPO
========================================= */

function caracteresObrigatorios() {

    const tipos =
        tiposSelecionados();

    let resultado = '';


    if (tipos.maiusculas) {

        resultado +=
            escolherCaractere(
                letrasMaiusculas
            );
    }


    if (tipos.minusculas) {

        resultado +=
            escolherCaractere(
                letrasMinusculas
            );
    }


    if (tipos.numeros) {

        resultado +=
            escolherCaractere(
                numeros
            );
    }


    if (tipos.simbolos) {

        resultado +=
            escolherCaractere(
                simbolos
            );
    }


    return resultado;
}


/* =========================================
   COMPLETA SENHA
========================================= */

function completarSenha(
    senha,
    alfabeto
) {

    let resultado = senha;


    while (
        resultado.length < tamanhoSenha
    ) {

        resultado +=
            escolherCaractere(
                alfabeto
            );
    }


    /*
        Se a palavra transformada ficar
        maior que o tamanho escolhido,
        pegamos uma parte dela.
    */

    if (
        resultado.length > tamanhoSenha
    ) {

        resultado =
            resultado.substring(
                0,
                tamanhoSenha
            );
    }


    return resultado;
}


/* =========================================
   MODO LEETSPEAK
========================================= */

function gerarLeetspeak() {

    const alfabeto =
        obterAlfabeto();


    if (!alfabeto) {

        mostrarSemOpcoes();

        return;
    }


    /*
        Se não existe palavra ainda,
        cria uma.
    */

    if (!palavraAtual) {

        gerarPalavra();
    }


    /*
        Transforma a palavra.
    */

    let senha =
        transformarLeet(
            palavraAtual
        );


    /*
        Adiciona os tipos selecionados.
    */

    senha +=
        caracteresObrigatorios();


    /*
        Completa até o tamanho escolhido.
    */

    senha =
        completarSenha(
            senha,
            alfabeto
        );


    /*
        Embaralha apenas os caracteres
        adicionais. A palavra continua
        visualmente reconhecível quando
        possível.
    */

    if (senha.length > palavraAtual.length) {

        const base =
            senha.substring(
                0,
                Math.min(
                    senha.length,
                    palavraAtual.length
                )
            );

        const extras =
            senha.substring(
                base.length
            );


        senha =
            base +
            embaralhar(extras);
    }


    campoSenha.value =
        senha;


    classificaSenha(
        alfabeto.length,
        true
    );
}


/* =========================================
   MODO ALEATÓRIO
========================================= */

function gerarAleatoria() {

    const alfabeto =
        obterAlfabeto();


    if (!alfabeto) {

        mostrarSemOpcoes();

        return;
    }


    let senha =
        caracteresObrigatorios();


    senha =
        completarSenha(
            senha,
            alfabeto
        );


    senha =
        embaralhar(senha);


    campoSenha.value =
        senha;


    palavraBase.textContent =
        'Modo aleatório';


    classificaSenha(
        alfabeto.length,
        false
    );
}


/* =========================================
   GERA SENHA
========================================= */

function geraSenha() {

    if (
        modoAtual === 'leetspeak'
    ) {

        gerarLeetspeak();

    } else {

        gerarAleatoria();
    }
}


/* =========================================
   SEM OPÇÕES
========================================= */

function mostrarSemOpcoes() {

    campoSenha.value =
        'Selecione uma opção';

    palavraBase.textContent =
        '—';

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
}


/* =========================================
   CLASSIFICA SEGURANÇA
========================================= */

function classificaSenha(
    tamanhoAlfabeto,
    leetspeak = false
) {

    if (!tamanhoAlfabeto) {

        mostrarSemOpcoes();

        return;
    }


    /*
        Estimativa de entropia.

        No modo Leetspeak aplicamos um
        pequeno desconto porque a estrutura
        baseada em palavras é mais previsível
        que uma senha totalmente aleatória.
    */

    let entropia =
        tamanhoSenha *
        Math.log2(tamanhoAlfabeto);


    if (leetspeak) {

        entropia *= 0.72;
    }


    /*
        MUITO FRACA
    */

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


    /*
        FRACA
    */

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


    /*
        MODERADA
    */

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


    /*
        FORTE
    */

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


    /*
        LEGENDÁRIA
    */

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


    const pontos =
        Math.floor(entropia);


    pontuacao.textContent =
        pontos;


    if (leetspeak) {

        mensagem.textContent =
            'Leetspeak inteligente • ' +
            pontos +
            ' pontos de segurança.';

    } else {

        mensagem.textContent =
            'Senha aleatória • ' +
            pontos +
            ' pontos de segurança.';
    }
}


/* =========================================
   SLIDER
========================================= */

tamanhoSlider.addEventListener(
    'input',
    function () {

        tamanhoSenha =
            Number(this.value);

        valorTamanho.textContent =
            tamanhoSenha;

        geraSenha();
    }
);


/* =========================================
   NOVA PALAVRA
========================================= */

novaPalavra.addEventListener(
    'click',
    function () {

        gerarPalavra();

        geraSenha();
    }
);


/* =========================================
   TROCA DE MODO
========================================= */

botoesModo.forEach(
    function (botao) {

        botao.addEventListener(
            'click',
            function () {

                botoesModo.forEach(
                    function (item) {

                        item.classList.remove(
                            'ativo'
                        );
                    }
                );


                this.classList.add(
                    'ativo'
                );


                modoAtual =
                    this.dataset.modo;


                if (
                    modoAtual === 'leetspeak'
                ) {

                    gerarPalavra();

                }


                geraSenha();
            }
        );
    }
);


/* =========================================
   CHECKBOXES
========================================= */

checkboxes.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            'change',
            geraSenha
        );
    }
);


/* =========================================
   COPIAR
========================================= */

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
            1200
        );
    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

valorTamanho.textContent =
    tamanhoSenha;

gerarPalavra();

geraSenha();
