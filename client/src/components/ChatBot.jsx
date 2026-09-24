import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AIMessage({ text }) {
  return (
    <div className="text-[15px] leading-7 text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-1 text-xl font-bold text-green-300">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-5 text-lg font-bold text-green-300">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-bold text-green-200">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 last:mb-0">{children}</p>
          ),

          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1 pl-6">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1 pl-6">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),

          strong: ({ children }) => (
            <strong className="font-bold text-green-200">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="text-gray-300">{children}</em>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-green-500/50 pl-4 italic text-gray-300">
              {children}
            </blockquote>
          ),

          code: ({ children }) => (
            <code className="rounded-md bg-black/30 px-1.5 py-0.5 text-sm text-green-300">
              {children}
            </code>
          ),

          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-green-500/20">
              <table className="w-full min-w-[500px] text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-green-500/10 text-green-200">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody className="divide-y divide-green-500/10">
              {children}
            </tbody>
          ),

          tr: ({ children }) => (
            <tr className="transition hover:bg-green-500/5">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-4 py-3 align-top text-gray-300">
              {children}
            </td>
          ),

          hr: () => (
            <hr className="my-5 border-green-500/10" />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text:
        "👋 Hello! I'm AyurVeda AI. Ask me anything about Ayurveda, BMI, Doshas, nutrition, or healthy living.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const prompt = input.trim();

    if (!prompt || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: prompt,
      },
    ]);

    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          prompt,
        }
      );

      const reply =
        response.data?.reply ||
        'Sorry, I could not generate a response right now.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: reply,
        },
      ]);
    } catch (error) {
      console.error('ChatBot error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text:
            '⚠️ I could not connect to the AI service right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-green-500/20 bg-gray-950 shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 border-b border-green-500/10 bg-gradient-to-r from-green-500/10 via-gray-950 to-gray-950 px-5 py-5 sm:px-7">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10 text-2xl shadow-lg">
            🤖
          </div>

          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              AyurVeda AI
            </h2>

            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
              <span>AI Wellness Assistant</span>
            </div>
          </div>

        </div>

        <div className="hidden rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1.5 text-xs text-green-300 sm:block">
          Ayurveda • Nutrition • Wellness
        </div>

      </div>

      {/* CHAT AREA */}
      <div className="h-[560px] overflow-y-auto bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-4 py-6 sm:px-7">

        <div className="mx-auto max-w-4xl space-y-6">

          {messages.map((message, index) => {
            const isUser = message.role === 'user';

            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >

                {/* BOT ICON */}
                {!isUser && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-lg">
                    🌿
                  </div>
                )}

                {/* MESSAGE */}
                <div
                  className={`max-w-[92%] rounded-2xl px-4 py-4 shadow-lg sm:max-w-[82%] ${
                    isUser
                      ? 'rounded-br-md bg-gradient-to-br from-green-500 to-green-700 text-white'
                      : 'rounded-bl-md border border-green-500/10 bg-gray-800/90'
                  }`}
                >

                  {isUser ? (
                    <p className="whitespace-pre-wrap text-[15px] leading-7">
                      {message.text}
                    </p>
                  ) : (
                    <AIMessage text={message.text} />
                  )}

                </div>

              </div>
            );
          })}

          {/* THINKING */}
          {loading && (
            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-lg">
                🌿
              </div>

              <div className="rounded-2xl rounded-bl-md border border-green-500/10 bg-gray-800 px-5 py-4">

                <div className="flex items-center gap-3">

                  <span className="text-sm text-gray-400">
                    AyurVeda AI is thinking
                  </span>

                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-400 [animation-delay:240ms]" />
                  </div>

                </div>

              </div>

            </div>
          )}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* INPUT */}
      <div className="border-t border-green-500/10 bg-gray-950 p-4 sm:p-5">

        <div className="mx-auto flex max-w-4xl gap-2 rounded-2xl border border-green-500/20 bg-gray-900 p-2 shadow-inner">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder="Ask about Ayurveda, diet, BMI, Doshas..."
            disabled={loading}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-50 sm:text-base"
          />

          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-lg text-white shadow-lg transition hover:scale-105 hover:from-green-400 hover:to-green-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            ➤
          </button>

        </div>

        <p className="mt-2 text-center text-[11px] text-gray-600">
          AyurVeda AI provides wellness information and does not replace professional medical advice.
        </p>

      </div>

    </div>
  );
}

export default ChatBot;