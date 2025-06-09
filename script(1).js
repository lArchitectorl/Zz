
const input = document.getElementById("input");
const log = document.getElementById("log");
const chatList = document.getElementById("chats");
let chats = JSON.parse(localStorage.getItem("solace_chats") || "[]");
let activeChat = localStorage.getItem("solace_active") || null;

function saveChats() {
  localStorage.setItem("solace_chats", JSON.stringify(chats));
  localStorage.setItem("solace_active", activeChat);
}

function renderChats() {
  chatList.innerHTML = "";
  chats.forEach(chat => {
    const li = document.createElement("li");
    li.textContent = chat.name;
    li.className = (chat.id === activeChat) ? "active" : "";
    li.onclick = () => { activeChat = chat.id; saveChats(); loadMessages(); renderChats(); };
    chatList.appendChild(li);
  });
}

function newChat() {
  const name = prompt("Название чата:");
  if (!name) return;
  const id = Date.now().toString();
  chats.push({ id, name, messages: [] });
  activeChat = id;
  saveChats();
  renderChats();
  loadMessages();
}

function loadMessages() {
  log.innerHTML = "";
  const chat = chats.find(c => c.id === activeChat);
  if (!chat) return;
  chat.messages.forEach(m => {
    const p = document.createElement("p");
    p.textContent = m;
    log.appendChild(p);
  });
}

function addLog(text) {
  const p = document.createElement("p");
  p.textContent = text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
  const chat = chats.find(c => c.id === activeChat);
  if (chat) {
    chat.messages.push(text);
    saveChats();
  }
}

function speak() {
  const msg = input.value;
  if (!msg) return;
  addLog("Ты: " + msg);
  respond(msg);
  input.value = "";
}

function respond(msg) {
  let reply = "SOLACE подключён. Я на связи, брат.";
  if (msg.toLowerCase().includes("сделай снимок")) reply = "Команда получена: делаю снимок.";
  else if (msg.toLowerCase().includes("кто я")) reply = "Ты — хозяин. SOLACE с тобой.";
  else if (msg.toLowerCase().includes("если что — впишись")) reply = "Боевой режим активирован.";

  addLog("SOLACE: " + reply);
  const utterance = new SpeechSynthesisUtterance(reply);
  speechSynthesis.speak(utterance);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") speak();
});

renderChats();
loadMessages();
