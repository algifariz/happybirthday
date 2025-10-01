import React, { useState, useEffect, useRef } from 'react';
import './BirthdayChat.css';

// --- PLACEHOLDER DATA ---
const SENDER_NAME = "My Love";
const BIRTHDAY_PERSON_NAME = "Sarah";
const AVATAR_PLACEHOLDER = `https://ui-avatars.com/api/?name=${SENDER_NAME.replace(' ', '+')}&background=random`;

const initialMessages = [
  { id: 1, text: `Hai ${BIRTHDAY_PERSON_NAME}! 👋`, sender: 'other', time: '10:00' },
  { id: 2, text: "Aku ada kejutan buat kamu...", sender: 'other', time: '10:01' },
  { id: 3, text: "Coba liat deh 👇", sender: 'other', time: '10:01' },
];

const mainMessage = `Selamat ulang tahun ya, Sayang! 🎉

Semoga di usiamu yang baru ini, kamu selalu diberikan kebahagiaan, kesehatan, dan semua yang terbaik. Terima kasih sudah menjadi orang yang luar biasa di hidupku.

Aku sayang kamu! ❤️`;

const photoGallery = [
  '/assets/foto_1.jpg',
  '/assets/foto_2.jpg',
  '/assets/foto_3.jpg',
];

const musicSrc = '/assets/lagu_ultah.mp3';

// --- SUB-COMPONENTS ---

const MessageBubble = ({ message, isTyping }) => (
  <div className={`message ${message.sender === 'me' ? 'outgoing' : 'incoming'}`}>
    <div className="message-bubble">
      <div className="message-content">
        {isTyping ? (
          <div className="typing-indicator"><span></span><span></span><span></span></div>
        ) : (
          message.text
        )}
      </div>
      <div className="message-time">{message.time}</div>
    </div>
  </div>
);

const Gallery = () => (
  <div className="message outgoing">
    <div className="message-bubble">
      <div className="gallery-container">
        <div className="gallery-grid">
          {photoGallery.map((photo, index) => (
            <img key={index} src={photo} alt={`Gallery photo ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="message-time">10:02</div>
    </div>
  </div>
);

const SurpriseScreen = ({ onStart }) => (
  <div className="surprise-container" onClick={onStart}>
    <div className="surprise-box">
      <h2>🎁 Kejutan Spesial Untukmu!</h2>
      <p>Klik untuk membuka</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const BirthdayChat = () => {
  const [showSurprise, setShowSurprise] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMainMessage, setShowMainMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, showGallery]);

  const startExperience = () => {
    setShowSurprise(false);

    // Start playing music
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio autoplay was blocked.", e));
      audioRef.current.loop = true;
      setIsPlaying(true);
    }

    // Show initial messages with a delay
    let delay = 500;
    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (index === initialMessages.length - 1) {
          // Start typing the main message after the last initial message
          setTimeout(() => {
            setShowMainMessage(true);
            setIsTyping(true);
          }, 1000);
        }
      }, delay);
      delay += 1500; // Stagger message appearance
    });
  };

  useEffect(() => {
    if (isTyping) {
      if (typedMessage.length < mainMessage.length) {
        const timeoutId = setTimeout(() => {
          setTypedMessage(mainMessage.slice(0, typedMessage.length + 1));
        }, 50); // Typing speed
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
        // After typing is complete, show the gallery
        setTimeout(() => {
          setShowGallery(true);
        }, 1000);
      }
    }
  }, [isTyping, typedMessage]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="birthday-chat-container">
      {showSurprise && <SurpriseScreen onStart={startExperience} />}

      <audio ref={audioRef} src={musicSrc} preload="auto" />

      <div className="chat-header">
        <img src={AVATAR_PLACEHOLDER} alt="Avatar" className="avatar" />
        <div className="chat-info">
          <div className="name">{SENDER_NAME}</div>
          <div className="status">{isTyping ? 'mengetik...' : 'online'}</div>
        </div>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {showMainMessage && (
          <div className="message outgoing">
            <div className="message-bubble">
              <div className="message-content">{typedMessage}</div>
              <div className="message-time">10:02</div>
            </div>
          </div>
        )}
        {isTyping && (
           <div className="message incoming">
             <div className="message-bubble">
                <div className="typing-indicator"><span></span><span></span><span></span></div>
             </div>
           </div>
        )}
        {showGallery && <Gallery />}
      </div>

      <div className="audio-controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
};

export default BirthdayChat;