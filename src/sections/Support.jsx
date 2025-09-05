// src/sections/Support.jsx
import React, { useState } from "react";

const faqs = [
  { q: "How do I report an issue?", a: "Use the Report Damage form and upload a photo or location." },
  { q: "Who receives the reports?", a: "Reports are available to municipal authorities, NGOs and TransLytix ops." },
  { q: "How real is the data?", a: "This demo uses simulated data streams for demonstration." },
];

export default function Support() {
  const [open, setOpen] = useState(null);
  const [messages, setMessages] = useState([{from:"bot", text:"Hello! How can I help?"}]);
  const [text, setText] = useState("");

  const send = () => {
    if(!text.trim()) return;
    setMessages((m)=>[...m, {from:"user", text}]);
    setTimeout(()=> setMessages((m)=>[...m, {from:"bot", text:"Thanks — we've noted your query and will follow up."}]), 800);
    setText("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">🤝 Support</h2>

      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className="bg-white rounded shadow">
            <button onClick={()=> setOpen(open===i?null:i)} className="w-full text-left px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">{f.q}</div>
                <div className="text-sm text-gray-500">{open===i? "-" : "+"}</div>
              </div>
            </button>
            {open===i && <div className="px-4 pb-3 text-gray-700">{f.a}</div>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded p-3 shadow">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {messages.map((m,idx)=>(
            <div key={idx} className={`p-2 rounded ${m.from==="bot"?"bg-gray-100":"bg-green-50"} text-sm`}>{m.text}</div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Type a message..." />
          <button onClick={send} className="px-3 py-2 bg-green-600 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
}