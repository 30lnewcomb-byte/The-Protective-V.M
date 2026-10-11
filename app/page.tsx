"use client";
import { useState } from "react";
type LogEntry = { time: string; title: string; detail: string; kind: "info" | "blocked" | "safe" };
export default function Home() {
  const [previewMode, setPreviewMode] = useState(false);
  const [gatePreview, setGatePreview] = useState<"closed" | "open">("closed");
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "READY", title: "Console initialized", detail: "No Android guest or drone connection is active.", kind: "info" },
    { time: "POLICY", title: "Default-deny policy selected", detail: "Unapproved outbound traffic should be denied by the future enforcement layer.", kind: "safe" }
  ]);
  function addTestTraffic() {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs(previous => [{ time: now, title: "Synthetic traffic test", detail: "Example request to an unapproved destination — marked blocked in this UI simulation only.", kind: "blocked" }, ...previous].slice(0, 8));
    setPreviewMode(true);
  }
  function resetPreview() {
    setPreviewMode(false); setGatePreview("closed");
    setLogs([
      { time: "READY", title: "Console initialized", detail: "No Android guest or drone connection is active.", kind: "info" },
      { time: "POLICY", title: "Default-deny policy selected", detail: "Unapproved outbound traffic should be denied by the future enforcement layer.", kind: "safe" }
    ]);
  }
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span /></div><div><strong>PROTECTIVE</strong><small>VIRTUAL MACHINE</small></div></div>
      <div className="nav-label">WORKSPACE</div>
      <a className="nav-item active" href="#overview"><span className="nav-icon">▦</span> Overview <span className="nav-dot" /></a>
      <a className="nav-item" href="#environment"><span className="nav-icon">▣</span> Android environment</a>
      <a className="nav-item" href="#network"><span className="nav-icon">⌁</span> Network gate</a>
      <a className="nav-item" href="#activity"><span className="nav-icon">≡</span> Activity log</a>
      <div className="sidebar-bottom"><div className="side-status"><span className="status-light" /><div><b>Isolated by design</b><small>Drone not connected</small></div></div><div className="version">PROJECT BUILD <span>FOUNDATION · 0.1</span></div></div>
    </aside>
    <section className="main-area" id="overview">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>Overview</b></div><div className="top-right"><span className="preview-pill"><i /> DEVELOPMENT PREVIEW</span><div className="avatar">L</div></div></header>
      <div className="content">
        <div className="hero"><div><div className="eyebrow"><span className="eyebrow-line" /> SAFETY CONSOLE <span className="eyebrow-muted">/ 01</span></div><h1>Know what gets in.<br /><em>Control what gets out.</em></h1><p className="hero-copy">A controlled workspace for inspecting unknown Android apps before they ever reach your drone.</p></div>
          <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="core-shield"><svg viewBox="0 0 64 72"><path d="M32 4 55 13v19c0 16-10 27-23 35C19 59 9 48 9 32V13L32 4Z" /><path d="m22 35 7 7 14-16" /></svg></div><span className="orbit-label label-top">POLICY</span><span className="orbit-label label-bottom">ISOLATION</span></div>
        </div>
        <div className="notice"><span className="notice-icon">!</span><div><b>Control panel only — enforcement is not connected yet.</b><p>This console currently displays project status and simulated events. It does not run Android, inspect RCFPVPro, or block real network traffic.</p></div><span className="notice-tag">HONEST STATUS</span></div>
        <div className="section-heading"><div><span className="section-kicker">SYSTEM SNAPSHOT</span><h2>Environment status</h2></div><span className="updated"><span className="tiny-pulse" /> LIVE UI · LOCAL STATE</span></div>
        <div className="status-grid" id="environment">
          <article className="status-card"><div className="card-top"><span className="card-symbol android">▣</span><span className="state-tag neutral">NOT INSTALLED</span></div><h3>Android guest</h3><p>Virtual device environment</p><div className="card-bottom"><span className="bottom-line" /> Awaiting environment selection</div></article>
          <article className="status-card"><div className="card-top"><span className="card-symbol shield">⬡</span><span className="state-tag warning">DESIGN ONLY</span></div><h3>Independent network gate</h3><p>Separate enforcement layer</p><div className="card-bottom"><span className="bottom-line amber" /> Policy defined, not enforced</div></article>
          <article className="status-card"><div className="card-top"><span className="card-symbol eye">◉</span><span className="state-tag neutral">OFFLINE</span></div><h3>Ori safety monitor</h3><p>App and network observations</p><div className="card-bottom"><span className="bottom-line" /> No guest activity to observe</div></article>
        </div>
        <div className="lower-grid">
          <section className="panel network-panel" id="network"><div className="panel-heading"><div><span className="section-kicker">INDEPENDENT CONTROL</span><h2>Network gate</h2></div><span className="gate-badge"><span /> {gatePreview === "closed" ? "CLOSED · PREVIEW" : "OPEN · PREVIEW"}</span></div>
            <div className="gate-visual"><div className={"gate-track " + (gatePreview === "open" ? "gate-open" : "")}><div className="gate-node"><span>GUEST</span><b>Android</b></div><div className="gate-bar"><i /><i /><i /></div><div className="gate-node gate-node-right"><span>NETWORK</span><b>{gatePreview === "closed" ? "Blocked" : "Preview"}</b></div></div></div>
            <p className="panel-copy">The intended rule is default-deny: only explicitly approved destinations and protocols should pass. The gate must remain independent from Ori.</p>
            <div className="button-row"><button className="button-secondary" onClick={() => setGatePreview(gatePreview === "closed" ? "open" : "closed")}>{gatePreview === "closed" ? "Preview allow state" : "Preview closed state"}</button><span className="sim-label">UI SIMULATION ONLY</span></div>
          </section>
          <section className="panel activity-panel" id="activity"><div className="panel-heading"><div><span className="section-kicker">AUDIT TRAIL</span><h2>Recent activity</h2></div><span className="log-count">{logs.length.toString().padStart(2, "0")} EVENTS</span></div>
            <div className="log-list">{logs.slice(0, 4).map((entry, index) => <div className="log-entry" key={entry.time + entry.title + index}><div className={"log-marker " + entry.kind}>{entry.kind === "blocked" ? "×" : entry.kind === "safe" ? "✓" : "·"}</div><div className="log-body"><div className="log-title">{entry.title}<time>{entry.time}</time></div><p>{entry.detail}</p></div></div>)}</div>
            <div className="button-row log-actions"><button className="button-primary" onClick={addTestTraffic}>Run synthetic event</button><button className="button-quiet" onClick={resetPreview}>Reset preview</button></div>
          </section>
        </div>
        <footer className="footer"><span><b>THE PROTECTIVE V.M.</b> <span className="footer-sep">/</span> BUILT FOR CONTROL, NOT TRUST</span><span>NO DRONE LINK · NO REAL TRAFFIC INSPECTION</span></footer>
      </div>
    </section>
  </main>;
}