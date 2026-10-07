import React, { useState } from 'react';
import { Sliders, Cpu, Activity, Clock, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface LogicAnalyzerViewerProps {
  currentLang: Language;
}

export const LogicAnalyzerViewer: React.FC<LogicAnalyzerViewerProps> = ({ currentLang }) => {
  const [protocol, setProtocol] = useState<'spi' | 'i2c' | 'pwm'>('spi');
  const [timebaseUs, setTimebaseUs] = useState<number>(20);

  return (
    <div className="bg-[#0e1422] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="font-mono text-base font-bold text-white tracking-wide">
              VIRTUAL LOGIC ANALYZER & HARDWARE SIGNALS
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {currentLang === 'de'
              ? 'Signalintegritäts- & Busprotokoll-Verifikation (SPI, I2C, Komplementäres PWM)'
              : 'Signal Integrity & Bus Protocol Timing Verification (SPI, I2C, Complementary PWM)'}
          </p>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setProtocol('spi')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              protocol === 'spi'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SPI BUS (4-WIRE)
          </button>
          <button
            onClick={() => setProtocol('i2c')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              protocol === 'i2c'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            I2C PROTOCOL
          </button>
          <button
            onClick={() => setProtocol('pwm')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              protocol === 'pwm'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PWM WITH DEAD-TIME
          </button>
        </div>
      </div>

      {/* Oscillogram Waveform Screen */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-4">
        {/* Timing Scale Grid Header */}
        <div className="flex justify-between items-center text-slate-500 text-[10px] pb-1 border-b border-slate-800/60">
          <span>TIMEBASE: {timebaseUs} µs / div</span>
          <span>SAMPLE RATE: 100 MSa/s</span>
          <span>TRIGGER: EDGE RISING (CH1)</span>
        </div>

        {/* Waveform Canvas Area */}
        <div className="space-y-4 py-2">
          {protocol === 'spi' && (
            <div className="space-y-3">
              {/* CS# Channel */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-amber-300">
                  <span className="font-bold">CH1: CS# (CHIP SELECT)</span>
                  <span className="text-slate-500">ACTIVE LOW [ASSERTED]</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path d="M 0,6 L 80,6 L 80,26 L 520,26 L 520,6 L 600,6" fill="none" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>

              {/* SCK Channel */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-cyan-300">
                  <span className="font-bold">CH2: SCK (SERIAL CLOCK)</span>
                  <span className="text-slate-500">10 MHz [CPOL=0, CPHA=0]</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,26 L 80,26 L 80,6 L 105,6 L 105,26 L 130,26 L 130,6 L 155,6 L 155,26 L 180,26 L 180,6 L 205,6 L 205,26 L 230,26 L 230,6 L 255,6 L 255,26 L 280,26 L 280,6 L 305,6 L 305,26 L 330,26 L 330,6 L 355,6 L 355,26 L 380,26 L 380,6 L 405,6 L 405,26 L 430,26 L 430,6 L 455,6 L 455,26 L 480,26 L 480,6 L 505,6 L 505,26 L 600,26"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* MOSI Channel */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-emerald-300">
                  <span className="font-bold">CH3: MOSI (COMMAND 0x9F)</span>
                  <span className="text-slate-500">JEDEC ID READ</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,26 L 80,26 L 80,6 L 130,6 L 130,26 L 230,26 L 230,6 L 380,6 L 380,26 L 430,26 L 430,6 L 480,6 L 480,26 L 600,26"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          )}

          {protocol === 'i2c' && (
            <div className="space-y-3">
              {/* SCL */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-amber-300">
                  <span className="font-bold">CH1: SCL (I2C CLOCK 400 kHz)</span>
                  <span className="text-slate-500">FAST-MODE [WITH CLOCK STRETCHING MARGIN]</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,6 L 60,6 L 60,26 L 90,26 L 90,6 L 120,6 L 120,26 L 150,26 L 150,6 L 180,6 L 180,26 L 210,26 L 210,6 L 240,6 L 240,26 L 270,26 L 270,6 L 300,6 L 300,26 L 330,26 L 330,6 L 360,6 L 360,26 L 390,26 L 390,6 L 420,6 L 420,26 L 450,26 L 450,6 L 500,6 L 600,6"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* SDA */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-cyan-300">
                  <span className="font-bold">CH2: SDA (DATA WITH START & ACK)</span>
                  <span className="text-slate-500">SLAVE ADDR: 0x68 (MPU6050) + ACK (LOW)</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,6 L 40,6 L 40,26 L 180,26 L 180,6 L 300,6 L 300,26 L 420,26 L 450,26 L 480,6 L 600,6"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          )}

          {protocol === 'pwm' && (
            <div className="space-y-3">
              {/* High-Side Gate */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-emerald-300">
                  <span className="font-bold">CH1: PWM_HIGH_SIDE (GATE A)</span>
                  <span className="text-slate-500">50 kHz SWITCHING (DUTY = 60%)</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,26 L 40,26 L 40,6 L 200,6 L 200,26 L 300,26 L 340,26 L 340,6 L 500,6 L 500,26 L 600,26"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Low-Side Gate */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-amber-300">
                  <span className="font-bold">CH2: PWM_LOW_SIDE (GATE B)</span>
                  <span className="text-amber-400 font-bold">DEAD-TIME: 250 ns [SHOOT-THROUGH SAFE]</span>
                </div>
                <svg className="w-full h-8" viewBox="0 0 600 32" preserveAspectRatio="none">
                  <path
                    d="M 0,6 L 20,6 L 20,26 L 225,26 L 225,6 L 320,6 L 320,26 L 525,26 L 525,6 L 600,6"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Footer */}
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>
              {protocol === 'spi' && 'SPI Clock phase verified via 4-channel DSO with active 1 GHz probe.'}
              {protocol === 'i2c' && 'Open-drain pull-up rise time tr = 120 ns conforming to I2C standard.'}
              {protocol === 'pwm' && 'Zero cross-conduction shoot-through verified across thermal range -40°C to +125°C.'}
            </span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">PASSED VERIFICATION</span>
        </div>
      </div>
    </div>
  );
};
