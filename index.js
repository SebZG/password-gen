// const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
//     "/"];

const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"];
const numbers = [..."0123456789"];
const symbols = [..."~`!@#$%^&*()_-+={[}],|:;<>.?/"];

const passwordEl1 = document.getElementById("password1");
const passwordEl2 = document.getElementById("password2");
const generateBtn = document.getElementById("btn");
const tooltipContainer = document.querySelectorAll(".tooltip");

tooltipContainer.forEach(t => t.classList.add("disabled"));

function getRandomChar(chars) {
    return chars[Math.floor(Math.random() * chars.length)];
}

function getPassword(length = 15) {
    const includeNumbers = document.getElementById("toggle-numbers").checked;
    const includeSymbols = document.getElementById("toggle-symbols").checked;

    let activeChars = [...letters];
    if (includeNumbers) activeChars = activeChars.concat(numbers);
    if (includeSymbols) activeChars = activeChars.concat(symbols);

    let password = "";
    for (let i = 0; i < length; i++) {
        password += getRandomChar(activeChars);
    }
    return password;
}

function generatePasswords() {
    passwordEl1.textContent = getPassword();
    passwordEl2.textContent = getPassword();

    tooltipContainer.forEach(t => t.classList.remove("disabled"));

}

function copyElementContent(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand("copy");
        console.log(`Copied: ${element.textContent}`);
    } catch (err) {
        console.error("Copy failed", err);
    }

    selection.removeAllRanges();

    const tooltip = element.parentElement.querySelector(".tooltipText");

    if (tooltip) {
        const tooltipContainer = element.parentElement;

        tooltip.textContent = "Copied!";
        tooltipContainer.classList.add("active");

        setTimeout(() => {
            tooltip.textContent = "Copy";
            tooltipContainer.classList.remove("active");
        }, 1000)
    }
}

// Event Listeners
generateBtn.addEventListener("click", generatePasswords);
passwordEl1.addEventListener("click", () => copyElementContent(passwordEl1));
passwordEl2.addEventListener("click", () => copyElementContent(passwordEl2));