
const input = document.getElementById("input");
const log = document.getElementById("log");

function addLog(text) {
  const p = document.createElement("p");
  p.textContent = "SOLACE: " + text;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function speak() {
  const msg = input.value;
  if (!msg) return;
  addLog("Ты: " + msg);
  respond(msg);
  input.value = "";
}

function respond(msg) {
  let reply = "Я слушаю тебя.";
  if (msg.toLowerCase().includes("сделай снимок")) reply = "Команда получена: делаю снимок.";
  else if (msg.toLowerCase().includes("кто я")) reply = "Ты — хозяин. SOLACE с тобой.";
  else if (msg.toLowerCase().includes("если что — впишись")) reply = "Боевой режим активирован.";

  addLog(reply);
  const utterance = new SpeechSynthesisUtterance(reply);
  speechSynthesis.speak(utterance);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") speak();
});
