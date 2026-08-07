import ChatBot from "../components/ChatBot";

function AIChat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center p-8">

      <div className="w-full max-w-5xl">

        <h1 className="text-5xl font-bold text-center text-green-700 mb-4">
          🤖 AyurVeda AI
        </h1>

        <p className="text-center text-gray-600 mb-10 text-lg">
          Ask questions about Ayurveda, Doshas, BMI, nutrition and healthy living.
        </p>

        <ChatBot />

      </div>

    </div>
  );
}

export default AIChat;