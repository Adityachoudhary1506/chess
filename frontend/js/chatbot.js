
/**
 * AI Chatbot Logic using Gemini API
 */

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // ⚠️ REPLACE WITH YOUR ACTUAL API KEY
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    // Toggle Chat
    chatToggle.addEventListener('click', () => {
        if (chatWindow.style.display === 'flex') {
            chatWindow.style.display = 'none';
            chatToggle.innerHTML = '<span class="material-icons-round">smart_toy</span>';
        } else {
            chatWindow.style.display = 'flex';
            chatToggle.innerHTML = '<span class="material-icons-round">close</span>';
            if (messagesContainer.children.length === 0) {
                addMessage("bot", "Hello! I'm your AI assistant. How can I help you with Kriyeta today?");
            }
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatToggle.innerHTML = '<span class="material-icons-round">smart_toy</span>';
    });

    // Send Message
    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage("user", text);
        chatInput.value = '';

        // Show Typing Indicator
        const typingId = addTypingIndicator();

        try {
            const reply = await callGemini(text);
            removeTypingIndicator(typingId);
            addMessage("bot", reply);
        } catch (error) {
            removeTypingIndicator(typingId);
            addMessage("error", "Sorry, I couldn't reach the AI server. Check your API Key.");
            console.error("Gemini API Error:", error);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Helper: Add Message to UI
    function addMessage(sender, text) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;

        // Simple markdown parsing for bold text
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        div.innerHTML = formattedText;

        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    // Helper: Typing Indicator
    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = id;
        div.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(div);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Gemini API Call
    async function callGemini(prompt) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
            return "Please configure your Gemini API Key in `js/chatbot.js` to enable AI features.";
        }

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return reply || "I didn't understand that.";
    }
});
