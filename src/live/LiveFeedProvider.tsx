import React, { createContext, useEffect, useState, ReactNode } from 'react'
import { useDataStore } from '../store/useDataStore'

type LiveFeedContextType = { /* placeholder for future expansion */ }
export const LiveFeedContext = createContext<LiveFeedContextType | undefined>(undefined)

export default function LiveFeedProvider({ children }: { children: ReactNode }){
  const add = useDataStore(s=>s.addRandomReport)

  useEffect(()=>{
    let ws: WebSocket | null = null
    let fallback: any

    const startSimulator = () => {
      fallback = setInterval(()=> add(), 4000)
    }

    const connect = () => {
      const url = (import.meta.env.DEV ? `ws://localhost:5050/ws` : `${location.origin.replace('http','ws')}/ws`)
      try {
        ws = new WebSocket(url)
        ws.onopen = () => { if (fallback) { clearInterval(fallback); fallback = null } }
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data)
            if (msg?.type === 'report') {
              add()
            }
          } catch{}
        }
        ws.onclose = startSimulator
        ws.onerror = startSimulator
      } catch {
        startSimulator()
      }
    }

    connect()
    return ()=> { if (ws) ws.close(); if (fallback) clearInterval(fallback) }
  }, [add])

  return <>{children}</>
}
