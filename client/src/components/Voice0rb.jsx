import { motion } from 'framer-motion';

function VoiceOrb({ status }) {
  const getStatusText = () => {
    switch (status) {
      case 'listening':
        return '🎤 Listening...';
      case 'thinking':
        return '🧠 Thinking...';
      case 'speaking':
        return '🔊 Speaking...';
      default:
        return '✨ Tap the Orb';
    }
  };

  return (
    <div className="flex flex-col items-center">

      <motion.div
        animate={
          status === 'listening'
            ? {
                scale: [1, 1.15, 1],
                boxShadow: [
                  '0 0 0px rgba(34,197,94,0.3)',
                  '0 0 70px rgba(34,197,94,1)',
                  '0 0 0px rgba(34,197,94,0.3)',
                ],
              }
            : status === 'thinking'
            ? { rotate: 360 }
            : status === 'speaking'
            ? { scale: [1, 1.08, 1] }
            : {}
        }
        transition={{ duration: 1, repeat: Infinity }}
        className="relative cursor-pointer"
      >

        <div className="absolute inset-0 rounded-full bg-green-400 blur-3xl opacity-50"></div>

        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-green-400 via-green-600 to-green-900 flex items-center justify-center text-6xl text-white shadow-2xl">
          🎤
        </div>

      </motion.div>

      <h2 className="mt-8 text-2xl font-bold text-green-700">
        {getStatusText()}
      </h2>

      {status === 'thinking' && (

        <div className="flex gap-3 mt-5">

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-4 h-4 rounded-full bg-green-600"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
            className="w-4 h-4 rounded-full bg-green-600"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
            className="w-4 h-4 rounded-full bg-green-600"
          />

        </div>

      )}

    </div>
  );
}

export default VoiceOrb;