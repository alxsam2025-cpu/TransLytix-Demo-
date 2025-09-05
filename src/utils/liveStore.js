// src/utils/liveStore.js
import { makeReport } from "./liveData";

const listeners = new Set();
let buffer = [];
const MAX_BUFFER = 2000;
let genInterval = null;

function startGenerator() {
  if (genInterval) return;
  // seed initial items
  for (let i = 0; i < 8; i++) buffer.unshift(makeReport());
  genInterval = setInterval(() => {
    const r = makeReport();
    buffer.unshift(r);
    if (buffer.length > MAX_BUFFER) buffer = buffer.slice(0, MAX_BUFFER);
    listeners.forEach((cb) => cb(buffer));
  }, 2200);
}

export function subscribe(cb) {
  listeners.add(cb);
  cb(buffer.slice());
  startGenerator();
  return () => listeners.delete(cb);
}

export function addReport(report) {
  const r = {
    ...report,
    id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 9999)}`,
    timestamp: new Date().toLocaleTimeString(),
  };
  buffer.unshift(r);
  if (buffer.length > MAX_BUFFER) buffer = buffer.slice(0, MAX_BUFFER);
  listeners.forEach((cb) => cb(buffer));
  return r;
}

export function getSnapshot() {
  return buffer.slice();
}