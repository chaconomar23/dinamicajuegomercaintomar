import { ReactNode } from 'react';
import { motion } from 'motion/react';

export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`min-h-screen w-full bg-slate-900 text-slate-100 font-sans flex flex-col p-8 ${className}`}
    >
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}: { 
  children: ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'; 
  className?: string;
  disabled?: boolean;
}) {
  const baseStyle = "px-8 py-4 text-2xl font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400/30",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600",
    accent: "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    outline: "bg-transparent border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl ${className}`}>
      {children}
    </div>
  );
}
