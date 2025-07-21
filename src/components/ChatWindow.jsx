import React, { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ messages, sendMessage, isEncrypted, addMessage }) {
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    addMessage('You', input + (isEncrypted ? ' 🔐' : ''));
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div
        ref={chatRef}
        className="bg-gray-700 h-64 overflow-y-auto rounded p-2 mb-4 border border-gray-600"
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-grow px-3 py-2 rounded-l bg-gray-600 text-white focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}