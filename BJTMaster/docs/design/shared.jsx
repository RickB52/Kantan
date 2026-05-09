// Shared icon set + utility components for BJT Master mockups
const Icon = {
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 003.4 0"/></svg>,
  home: (f) => <svg viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8"><path d="M3 12L12 4l9 8v8a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/></svg>,
  book: (f) => <svg viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h13v17H6a2 2 0 00-2 2V5z"/><path d="M6 19h13" strokeWidth="1.5"/></svg>,
  test: (f) => <svg viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>,
  user: (f) => <svg viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>,
  fire: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-2 1-3 1-3s-1 5 2 5c2 0 2-3 1-5 3 2 5 5 5 8a7 7 0 11-14 0c0-5 5-9 9-13z"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  speaker: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M16 9a4 4 0 010 6M19 6a8 8 0 010 12"/></svg>,
  bookmark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg>,
  google: <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-1 2.4-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z"/><path fill="#34A853" d="M12 22c2.7 0 5-1 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0012 22z"/><path fill="#FBBC05" d="M6.4 13.9a6 6 0 010-3.8V7.5H3a10 10 0 000 9z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003 7.5l3.4 2.6C7.2 7.8 9.4 6 12 6z"/></svg>,
  apple: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 12.5c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.3-2.4-1.8-.2-3.6 1.1-4.5 1.1s-2.4-1-3.9-1c-2 0-3.9 1.2-4.9 3-2.1 3.7-.5 9 1.5 12 1 1.4 2.2 3 3.7 3 1.5-.1 2-1 3.8-1s2.3 1 3.8 1c1.6 0 2.6-1.4 3.5-2.9 1.1-1.7 1.6-3.3 1.6-3.4-.1 0-3-1.2-3-4.7zM14.7 4c.8-1 1.4-2.3 1.2-3.7-1.2.1-2.7.8-3.5 1.8-.7.9-1.4 2.3-1.2 3.6 1.4.1 2.7-.7 3.5-1.7z"/></svg>,
};

const Tab = ({ icon, label, on }) => (
  <div className={`tab ${on?'on':''}`}>{icon}<span>{label}</span></div>
);

const TabBar = ({ active = 'home' }) => (
  <div className="bjt-tabbar">
    <Tab icon={Icon.home(active==='home')} label="Home" on={active==='home'} />
    <Tab icon={Icon.book(active==='learn')} label="Learn" on={active==='learn'} />
    <Tab icon={Icon.test(active==='mock')} label="Mock" on={active==='mock'} />
    <Tab icon={Icon.user(active==='me')} label="Me" on={active==='me'} />
  </div>
);

const TopBar = ({ title, back = true, right = null }) => (
  <div className="bjt-appbar">
    {back ? <button className="icon-btn">{Icon.back}</button> : <div style={{width:36}}/>}
    <h1>{title}</h1>
    {right || <div style={{width:36}}/>}
  </div>
);

const Progress = ({ pct, variant }) => (
  <div className={`bjt-progress ${variant||''}`}><div className="fill" style={{ width: `${pct}%` }}/></div>
);

const JBadge = ({ level }) => {
  const cls = level === 'J1+' ? 'j1plus' : level.toLowerCase();
  return <span className={`bjt-badge ${cls}`}>{level}</span>;
};

Object.assign(window, { Icon, Tab, TabBar, TopBar, Progress, JBadge });
