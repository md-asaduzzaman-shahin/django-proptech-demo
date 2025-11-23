import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  // THE SMART LOGIC:
  // We don't auto-redirect on page load anymore.
  // We only check credentials when the user explicitly clicks a button.
  const handleSmartNavigation = () => {
    const isLoggedIn = localStorage.getItem('proptech_auth');
    
    if (isLoggedIn === 'true') {
      // If remembered, go straight to Dashboard
      navigate('/dashboard');
    } else {
      // If not, go to Login Screen to get credentials
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building size={24} className="text-white" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            PropAI
          </span>
        </div>
        
        {/* Top Right Button - Uses Smart Logic */}
        <button 
          onClick={handleSmartNavigation}
          className="px-6 py-2 border border-blue-500/30 rounded-full hover:bg-blue-600/20 transition backdrop-blur-sm text-sm font-medium"
        >
          Agent Sign In
        </button>
      </nav>

      {/* Main Hero Section - Centered */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 z-0 mt-10">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-sm font-medium inline-flex items-center gap-2 mb-8">
            <Sparkles size={14} /> New: Gemini 2.5 Integration Live
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
        >
          Automate your property <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-300">
            marketing workflow.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Stop writing descriptions manually. Our AI agent generates premium real estate copy, analyzes specs, and manages your portfolio in seconds.
        </motion.p>

        {/* Main Call to Action Button - Uses Smart Logic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 w-full justify-center mb-20"
        >
          <button 
            onClick={handleSmartNavigation}
            className="group relative px-8 py-4 bg-blue-600 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition overflow-hidden"
          >
            <span className="flex items-center justify-center gap-2">
              Launch Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </main>

      {/* Feature Grid Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-12 px-4 w-full text-left"
      >
        <FeatureCard 
          icon={<Zap className="text-yellow-400" />}
          title="Instant Generation"
          desc="Generate listing copy in <2s."
        />
        <FeatureCard 
          icon={<Sparkles className="text-purple-400" />}
          title="AI Powered"
          desc="Google Gemini 2.5 Integrated."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-teal-400" />}
          title="Secure"
          desc="Enterprise-grade security."
        />
      </motion.div>
    </div>
  );
}

// Small helper component for the 3 boxes at the bottom
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gray-800 rounded-lg">{icon}</div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}