import React, { useState, useEffect, useRef } from "react";

function Chatbot() {

const [open, setOpen] = useState(false);
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);

const chatEndRef = useRef(null);

// 🔥 Auto scroll
useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// 🔥 Load chat history
useEffect(() => {
  fetch("https://campushub-backend-6r2u.onrender.com/api/ai/history")
    .then(res => res.json())
    .then(data => setMessages(data));
}, []);

const sendMessage = async () => {
  if (!input) return;

  const userMsg = { text: input, sender: "user" };
  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("https://campushub-backend-6r2u.onrender.com/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const botMsg = { text: data.reply, sender: "bot" };

    setMessages(prev => [...prev, botMsg]);

  } catch {
    setMessages(prev => [...prev, { text: "Error 😢", sender: "bot" }]);
  }

  setLoading(false);
};

// 🔥 Enter press
const handleKey = (e) => {
  if (e.key === "Enter") sendMessage();
};

// 🎤 Voice input
const startVoice = () => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = (event) => {
    setInput(event.results[0][0].transcript);
  };

  recognition.start();
};

return (
<div>

<button onClick={() => setOpen(!open)} style={chatBtn}>💬</button>

{open && (
<div style={chatBox}>

<div style={chatHeader}>
  CampusHub AI 🤖

  <img
    src="/aviral.png"
    alt="Aviral"
    style={avatar}
    onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
onMouseOut={(e) => e.target.style.transform = "scale(1)"}
  />
</div>

<div style={chatBody}>
{messages.map((msg, i) => (
  <div key={i} style={msg.sender === "user" ? userMsg : botMsg}>
    {msg.text}
  </div>
))}

{loading && <div style={botMsg}>Typing...</div>}

<div ref={chatEndRef}></div>
</div>

<div style={chatFooter}>
<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={handleKey}
  placeholder="Type message..."
  style={inputBox}
/>

<button onClick={startVoice}>🎤</button>

<button onClick={sendMessage} style={sendBtn}>Send</button>
</div>

</div>
)}

</div>
);
}
// ===== STYLES =====

const chatBtn = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  fontSize: "20px",
  cursor: "pointer"
};

const chatBox = {
  position: "fixed",
  bottom: "90px",
  right: "20px",
  width: "320px",
  height: "420px",
  background: "white",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column"
};



const chatBody = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  background: "#f1f5f9"
};

const chatFooter = {
  display: "flex",
  padding: "10px"
};

const inputBox = {
  flex: 1,
  padding: "8px"
};

const sendBtn = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px"
};

const userMsg = {
  textAlign: "right",
  background: "#3b82f6",
  color: "white",
  margin: "5px",
  padding: "6px",
  borderRadius: "8px"
};

const botMsg = {
  textAlign: "left",
  background: "#e2e8f0",
  margin: "5px",
  padding: "6px",
  borderRadius: "8px"
};
const chatHeader = {
  padding: "12px",
  background: "#1e293b",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "55px"
};

const avatar = {
  height: "100%",
  aspectRatio: "1/1",
  objectFit: "cover",
  borderRadius: "50%",
  border: "2px solid #3b82f6",
  boxShadow: "0 0 8px rgba(59,130,246,0.8)",
  cursor: "pointer",
  transition: "0.3s"
};


export default Chatbot;