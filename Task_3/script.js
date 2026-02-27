const wsUri = "wss://ws.postman-echo.com/raw";

const input = document.querySelector(".input");
const btn = document.querySelector(".button");
const geo = document.querySelector(".geo");
const text = document.getElementById("message_box");

let webSocket;
let ignoreNextEcho = false;

function writeToScreen(message, type = 'sent') {
    let pre = document.createElement("span");
    pre.innerHTML = message;
    pre.classList.add(type === 'sent' ? 'sent-message' : 'received-message');
    text.appendChild(pre);

    text.scrollTop = text.scrollHeight;
}

function updateVariable(value) {
    return value;
}

webSocket = new WebSocket(wsUri);

webSocket.addEventListener("open", (event) => {
    console.log("Соединение установлено");
});

webSocket.addEventListener("message", (event) => {
    console.log("Получено сообщение:", event.data);
    if (event.data && event.data.trim() !== "") {
        if (ignoreNextEcho) {
            ignoreNextEcho = false;
            return;
        }
        writeToScreen(event.data, 'received');
    }
});

webSocket.addEventListener("error", (event) => {
    console.error("Ошибка WebSocket:", event);
    enableLocalEcho();
});

webSocket.addEventListener("close", (event) => {
    console.log("Соединение закрыто");
    enableLocalEcho();
});

function enableLocalEcho() {
    webSocket = {
        send: (message) => {
            setTimeout(() => {
                writeToScreen(message, 'received');
            }, 500);
        },
        close: () => {},
        readyState: WebSocket.OPEN
    };
}

btn.addEventListener("click", () => {
    const message = input.value.trim();
    
    if (message === "") {
        alert("Введите сообщение!");
        return;
    }
    
    webSocket.send(message);
    
    writeToScreen(message, 'sent');
    
    input.value = "";
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

geo.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            
            ignoreNextEcho = true;
            webSocket.send(`Моя геолокация: ${latitude}, ${longitude}`);
            
            writeToScreen(`<a href="${mapLink}" target="_blank">📍 Моя геолокация</a>`, 'sent');
        }, (error) => {
            alert("Ошибка получения геолокации: " + error.message);
        });
    } else {
        alert("Geolocation не поддерживается этим браузером.");
    }
});