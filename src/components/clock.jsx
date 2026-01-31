/* eslint-disable no-unused-vars */
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlipDigit = memo(({ digit }) => (
  <div className="digit-container">
    <div className="digit">{digit}</div>
  </div>
));

export default function AnimatedClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const rawHours = time.getHours();
  const hours = String(rawHours % 12 || 12).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const ampm = rawHours >= 12 ? "PM" : "AM";

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const date = time.getDate();
  const year = time.getFullYear();

  return (
    <div className="clock-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Rajdhani:wght@300;500&display=swap');
        
        :root {
          --neon-cyan: #00ffff;
          --neon-pink: #ff00ff;
          --neon-blue: #00d4ff;
          --dark-bg: #0a0a0f;
          --grid-color: rgba(0, 255, 255, 0.1);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .clock-wrapper {
          min-height: 100vh;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Rajdhani', sans-serif;
          position: relative;
          overflow: hidden;
          perspective: 1000px;
        }
        
        .clock-wrapper{
        width: 50%;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(2deg); }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px var(--neon-cyan)) 
                    drop-shadow(0 0 40px var(--neon-cyan));
          }
          50% { 
            filter: drop-shadow(0 0 30px var(--neon-cyan)) 
                    drop-shadow(0 0 60px var(--neon-blue));
          }
        }
        
        @keyframes chromatic {
          0%, 100% {
            text-shadow: 
              -2px 0 0 rgba(255, 0, 255, 0.5),
              2px 0 0 rgba(0, 255, 255, 0.5);
          }
          50% {
            text-shadow: 
              -3px 0 0 rgba(255, 0, 255, 0.7),
              3px 0 0 rgba(0, 255, 255, 0.7);
          }
        }
        
        .clock-container {
        padding: 40px;
          text-align: center;
          animation: float 6s ease-in-out infinite;
          position: relative;
          z-index: -1;
        }
        
        .time-display {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          margin-bottom: 30px;
          position: relative;
        }

        .time-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .time-segment {
          display: flex;
          gap: 4px;
          position: relative;
        }
        
        .digit-container {
          perspective: 1000px;
          width: 65px;
          height: 90px;
          position: relative;
        }
        
        .digit {
          font-family: 'Orbitron', monospace;
          font-size: 80px;
          font-weight: 900;
          background: linear-gradient(180deg, var(--neon-cyan) 0%, var(--neon-blue) 50%, var(--neon-pink) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 3s ease-in-out infinite, chromatic 4s ease-in-out infinite;
          line-height: 1;
          transform-style: preserve-3d;
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .separator {
          font-family: 'Orbitron', monospace;
          font-size: 60px;
          color: var(--neon-cyan);
          text-shadow: 
            0 0 20px var(--neon-cyan),
            0 0 40px var(--neon-cyan),
            0 0 60px var(--neon-blue);
          animation: pulse 2s ease-in-out infinite;
          align-self: center;
          margin-top: -15px;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        
        .date-display {
          font-family: 'Rajdhani', sans-serif;
          font-size: 40px;
          font-weight: 300;
          color: var(--neon-cyan);
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 15px;
          text-shadow: 
            0 0 10px var(--neon-cyan),
            0 0 20px var(--neon-cyan);
          opacity: 0.9;
        }
        
        .day-display {
          font-family: 'Rajdhani', sans-serif;
          font-size: 60px;
          font-weight: 500;
          background: linear-gradient(90deg, var(--neon-pink) 0%, var(--neon-cyan) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 6px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          margin-bottom: 20px;
        }
        
        .label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(0, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 8px;
        }
        
        .ampm {
          font-family: 'Orbitron', monospace;
          font-size: 32px;
          font-weight: 900;
          color: var(--neon-pink);
          text-shadow: 
            0 0 20px var(--neon-pink),
            0 0 40px var(--neon-pink);
          align-self: center;
          margin-left: 15px;
          margin-top: -15px;
        }
        
        .decorative-line {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--neon-cyan) 20%, 
            var(--neon-pink) 50%, 
            var(--neon-cyan) 80%, 
            transparent 100%);
          margin: 30px auto;
          width: 400px;
          box-shadow: 0 0 20px var(--neon-cyan);
          animation: lineGlow 3s ease-in-out infinite;
        }
        
        @keyframes lineGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .corner-decoration {
          position: absolute;
          width: 100px;
          height: 100px;
          pointer-events: none;
        }
        
        .corner-decoration::before,
        .corner-decoration::after {
          content: '';
          position: absolute;
          background: var(--neon-cyan);
          box-shadow: 0 0 10px var(--neon-cyan);
        }
        
        .corner-decoration.top-left {
          top: 40px;
          left: 40px;
        }
        
        .corner-decoration.top-left::before {
          width: 40px;
          height: 2px;
          top: 0;
          left: 0;
        }
        
        .corner-decoration.top-left::after {
          width: 2px;
          height: 40px;
          top: 0;
          left: 0;
        }
        
        .corner-decoration.top-right {
          top: 40px;
          right: 40px;
        }
        
        .corner-decoration.top-right::before {
          width: 40px;
          height: 2px;
          top: 0;
          right: 0;
        }
        
        .corner-decoration.top-right::after {
          width: 2px;
          height: 40px;
          top: 0;
          right: 0;
        }
        
        .corner-decoration.bottom-left {
          bottom: 40px;
          left: 40px;
        }
        
        .corner-decoration.bottom-left::before {
          width: 40px;
          height: 2px;
          bottom: 0;
          left: 0;
        }
        
        .corner-decoration.bottom-left::after {
          width: 2px;
          height: 40px;
          bottom: 0;
          left: 0;
        }
        
        .corner-decoration.bottom-right {
          bottom: 40px;
          right: 40px;
        }
        
        .corner-decoration.bottom-right::before {
          width: 40px;
          height: 2px;
          bottom: 0;
          right: 0;
        }
        
        .corner-decoration.bottom-right::after {
          width: 2px;
          height: 40px;
          bottom: 0;
          right: 0;
        }
        
        @media (max-width: 768px) {
          .digit-container {
            width: 70px;
            height: 100px;
          }
          
          .digit {
            font-size: 80px;
          }
          
          .separator {
            font-size: 60px;
          }
          
          .date-display {
            font-size: 20px;
            letter-spacing: 4px;
          }
          
          .day-display {
            font-size: 40px;
            letter-spacing: 6px;
          }
          
          .decorative-line {
            width: 300px;
          }
        }
      `}</style>

      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>

      <div className="clock-container">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="day-display"
        >
          {dayName}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="time-display"
        >
          <div className="time-section">
            <div className="label">Hours</div>
            <div className="time-segment">
              <FlipDigit digit={hours[0]} />
              <FlipDigit digit={hours[1]} />
            </div>
          </div>

          <div className="separator">:</div>

          <div className="time-section">
            <div className="label">Minutes</div>
            <div className="time-segment">
              <FlipDigit digit={minutes[0]} />
              <FlipDigit digit={minutes[1]} />
            </div>
          </div>

          <div className="separator">:</div>

          <div className="time-section">
            <div className="label">Seconds</div>
          <div className="time-segment">
            <FlipDigit digit={seconds[0]} />
            <FlipDigit digit={seconds[1]} />
          </div>
          </div>

          <div className="ampm">{ampm}</div>
        </motion.div>

        <div className="decorative-line"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="date-display"
        >
          {monthName} {date}, {year}
        </motion.div>
      </div>
    </div>
  );
}
