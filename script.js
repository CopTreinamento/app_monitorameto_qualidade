document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button:not(#copyButton):not(#clearButton):not(#cutButton)");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");
    const cutButton = document.getElementById("cutButton");
    const clearButton = document.getElementById("clearButton");
    let clickedButtons = [];

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonText = this.textContent;

            if (this.classList.contains("selected")) {
                this.classList.remove("selected");
                clickedButtons = clickedButtons.filter(text => text !== buttonText);
            } else {
                this.classList.add("selected");
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
        buttons.forEach(button => button.classList.remove("selected"));
    });

    clearButton.addEventListener("click", function() {
        output.value = "";
        clickedButtons = [];
        buttons.forEach(button => button.classList.remove("selected"));
    });
});
