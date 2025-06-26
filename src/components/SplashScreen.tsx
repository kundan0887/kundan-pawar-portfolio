'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

// Predefined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { x: 100, y: 150, delay: 0 },
  { x: 300, y: 200, delay: 0.5 },
  { x: 500, y: 100, delay: 1 },
  { x: 200, y: 400, delay: 1.5 },
  { x: 400, y: 300, delay: 2 },
  { x: 600, y: 250, delay: 2.5 },
];

export default function SplashScreen({
  onComplete,
  duration = 2000,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for exit animation
        }, 200);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 z-50 flex items-center justify-center'
        >
          <div className='text-center'>
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='mb-8'
            >
              <div className='w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
                <span className='text-3xl font-bold text-white'>KP</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-4xl font-bold text-white mb-2'
            >
              Kundan Pawar
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-xl text-white/80 mb-8'
            >
              Senior Frontend Developer
            </motion.p>

            {/* Loading Spinner */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='mb-6'
            >
              <LoadingSpinner size='lg' color='white' />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className='h-1 bg-white/30 rounded-full overflow-hidden max-w-xs mx-auto'
            >
              <motion.div
                className='h-full bg-white rounded-full'
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='text-white/60 mt-4 text-sm'
            >
              Loading portfolio...
            </motion.p>

            {/* Animated background elements - Fixed positions to avoid hydration mismatch */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              {PARTICLE_POSITIONS.map((particle, i) => (
                <motion.div
                  key={i}
                  className='absolute w-2 h-2 bg-white/20 rounded-full'
                  initial={{
                    x: particle.x,
                    y: particle.y,
                    scale: 0,
                  }}
                  animate={{
                    x: particle.x + (i % 2 === 0 ? 50 : -50),
                    y: particle.y + (i % 3 === 0 ? 30 : -30),
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Minimal splash screen variant
export function MinimalSplashScreen({
  onComplete,
  duration = 1500,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 bg-slate-900 z-50 flex items-center justify-center'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            <LoadingSpinner size='xl' color='primary' />
            <p className='mt-4 text-slate-400 text-sm'>Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
