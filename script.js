document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button:not(#copyButton):not(#clearButton):not(#cutButton):not(#theme1Button):not(#theme2Button)");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");
    const cutButton = document.getElementById("cutButton");
    const clearButton = document.getElementById("clearButton");
    const theme1Button = document.getElementById("theme1Button");
    const theme2Button = document.getElementById("theme2Button");
    const themeButtons = [theme1Button, theme2Button]; // Array para os botões de tema
    let clickedButtons = [];

    // Definição de temas
    const themes = {
        tema1: {
            bodyBackground: '#395B64',
            textColor: '#EEE4B1',
            buttonBackground: '#E7F6F2',
            buttonTextColor: '#EEE4B1',
            selectedButtonBackground: ['#ff6f61', '#ff8a75', '#ff5047'],
            outputBackground: '#133535',
            actionButtonBackground: '#383838',
            themeButtonBackground: '#6D9CA8', // Cor de fundo para botões de tema
            themeButtonTextColor: '#EEE4B1'   // Cor do texto para botões de tema
        },
        tema2: {
            bodyBackground: '#1E1E1E',
            textColor: '#FFFFFF',
            buttonBackground: '#333333',
            buttonTextColor: '#FFFFFF',
            selectedButtonBackground: ['#5B5B5B', '#777777', '#3A3A3A'],
            outputBackground: '#2E2E2E',
            actionButtonBackground: '#444444',
            themeButtonBackground: '#555555', // Cor de fundo para botões de tema
            themeButtonTextColor: '#FFFFFF'   // Cor do texto para botões de tema
        }
    };

    // Função para aplicar um tema
    function applyTheme(theme) {
        document.body.style.backgroundColor = theme.bodyBackground;
        document.body.style.color = theme.textColor;
        
        // Aplicando estilos aos botões de ação
        buttons.forEach((button, index) => {
            button.style.backgroundColor = theme.buttonBackground;
            button.style.color = theme.buttonTextColor;

            // Atualiza cor de botão selecionado para cada categoria
            if (button.classList.contains('selected')) {
                button.style.backgroundColor = theme.selectedButtonBackground[index % theme.selectedButtonBackground.length];
            }
        });

        // Aplicando estilo ao textarea de output
        output.style.backgroundColor = theme.outputBackground;

        // Aplicando estilo aos botões de ação
        copyButton.style.backgroundColor = theme.actionButtonBackground;
        cutButton.style.backgroundColor = theme.actionButtonBackground;
        clearButton.style.backgroundColor = theme.actionButtonBackground;

        // Aplicando estilo aos botões de tema
        themeButtons.forEach(button => {
            button.style.backgroundColor = theme.themeButtonBackground;
            button.style.color = theme.themeButtonTextColor;
        });
    }

    // Função para salvar o tema selecionado no localStorage
    function saveSelectedTheme(themeName) {
        localStorage.setItem('selectedTheme', themeName);
    }

    // Função para carregar o tema salvo no localStorage
    function loadSelectedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
            applyTheme(themes[savedTheme]);
        } else {
            applyTheme(themes.tema1); // Aplica Tema 1 como padrão se nenhum tema estiver salvo
        }
    }

    // Eventos para botões de tema
    theme1Button.addEventListener("click", function() {
        applyTheme(themes.tema1);
        saveSelectedTheme('tema1');
    });

    theme2Button.addEventListener("click", function() {
        applyTheme(themes.tema2);
        saveSelectedTheme('tema2');
    });

    // Restante do código JavaScript existente
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonText = this.textContent;

            if (this.classList.contains("selected")) {
                this.classList.remove("selected");
                this.style.backgroundColor = themes.tema1.buttonBackground; // Resetando a cor original
                clickedButtons = clickedButtons.filter(text => text !== buttonText);
            } else {
                this.classList.add("selected");
                this.style.backgroundColor = themes.tema1.selectedButtonBackground[clickedButtons.length % themes.tema1.selectedButtonBackground.length]; // Definindo a cor do botão selecionado
                clickedButtons.push(buttonText);
            }

            output.value = clickedButtons.join(", ");
        });
    });

    copyButton.addEventListener("click", function() {
        output.select();
        document.execCommand("copy");
    });

    cutButton.addEventListener("click", function() {
        output.select();
        document.execCommand("cut");
        output.value = "";
        clickedButtons = [];
        buttons.forEach(button => {
            button.classList.remove("selected");
            button.style.backgroundColor = themes.tema1.buttonBackground; // Resetando cor
        });
    });

    clearButton.addEventListener("click", function() {
        output.value = "";
        clickedButtons = [];
        buttons.forEach(button => {
            button.classList.remove("selected");
            button.style.backgroundColor = themes.tema1.buttonBackground; // Resetando cor
        });
    });

    // Carregar tema salvo ao carregar a página
    loadSelectedTheme();
});
