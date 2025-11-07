const form = document.getElementById("form");
const input = document.getElementById("input");
const chat = document.getElementById("chat");

function addMessage(sender, text) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    addMessage("Ty", userText);
    input.value = "";

    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();
    addMessage("AI", data.reply);
});
