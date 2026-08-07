import { useState } from 'react';
import axios from 'axios';
import VoiceOrb from './VoiceOrb';

function VoiceAssistant() {
  const [status, setStatus] = useState('idle');
  const [speech, setSpeech] = useState('');
  const [reply, setReply] = useState('');

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setStatus('idle');
  };

  const startListening = () => {
    if (status !== 'idle') return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    speechSynthesis.cancel();

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setStatus('listening');
      setSpeech('');
      setReply('');
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      setSpeech(text);
      setStatus('thinking');

      try {
        const res = await axios.post(
          'http://localhost:5001/api/ai/chat',
          { prompt: text }
        );

        const aiReply = res.data.reply || 'No response';

        setReply(aiReply);

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(aiReply);

        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setStatus('speaking');
        utterance.onend = () => setStatus('idle');
        utterance.onerror = () => setStatus('idle');

        speechSynthesis.speak(utterance);

      } catch (err) {
        console.error(err);
        setReply('❌ Unable to connect to Ollama AI.');
        setStatus('idle');
      }
    };

    recognition.onerror = () => {
      setStatus('idle');
    };

    recognition.onend = () => {
      if (status === 'listening') setStatus('idle');
    };

    recognition.start();
  };

  return (
    <div className="mt-12 flex justify-center">

      <div className="relative w-full max-w-5xl rounded-[36px] border border-green-500/20 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_55%)]"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="relative px-8 pt-10 pb-8 text-center border-b border-green-500/10">

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium shadow-lg">
            <span className="text-lg">🌿</span>
            <span>Premium AI Wellness Assistant</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            AyurVeda Voice AI
          </h1>

          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Speak naturally and receive personalized Ayurvedic wellness guidance powered by AI.
          </p>

          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400 flex-wrap">

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Real-time Voice
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Ollama AI
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Ayurvedic Guidance
            </div>

          </div>

        </div>

        <div className="relative px-8 py-10">

          <div
            className="flex justify-center cursor-pointer select-none"
            onClick={startListening}
          >
            <VoiceOrb status={status} />
          </div>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">

            <button
              onClick={startListening}
              disabled={status !== 'idle'}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-lg transition-all duration-200 hover:scale-105"
            >
              🎤 Start Speaking
            </button>

            <button
              onClick={stopSpeaking}
              className="px-6 py-3 rounded-2xl bg-red-500/90 hover:bg-red-500 text-white font-semibold border border-red-400/20 shadow-lg transition-all duration-200 hover:scale-105"
            >
              🛑 Stop Speaking
            </button>

          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">

            <button
              onClick={() => setSpeech('Suggest a Kapha breakfast')}
              className="px-3 py-2 rounded-xl bg-gray-800 border border-green-500/20 text-green-300 hover:bg-gray-700 transition"
            >
              Kapha Breakfast
            </button>

            <button
              onClick={() => setSpeech('Diet for weight gain')}
              className="px-3 py-2 rounded-xl bg-gray-800 border border-green-500/20 text-green-300 hover:bg-gray-700 transition"
            >
              Weight Gain
            </button>

            <button
              onClick={() => setSpeech('Yoga for stress relief')}
              className="px-3 py-2 rounded-xl bg-gray-800 border border-green-500/20 text-green-300 hover:bg-gray-700 transition"
            >
              Stress Relief
            </button>

          </div>

        </div>

        {(speech || reply) && (
          <div className="relative px-8 pb-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-6 shadow-xl">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl">
                  🗣
                </div>

                <div>

                  <h2 className="text-xl font-bold text-white">
                    You Said
                  </h2>

                  <p className="text-sm text-gray-400">
                    Captured from microphone
                  </p>

                </div>

              </div>

              <p className="text-gray-200 leading-8 min-h-[120px]">
                {speech || 'Start speaking to see your message here.'}
              </p>

            </div>

            <div className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent backdrop-blur-md p-6 shadow-xl">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl">
                  🤖
                </div>

                <div>

                  <h2 className="text-xl font-bold text-green-300">
                    AyurVeda AI
                  </h2>

                  <p className="text-sm text-green-200/70">
                    AI-generated response
                  </p>

                </div>

              </div>

              <p className="whitespace-pre-wrap leading-8 text-gray-100 min-h-[120px]">
                {reply || 'AI response will appear here after you speak.'}
              </p>

            </div>

          </div>
        )}

        <div className="relative border-t border-green-500/10 bg-black/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Voice assistant ready
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">

            <span>🎙 Web Speech API</span>
            <span>🤖 Ollama LLM</span>
            <span>🌿 AyurVeda AI</span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VoiceAssistant;