import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WhatsAppChat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async (content) => {
    try {
      const response = await axios.post('https://api.green-api.com/wa/send_message', {
        phone: '9986572600',
        message: content,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get('https://api.green-api.com/wa/messages', {
        params: {
          phone: '9986572600',
        },
      });
      setChat(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        content: message,
        sender: 'user',
      };
      setChat([...chat, newMessage]);
      sendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <h1>WhatsApp Chat</h1>
      <div className="chat-window">
        {chat.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default WhatsAppChat;