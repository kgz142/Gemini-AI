var promptInicial = "";
const buttonContext = document.getElementById("inputButtonInical");
const contexto = document.getElementById("contextControl");
const contaierContext = document.querySelector(".contaier-context");
const containerForm = document.querySelector(".container-form");

buttonContext.addEventListener("click", () => {
    promptInicial = contexto.value;
    if (promptInicial.trim() === "") {
        alert("O input não pode estar vazio!");
    } else {
        contaierContext.style.display = "none";
        containerForm.style.display = "flex";
    }
});

const inputUserMessage = document.getElementById("userMessage");
const responses = document.querySelector(".response");
const inputUserButton = document.getElementById("inputButton");
const title = document.querySelector("h1");
import { GoogleGenerativeAI } from "@google/generative-ai";

inputUserButton.addEventListener("click", () => {
    if (inputUserMessage.value.trim() !== "") {
        rodar();
    } else {
        alert("Digite uma mensagem para enviar!");
    }
});

async function rodar() {
    const API_KEY = "AIzaSyC0pg2z0Fl71agwGOWJ3wf1EJtFSObNp6M";
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = inputUserMessage.value;
        const result = await model.generateContent(promptInicial + prompt);
        const response = result.response;

        const inputData = document.createElement('p');
        const mySpan = document.createElement('span');

        inputData.textContent = prompt;
        mySpan.textContent = response.candidates[0].content.parts[0].text;

        responses.appendChild(inputData);
        responses.appendChild(mySpan);
        responses.style.display = "flex";
        title.style.display = "none";

        inputUserMessage.value = "";
        inputUserMessage.focus();
    } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
    }
}

const recomecar = document.getElementById("recomecar");
recomecar.addEventListener("click", () => {
    location.reload();
});
