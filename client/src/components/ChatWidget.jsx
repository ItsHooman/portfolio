import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_ic3pcfx";
const TEMPLATE_ID = "template_ivxcefm";
const PUBLIC_KEY  = "8vxOHwqDhf9vBsIdl";

export default function ChatWidget({ ownerName = "Hooman", position = "left" }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const side = position === "right" ? { right: 16 } : { left: 16 };

  const bubbleStyle = {
    position: "fixed",
    bottom: 16,
    ...side,
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(6px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    zIndex: 9999,
    cursor: "pointer",
    fontSize: 22,
    lineHeight: "48px",
    textAlign: "center",
    userSelect: "none",
  };

  const panelStyle = {
    position: "fixed",
    bottom: 84,
    ...side,
    width: 300,
    maxWidth: "88vw",
    borderRadius: 16,
    background: "rgba(10,10,12,0.92)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    padding: 12,
    zIndex: 10000,
  };

  const textareaStyle = {
    width: "100%",
    minHeight: 90,
    resize: "vertical",
    borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: 8,
    outline: "none",
  };

  const btnMain = {
    flex: 1,
    borderRadius: 10,
    padding: "8px 12px",
    border: "none",
    background: "#fff",
    color: "#000",
    fontWeight: 600,
    cursor: sending ? "default" : "pointer",
    opacity: sending ? 0.7 : 1,
  };

  const btnGhost = {
    borderRadius: 10,
    padding: "8px 12px",
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    cursor: "pointer",
  };

  const sendEmail = async () => {
    const text = msg.trim();
    if (!text) return;
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: "Portfolio Chat",
          message: text,
          page_path: window.location.pathname + window.location.search,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setSent(true);
      setMsg("");
      setTimeout(() => setSent(false), 2500);
    } catch (e) {
      console.error(e);
      alert("Could not send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sending) sendEmail();
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen(v => !v)}
        style={bubbleStyle}
      >
        💬
      </button>

      {/* Panel */}
      {open && (
        <div style={panelStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
            Chat with {ownerName}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
            Send me a quick message — it goes straight to my email.
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message…"
              style={textareaStyle}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button type="submit" disabled={sending || !msg.trim()} style={btnMain}>
                {sending ? "Sending..." : "Send"}
              </button>
              <button type="button" onClick={() => setOpen(false)} style={btnGhost}>
                Close
              </button>
            </div>
            {sent && (
              <div style={{ marginTop: 8, fontSize: 12, color: "#8EF0C4" }}>
                ✅ Sent! I’ll check my inbox.
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
