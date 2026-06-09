// ============================================================
// PERSUASIVE — shared UI: icons, header, footer, breadcrumb, reveal hook
// ============================================================
import { useEffect, useRef } from 'react';
import { BRAND_CITY } from './data';

type IconProps = { size?: number; className?: string };

export const Icon = {
  Arrow: ({ size = 16, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  ArrowLeft: ({ size = 16, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
  ),
  Bag: ({ size = 18, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 8h12l1 12H5L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
  ),
  Close: ({ size = 16, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 6l12 12M18 6L6 18" /></svg>
  ),
  Check: ({ size = 16, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5 9-11" /></svg>
  ),
  Trash: ({ size = 16, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13" /></svg>
  ),
  Truck: ({ size = 22, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h13v9H1zM14 9h4l3 3v3h-7zM6.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>
  ),
  Needle: ({ size = 22, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21L14 10M14 10l3-3a3 3 0 1 1 0 5l-3 3M14 10l-3 3" /><circle cx="18.5" cy="5.5" r="1" /></svg>
  ),
  Cotton: ({ size = 22, className }: IconProps) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M5 9c0 4 3 7 7 7s7-3 7-7M5 9a3 3 0 1 1 4-3M19 9a3 3 0 1 0-4-3M9 6a3 3 0 1 1 6 0" /></svg>
  ),
};

// ---------------- Reveal-on-scroll ----------------
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return ref;
}

// ---------------- Wordmark ----------------
export function Wordmark({ size = 18, onClick, light }: { size?: number; onClick?: () => void; light?: boolean }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
      <span className="display" style={{ fontSize: size, letterSpacing: '0.02em', color: light ? 'var(--paper)' : 'var(--ink)' }}>PERSUASIVE</span>
    </button>
  );
}

// ---------------- Header ----------------
export function Header({ cartCount, onHome, onShop, onCart, dark }: {
  cartCount: number; onHome: () => void; onShop: () => void; onCart: () => void; dark?: boolean;
}) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: dark ? 'var(--ink)' : 'var(--paper)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.16)' : 'var(--line)'}` }}>
      <div className="wrap spread" style={{ height: 70 }}>
        <div className="row" style={{ gap: 28 }}>
          <Wordmark size={19} onClick={onHome} light={dark} />
        </div>
        <nav className="row psv-nav" style={{ gap: 30 }}>
          <button className="navlink" onClick={onShop} style={dark ? { color: 'var(--paper)' } : undefined}>Shop</button>
          <button className="navlink" onClick={onHome} style={dark ? { color: 'var(--paper)' } : undefined}>Story</button>
          <button onClick={onCart} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: dark ? 'var(--paper)' : 'var(--ink)', display: 'flex', alignItems: 'center' }} aria-label="Cart">
            <Icon.Bag size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -10, background: 'var(--accent)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{cartCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ---------------- Breadcrumb bar ----------------
export function CrumbBar({ onBack, label, right }: { onBack: () => void; label: string; right?: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
      <div className="wrap spread" style={{ height: 54 }}>
        <button className="navlink row" style={{ gap: 10 }} onClick={onBack}><Icon.ArrowLeft size={15} /> Back</button>
        <span className="mono" style={{ color: 'var(--muted)' }}>{label}</span>
        <div style={{ minWidth: 60, textAlign: 'right' }}>{right}</div>
      </div>
    </div>
  );
}

// ---------------- Footer ----------------
export function Footer({ onShop, onAdmin }: { onShop: () => void; onAdmin: () => void }) {
  return (
    <footer className="section-dark" style={{ paddingTop: 72, paddingBottom: 36 }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(2, minmax(0,1fr))', gap: 40, alignItems: 'start' }} className="footer-grid">
          <div>
            <div className="display" style={{ fontSize: 'clamp(38px,7vw,76px)', color: 'var(--paper)', lineHeight: 0.86 }}>PER<br />SUA<br />SIVE</div>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <span className="mono" style={{ color: 'rgba(255,255,255,.5)' }}>Index</span>
            <button className="navlink" style={{ color: 'var(--paper)', textAlign: 'left' }} onClick={onShop}>Shop</button>
            <button className="navlink" style={{ color: 'var(--paper)', textAlign: 'left' }} onClick={onShop}>Customizer</button>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <span className="mono" style={{ color: 'rgba(255,255,255,.5)' }}>Contact</span>
            <span style={{ color: 'var(--paper)', fontSize: 14 }}>alessandro.persuasive@gmail.com</span>
            <span style={{ color: 'var(--paper)', fontSize: 14 }}>{BRAND_CITY}, ZA</span>
            <span style={{ color: 'var(--paper)', fontSize: 14 }}>Instagram</span>
          </div>
        </div>
        <div className="rule" style={{ margin: '44px 0 24px' }}></div>
        <div className="spread" style={{ flexWrap: 'wrap', gap: 14 }}>
          <span className="mono-sm" style={{ color: 'rgba(255,255,255,.5)' }}>© 2026 Persuasive — All rights reserved</span>
          <button className="mono-sm" onClick={onAdmin} style={{ color: 'rgba(255,255,255,.4)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.22em' }}>Admin</button>
        </div>
      </div>
    </footer>
  );
}
