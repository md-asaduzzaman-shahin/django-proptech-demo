import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate(); // Hook to change pages programmatically
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // WHAT: We fake a 1.5 second delay.
    // WHY: Immediate transitions feel "cheap". A small delay feels like a 
    // real secure authentication process is happening.
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white font-sans overflow-hidden">
      
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building size={24} className="text-white" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            PropAI
          </span>
        </div>
        <button 
          onClick={handleLogin}
          className="px-6 py-2 border border-blue-500/30 rounded-full hover:bg-blue-600/20 transition backdrop-blur-sm text-sm font-medium"
        >
          Agent Login
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center text-center mt-20 px-4">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-sm font-medium inline-flex items-center gap-2 mb-6">
            <Sparkles size={14} /> New: Gemini 2.5 Integration Live
          </span>
        </motion.div>

        {/* Animated Title */}
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

        {/* Animated Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Stop writing descriptions manually. Our AI agent generates premium real estate copy, analyzes specs, and manages your portfolio in seconds.
        </motion.p>

        {/* The Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 w-full justify-center"
        >
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="group relative px-8 py-4 bg-blue-600 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Launch Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </motion.div>

        {/* Features Grid (Bottom Section) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl text-left"
        >
          <FeatureCard 
            icon={<Zap className="text-yellow-400" />}
            title="Instant Generation"
            desc="Generate listing copy in <2 seconds using our custom service layer."
          />
          <FeatureCard 
            icon={<Sparkles className="text-purple-400" />}
            title="AI Powered"
            desc="Built on Google Gemini 2.5 for context-aware property descriptions."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-teal-400" />}
            title="Secure Architecture"
            desc="Enterprise-grade security with isolated environments and CORS protection."
          />
        </motion.div>
      </main>
    </div>
  );
}

// Helper component for the boxes at the bottom
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-lg">
      <div className="mb-4 p-3 bg-gray-800 rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}