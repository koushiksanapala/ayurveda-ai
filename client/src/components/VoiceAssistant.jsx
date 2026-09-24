import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setReply('');
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);

      await askAI(text);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const askAI = async (prompt) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          prompt: `You are AyurVeda AI.

Answer the user's question clearly and practically.

User question:
${prompt}

Structure your response with:
## Quick Answer
## Ayurvedic View
## Practical Tips
## Important Note

Keep it concise and easy to read. Avoid huge tables unless absolutely necessary.`,
        }
      );

      setReply(
        response.data?.reply ||
          'Sorry, I could not generate a response right now.'
      );
    } catch (error) {
      console.error('Voice AI error:', error);
      setReply(
        '⚠️ I could not connect to the AI service right now. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const useSuggestion = (text) => {
    setTranscript(text);
    askAI(text);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">

      {/* VOICE CARD */}
      <div className="overflow-hidden rounded-[28px] border border-green-500/20 bg-gray-950 shadow-2xl">

        {/* HEADER */}
        <div className="border-b border-green-500/10 bg-gradient-to-r from-green-500/10 via-gray-950 to-gray-950 px-6 py-6 sm:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10 text-3xl">
              🎙️
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                AyurVeda Voice AI
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Speak naturally and get personalized wellness guidance.
              </p>
            </div>

          </div>

        </div>

        {/* VOICE AREA */}
        <div className="px-5 py-8 sm:px-8">

          {/* ORB */}
          <div className="flex justify-center">

            <div
              className={`flex h-32 w-32 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                isListening
                  ? 'scale-110 border-red-400 bg-red-500/20 shadow-[0_0_70px_rgba(248,113,113,0.35)]'
                  : 'border-green-400/40 bg-green-500/10 shadow-[0_0_50px_rgba(34,197,94,0.15)]'
              }`}
            >
              <div className="text-5xl">
                {isListening ? '🔴' : '🌿'}
              </div>
            </div>

          </div>

          <div className="mt-5 text-center">

            <h3 className="text-lg font-semibold text-white">
              {isListening
                ? 'Listening...'
                : loading
                ? 'AyurVeda AI is thinking...'
                : 'Tap the orb and speak'}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {isListening
                ? 'Speak clearly. I’m listening.'
                : 'Ask about Ayurveda, diet, weight gain, stress, sleep and more.'}
            </p>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <button
              onClick={startListening}
              disabled={isListening || loading}
              className="rounded-xl bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              🎙️ Start Speaking
            </button>

            <button
              onClick={stopListening}
              disabled={!isListening}
              className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏹ Stop
            </button>

          </div>

          {/* SUGGESTIONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">

            {[
              'What should I eat for weight gain?',
              'What is a good Kapha breakfast?',
              'How can I reduce stress naturally?',
            ].map((item) => (
              <button
                key={item}
                onClick={() => useSuggestion(item)}
                disabled={loading}
                className="rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-xs text-green-300 transition hover:bg-green-500/10 disabled:opacity-40"
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* STATUS */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-green-500/10 bg-gray-900/60 px-5 py-4 text-xs text-gray-500 sm:px-8">

          <span className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isListening
                  ? 'animate-pulse bg-red-400'
                  : 'bg-green-400'
              }`}
            />
            {isListening ? 'Listening' : 'Voice assistant ready'}
          </span>

          <span>
            🎙️ Speech Recognition&nbsp;&nbsp; • &nbsp;&nbsp;🤖 Groq AI&nbsp;&nbsp; • &nbsp;&nbsp;🌿 AyurVeda AI
          </span>

        </div>

      </div>

      {/* TRANSCRIPT */}
      {transcript && (
        <div className="rounded-2xl border border-blue-500/20 bg-gray-950 p-5 shadow-xl sm:p-6">

          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🗣️</span>

            <h3 className="font-semibold text-white">
              You said
            </h3>
          </div>

          <p className="rounded-xl bg-gray-900 p-4 text-sm leading-7 text-gray-300">
            {transcript}
          </p>

        </div>
      )}

      {/* AI RESPONSE */}
      {(loading || reply) && (
        <div className="rounded-[24px] border border-green-500/20 bg-gray-950 shadow-xl">

          <div className="border-b border-green-500/10 bg-gradient-to-r from-green-500/10 to-transparent px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                🌿
              </div>

              <div>
                <h3 className="font-bold text-white">
                  AyurVeda AI
                </h3>

                <p className="text-xs text-gray-500">
                  Wellness guidance
                </p>
              </div>

            </div>

          </div>

          <div className="p-5 sm:p-7">

            {loading ? (
              <div className="flex items-center gap-3 py-8 text-gray-400">

                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:240ms]" />
                </div>

                <span>
                  Preparing your Ayurvedic guidance...
                </span>

              </div>
            ) : (
              <div className="text-[15px] leading-7 text-gray-200">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <div className="mb-3 mt-6 first:mt-0">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-green-300">
                          <span>✦</span>
                          {children}
                        </h2>
                      </div>
                    ),

                    h3: ({ children }) => (
                      <h3 className="mb-2 mt-5 font-bold text-green-200">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="mb-3">{children}</p>
                    ),

                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-2 pl-6">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="mb-4 list-decimal space-y-2 pl-6">
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

                    blockquote: ({ children }) => (
                      <blockquote className="my-4 rounded-xl border-l-4 border-green-500 bg-green-500/5 px-4 py-3 text-gray-300">
                        {children}
                      </blockquote>
                    ),

                    table: ({ children }) => (
                      <div className="my-5 overflow-x-auto rounded-xl border border-green-500/20">
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

                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left font-semibold">
                        {children}
                      </th>
                    ),

                    td: ({ children }) => (
                      <td className="border-t border-green-500/10 px-4 py-3 text-gray-300">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {reply}
                </ReactMarkdown>

              </div>
            )}

          </div>

          {/* DISCLAIMER */}
          {!loading && reply && (
            <div className="border-t border-green-500/10 px-5 py-4 text-xs leading-5 text-gray-600 sm:px-7">
              🌿 AyurVeda AI provides general wellness information and does not replace professional medical advice.
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default VoiceAssistant;