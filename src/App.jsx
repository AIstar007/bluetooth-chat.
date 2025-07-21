import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import BluetoothConnector from './components/BluetoothConnector';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState(() => () => {});
  const [isEncrypted, setIsEncrypted] = useState(true);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🔗 Bluetooth Chat</h1>

        <BluetoothConnector
          addMessage={addMessage}
          setSendMessage={setSendMessage}
          isEncrypted={isEncrypted}
        />

        <div className="my-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isEncrypted}
              onChange={() => setIsEncrypted((prev) => !prev)}
              className="form-checkbox text-green-500"
            />
            <span className="ml-2">Enable AES Encryption</span>
          </label>
        </div>

        <ChatWindow
          messages={messages}
          sendMessage={sendMessage}
          isEncrypted={isEncrypted}
          addMessage={addMessage}
        />
      </div>
    </div>
  );
}
