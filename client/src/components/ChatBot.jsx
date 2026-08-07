import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;

      if (index === text.length) clearInterval(interval);
    }, 12);

    return () => clearInterval(interval);
  }, [text]);

  return <p className="whitespace-pre-wrap leading-7 text-base">{displayed}</p>;
}

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hello! I'm AyurVeda AI. Ask me anything about Ayurveda, BMI, Doshas, nutrition, or healthy living.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5001/api/ai/chat',
        { prompt: input }
      );

      const botMessage = {
        role: 'bot',
        text: res.data.reply || 'No response from AI.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: '❌ Unable to connect to AI server.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900/80 border border-green-500/20 rounded-[32px] shadow-2xl overflow-hidden">

      <div className="p-6 border-b border-green-500/10 bg-black/20">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl">
            🤖
          </div>

          <div>

            <h2 className="text-2xl font-bold text-green-300">
              AyurVeda AI Chat
            </h2>

            <p className="text-sm text-gray-400">
              Ask health, Ayurveda, nutrition, and wellness questions
            </p>

          </div>

        </div>

      </div>

      <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-900/60 to-black/20">

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >

            <div
              className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white rounded-br-md'
                  : 'bg-gray-800 border border-green-500/10 text-gray-100 rounded-bl-md'
              }`}
            >

              {msg.role === 'bot' ? (
                <TypingText text={msg.text} />
              ) : (
                <p className="whitespace-pre-wrap leading-7 text-base">
                  {msg.text}
                </p>
              )}

            </div>

          </div>
        ))}

        {loading && (
          <div className="flex justify-start">

            <div className="bg-gray-800 border border-green-500/10 rounded-3xl rounded-bl-md px-5 py-4 text-gray-300 shadow-lg">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:120ms]"></span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:240ms]"></span>
                <span className="ml-2 text-sm">AyurVeda AI is thinking...</span>

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <div className="p-5 border-t border-green-500/10 bg-black/20">

        <div className="flex gap-3">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about Ayurveda, BMI, diet, yoga..."
            className="flex-1 bg-gray-800 border border-green-500/20 text-white placeholder-gray-400 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatBot;