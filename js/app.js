"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const STORE = "soroai.workspace.v2";
const makeId = () => crypto.randomUUID?.() || String(Date.now() + Math.random());
const escapeText = value => String(value ?? "");
let conversations = [];
let activeId = null;
let messages = [];

function persist() {
  const active = conversations.find(item => item.id === activeId);
  if (active) active.messages = messages;
  try { localStorage.setItem(STORE, JSON.stringify(conversations)); } catch (error) { console.error("Could not save workspace", error); }
}
function startConversation() {
  const item = { id: makeId(), title: "New conversation", updatedAt: Date.now(), messages: [] };
  conversations.unshift(item);
  activeId = item.id;
  messages = [];
  persist();
  render();
  $("#prompt").focus();
}
function renderHistory() {
  const host = $("#history");
  host.replaceChildren();
  conversations.forEach(item => {
    const button = document.createElement("button");
    button.className = "history" + (item.id === activeId ? " active" : "");
    button.type = "button";
    button.textContent = item.title;
    button.addEventListener("click", () => {
      persist();
      activeId = item.id;
      messages = [...item.messages];
      render();
    });
    host.append(button);
  });
}
function renderMessages() {
  const host = $("#messages");
  host.replaceChildren();
  messages.forEach(message => {
    const article = document.createElement("article");
    article.className = "msg " + message.role;
    const label = document.createElement("b");
    label.textContent = message.role === "user" ? "You" : "SoroAI · Local mode";
    const body = document.createElement("p");
    body.textContent = message.text;
    article.append(label, body);
    host.append(article);
  });
  host.scrollTop = host.scrollHeight;
  $("#hero").hidden = messages.length > 0;
}
function render() { renderHistory(); renderMessages(); }
function send(text) {
  const value = text.trim();
  if (!value) return;
  if (!activeId) {
    const item = { id: makeId(), title: value.slice(0, 34), updatedAt: Date.now(), messages: [] };
    conversations.unshift(item); activeId = item.id;
  }
  messages.push({ role: "user", text: value, at: Date.now() });
  const active = conversations.find(item => item.id === activeId);
  if (active && active.title === "New conversation") active.title = value.slice(0, 34);
  messages.push({ role: "assistant", text: "این نسخه هنوز به مدل هوش مصنوعی متصل نیست. پیام شما در همین مرورگر ذخیره شد. برای پاسخ واقعی، باید یک API امن در بک‌اند PHP اضافه شود؛ کلید API نباید داخل مرورگر قرار بگیرد.", at: Date.now() });
  persist();
  render();
}
$("#form").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#prompt");
  send(input.value);
  input.value = "";
  input.focus();
});
$("#new").addEventListener("click", startConversation);
$("#chips")?.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (button) { $("#prompt").value = button.textContent.trim(); $("#prompt").focus(); }
});
document.querySelectorAll(".chip").forEach(button => button.addEventListener("click", () => {
  $("#prompt").value = button.textContent.trim(); $("#prompt").focus();
}));
try {
  const saved = JSON.parse(localStorage.getItem(STORE) || "[]");
  conversations = Array.isArray(saved) ? saved.filter(item => item && Array.isArray(item.messages)) : [];
} catch { conversations = []; }
if (conversations.length) {
  conversations.sort((a,b) => b.updatedAt - a.updatedAt);
  activeId = conversations[0].id;
  messages = [...conversations[0].messages];
}
render();