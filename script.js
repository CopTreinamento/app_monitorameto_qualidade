document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll(
    'button:not(#copyButton):not(#clearButton):not(#cutButton)'
  );
  const output = document.getElementById('output');
  const copyButton = document.getElementById('copyButton');
  const cutButton = document.getElementById('cutButton');
  const clearButton = document.getElementById('clearButton');
  const theme2Button = document.getElementById('theme2Button');
  let clickedButtons = [];

  // Definição de temas
  const themes = {
    tema1: {
      bodyBackground: '#1E1E1E',
      textColor: '#FFFFFF',
      buttonBackground: '#333333',
      buttonTextColor: '#FFFFFF',
      // buttonBorderWidth: "1px",
      selectedButtonBackground: ['#5B5B5B', '#777777', '#3A3A3A'],
      outputBackground: '#2E2E2E',
      actionButtonBackground: '#444444',
      themeButtonBackground: '#555555', // Cor de fundo para botões de tema
      themeButtonTextColor: '#FFFFFF', // Cor do texto para botões de tema
    },
  };

  let currentTheme = themes.tema1; // Variável para armazenar o tema atual

  // Função para aplicar um tema
  function applyTheme(theme) {
    document.body.style.backgroundColor = theme.bodyBackground;
    document.body.style.color = theme.textColor;

    // Aplicando estilos aos botões de ação
    buttons.forEach((button, index) => {
      button.style.backgroundColor = currentTheme.buttonBackground;
      button.style.color = currentTheme.buttonTextColor;
      button.style.borderWidth = currentTheme.buttonBorderWidth;

      // Atualiza cor de botão selecionado para cada categoria
      if (button.classList.contains('selected')) {
        button.style.backgroundColor = currentTheme.selectedButtonBackground[1];
      }
    });

    // Aplicando estilo ao textarea de output
    output.style.backgroundColor = currentTheme.outputBackground;

    // Aplicando estilo aos botões de ação
    copyButton.style.backgroundColor = currentTheme.actionButtonBackground;
    cutButton.style.backgroundColor = currentTheme.actionButtonBackground;
    clearButton.style.backgroundColor = currentTheme.actionButtonBackground;

    
  // Função de recortar com reaplicação de tema
  cutButton.addEventListener('click', function () {
    output.select();
    document.execCommand('cut');
    output.value = '';
    clickedButtons = [];
    buttons.forEach(button => {
      button.classList.remove('selected');
    });

    // Reaplicar o tema atual
    applyTheme(currentTheme);
  });

  // Função de copiar
  copyButton.addEventListener('click', function () {
    output.select();
    document.execCommand('copy');
  });

  // Função de limpar
  clearButton.addEventListener('click', function () {
    output.value = '';
    clickedButtons = [];
    buttons.forEach(button => {
      button.classList.remove('selected');
    });

    // Reaplicar o tema atual após limpar
    applyTheme(currentTheme);
  });

  // Restante do código JavaScript existente para a seleção de botões
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const buttonText = this.textContent;

      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        // this.style.borderWidth = "1px"
        this.style.backgroundColor = themes[currentTheme].buttonBackground; // Resetando a cor original
        clickedButtons = clickedButtons.filter(text => text !== buttonText);
      } else {
        this.classList.add('selected');
        // this.style.borderWidth = "3px"
        this.style.backgroundColor =
        currentTheme.selectedButtonBackground[1]; // Definindo a cor do botão selecionado
        clickedButtons.push(buttonText);
      }

      output.value = clickedButtons.join(',');
    });
  });

  // Carregar tema ao carregar a página
  applyTheme(currentTheme);
});
