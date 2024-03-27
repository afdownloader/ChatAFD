const apiKey = "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";
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage(userMessage, 'user');
    fetchMessage(userMessage);
    userInput.value = '';
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(`${sender}-message`);
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function fetchMessage(userMessage) {
    fetch(`https://api.openai.com/v1/engines/davinci-codex/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            "prompt": userMessage,
            "max_tokens": 150,
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.choices[0].text.trim();
        displayMessage(botMessage, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
