import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Send, Radio, Activity, Filter, CheckCircle, Terminal } from 'lucide-react';
import { Language, CANFrame } from '../types';
import { CAN_SIMULATOR_FRAMES } from '../data/portfolioData';

interface CanBusSimulatorProps {
  currentLang: Language;
}

export const CanBusSimulator: React.FC<CanBusSimulatorProps> = ({ currentLang }) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [frames, setFrames] = useState<CANFrame[]>(CAN_SIMULATOR_FRAMES);
  const [selectedFrameId, setSelectedFrameId] = useState<string>("0x180");
  const [injectedMessage, setInjectedMessage] = useState<string | null>(null);
  const [busLoad, setBusLoad] = useState<number>(42);
  const [totalRxCount, setTotalRxCount] = useState<number>(18420);

  // Live simulation ticker
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setFrames((prev) =>
        prev.map((frame) => {
          // Dynamic jitter simulation
          let updatedDecoded = [...frame.decoded];
          let updatedData = [...frame.data];

          if (frame.id === "0x180") {
            const rpm = Math.floor(5800 + Math.random() * 400);
            updatedDecoded = [
              { signal: "Engine RPM", value: rpm, unit: "RPM" },
              { signal: "Throttle Position", value: Math.floor(95 + Math.random() * 5), unit: "%" },
              { signal: "Coolant Temp", value: (87.5 + Math.random() * 1.5).toFixed(1), unit: "°C" },
            ];
            const rpmHex = (rpm & 0xffff).toString(16).padStart(4, '0');
            updatedData[0] = `0x${rpmHex.slice(0, 2).toUpperCase()}`;
            updatedData[1] = `0x${rpmHex.slice(2, 4).toUpperCase()}`;
          } else if (frame.id === "0x2A4") {
            const current = (23.8 + Math.random() * 1.6).toFixed(1);
            updatedDecoded = [
              { signal: "Pack Voltage", value: (404.1 + Math.random() * 0.4).toFixed(1), unit: "V" },
              { signal: "Pack Current", value: current, unit: "A" },
              { signal: "State of Charge", value: 98, unit: "%" },
            ];
          } else if (frame.id === "0x420") {
            const angle = (Math.sin(Date.now() / 1500) * 12).toFixed(1);
            updatedDecoded = [
              { signal: "Steering Angle", value: angle, unit: "deg" },
              { signal: "Steering Velocity", value: (Math.random() * 30).toFixed(1), unit: "deg/s" },
            ];
          }

          return {
            ...frame,
            decoded: updatedDecoded,
            data: updatedData,
            count: frame.count + 1,
            timestamp: (performance.now() / 1000).toFixed(3) + ' s',
          };
        })
      );

      setTotalRxCount((c) => c + 4);
      setBusLoad(Math.floor(38 + Math.random() * 12));
    }, 400);

    return () => clearInterval(interval);
  }, [isRunning]);

  const selectedFrame = frames.find((f) => f.id === selectedFrameId) || frames[0];

  const handleInjectUdsDiagnostic = () => {
    setInjectedMessage(
      `TX [0x7DF] -> Service 0x22 (ReadDataByIdentifier 0xF190) >> RX [0x7E8] Positive Response 0x62 F1 90: VIN OK`
    );
    setTimeout(() => {
      setInjectedMessage(null);
    }, 4500);
  };

  return (
    <div className="bg-[#0e1422] rounded-2xl border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Top Header & Instrument Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono text-base font-bold text-white tracking-wide">
              CAN / CAN FD LIVE BUS MONITOR & DECODER
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            {currentLang === 'de'
              ? 'Interaktive Simulation: Automotive Telemetrie (ISO 11898-1 & ISO 14229 UDS)'
              : 'Interactive Simulation: Automotive Telemetry (ISO 11898-1 & ISO 14229 UDS)'}
          </p>
        </div>

        {/* Telemetry Metrics & Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">BUS LOAD: </span>
            <span className="text-amber-400 font-bold">{busLoad}%</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">SPEED: </span>
            <span className="text-emerald-400 font-bold">5.0 Mbps FD</span>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'PAUSE BUS' : 'RESUME BUS'}</span>
          </button>
        </div>
      </div>

      {/* Main Simulation View: Frame Table + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Frame Table (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
            <span>CAN ID / MSG NAME</span>
            <span>DLC / RAW BYTES (HEX)</span>
            <span>PERIOD</span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[320px] overflow-y-auto">
            {frames.map((frame) => {
              const isSelected = frame.id === selectedFrameId;
              return (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrameId(frame.id)}
                  className={`w-full px-4 py-2.5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-l-4 border-l-amber-400 text-white'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">{frame.id}</span>
                    <span className="text-xs font-semibold text-slate-200 truncate max-w-[150px]">
                      {frame.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    <span className="text-slate-500 text-[10px]">[{frame.dlc}]</span>
                    <span>{frame.data.slice(0, 4).join(' ')}...</span>
                  </div>

                  <span className="text-[11px] text-slate-400">{frame.cycleTimeMs} ms</span>
                </button>
              );
            })}
          </div>

          {/* Action Trigger for Diagnostic Query */}
          <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">
              {currentLang === 'de'
                ? 'Tester-Interaktion testen:'
                : 'Test Diagnostic Tester Injection:'}
            </span>
            <button
              onClick={handleInjectUdsDiagnostic}
              className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>INJECT UDS QUERY (0x22)</span>
            </button>
          </div>
        </div>

        {/* Frame Deep-Dive Inspector (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400 text-[11px]">FRAME INSPECTOR</span>
            <span className="text-amber-400 font-bold">{selectedFrame.id}</span>
          </div>

          {/* Identification */}
          <div className="space-y-1">
            <div className="text-slate-400 text-[10px] uppercase">Message Name</div>
            <div className="text-white font-bold text-sm tracking-wide">
              {selectedFrame.name}
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between pt-1">
              <span>DLC: {selectedFrame.dlc} Bytes</span>
              <span>Rate: {selectedFrame.cycleTimeMs} ms</span>
            </div>
          </div>

          {/* Hex Payload Representation */}
          <div className="space-y-1.5">
            <div className="text-slate-400 text-[10px] uppercase">
              Payload Bytes (Hex Dump)
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {selectedFrame.data.map((byte, idx) => (
                <div
                  key={idx}
                  className="p-1.5 bg-slate-900 border border-slate-800 rounded text-center text-amber-300 font-mono text-xs hover:border-amber-400 transition-colors"
                >
                  <span className="block text-[8px] text-slate-500">B{idx}</span>
                  {byte}
                </div>
              ))}
            </div>
          </div>

          {/* Decoded Signals */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">
              Decoded Engineering Signals
            </div>
            <div className="space-y-1.5">
              {selectedFrame.decoded.map((sig, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-slate-800/80"
                >
                  <span className="text-slate-300">{sig.signal}</span>
                  <span className="text-emerald-400 font-bold">
                    {sig.value} <span className="text-slate-500 text-[10px]">{sig.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Injected Output Alert */}
          {injectedMessage && (
            <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono animate-in fade-in duration-200">
              {injectedMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
