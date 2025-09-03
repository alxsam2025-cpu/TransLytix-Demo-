export default function Header(){
  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-10 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-9 w-9 rounded-2xl" alt="logo"/>
          <div>
            <h1 className="text-xl font-bold">TransLytix</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Road Health • Citizen Reports • Insights</p>
          </div>
        </div>
        <nav className="text-sm hidden md:flex gap-4">
          <a className="px-3 py-1.5 rounded-2xl bg-brand-500 text-white" href="#">Dashboard</a>
          <a className="px-3 py-1.5 rounded-2xl border" href="#">Login</a>
          <a className="px-3 py-1.5 rounded-2xl border" href="#">Predictive Analytics</a>
        </nav>
      </div>
    </header>
  )
}
