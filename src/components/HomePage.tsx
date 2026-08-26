// ============================================================
// PERSUASIVE — Home page (raw streetwear monochrome redesign)
// ============================================================
import { useMemo } from 'react';
import { HERO_IMAGES, BRAND_CITY } from './persuasive/data';
import { Icon, useReveal } from './persuasive/ui';

interface HomePageProps {
  onShopNow: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function HeroFullbleed({ onShop, img }: { onShop: () => void; img: string }) {
  return (
    <section style={{ position: 'relative', height: '92vh', minHeight: 560, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,.28) 0%, rgba(12,12,12,.12) 45%, rgba(12,12,12,.74) 100%)' }} />
      <div className="wrap" style={{ position: 'relative', paddingBottom: 'clamp(40px,6vw,72px)', width: '100%' }}>
        <div className="eyebrow-row mono" style={{ color: 'rgba(255,255,255,.85)', marginBottom: 22 }}>
          <span className="ln"></span> Custom embroidered apparel — {BRAND_CITY}
        </div>
        <h1 className="display" style={{ color: '#fff', fontSize: 'clamp(60px,13vw,200px)', letterSpacing: '-0.02em' }}>PERSUASIVE</h1>
        <div className="spread" style={{ flexWrap: 'wrap', gap: 24, marginTop: 30, alignItems: 'flex-end' }}>
          <p style={{ color: 'rgba(255,255,255,.9)', maxWidth: 440, fontSize: 17, lineHeight: 1.5, margin: 0 }}>
            Premium cotton, embroidered to order. Pick your colourway, choose your thread, wear something that is only yours.
          </p>
          <button className="btn btn-light btn-lg" onClick={onShop}>Enter the customizer <Icon.Arrow className="arrow" /></button>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ['Premium Cotton Tee — R550', 'Cap — R200', 'Buy 2 → Free Shipping', 'Embroidered To Order', 'Sleeveless — R450'];
  const line = [...items, ...items];
  return (
    <div className="section-dark" style={{ padding: '16px 0', overflow: 'hidden', borderBlock: '1px solid rgba(255,255,255,.16)' }}>
      <div style={{ display: 'flex', gap: 38, whiteSpace: 'nowrap', animation: 'marq 26s linear infinite', width: 'max-content' }}>
        {line.map((t, i) => (
          <span key={i} className="mono" style={{ color: 'var(--paper)', display: 'inline-flex', gap: 38, alignItems: 'center' }}>{t} <span style={{ opacity: .4 }}>✳</span></span>
        ))}
      </div>
    </div>
  );
}

export function HomePage({ onShopNow }: HomePageProps) {
  const revRef = useReveal();
  const gridImgs = useMemo(() => shuffle(HERO_IMAGES).slice(0, 6), []);
  const features = [
    { icon: <Icon.Needle size={26} />, t: 'Embroidered to order', d: 'Every piece is stitched after you order — your colourway, your thread, no two the same.' },
    { icon: <Icon.Cotton size={26} />, t: '100% organic cotton', d: 'Heavyweight, pre-shrunk and built to outlast the season. A premium hand-feel from the first wear.' },
    { icon: <Icon.Truck size={26} />, t: '3—5 day dispatch', d: `Made and shipped from ${BRAND_CITY} within three to five business days. Buy two, shipping is on us.` },
    { icon: <Icon.Exchange size={26} />, t: '21-day exchanges', d: 'Not the right fit? You can exchange your shirt within 21 days of delivery. Please note all sales are final — we are unable to offer refunds.' },
  ];

  return (
    <div ref={revRef} className="psv">
      <HeroFullbleed onShop={onShopNow} img={gridImgs[0]} />

      <MarqueeStrip />

      {/* Brand story */}
      <section className="section" id="story">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(28px,5vw,80px)', alignItems: 'center' }} className="story-grid">
            <div className="reveal">
              <div className="eyebrow-row mono dim" style={{ marginBottom: 24 }}><span className="ln"></span> 01 — The idea</div>
              <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,68px)' }}>Your style,<br />your way.</h2>
              <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 480, marginTop: 22 }}>
                We believe great clothing should be as unique as the person wearing it. Choose your colours, add your thread, and wear something truly yours — made one piece at a time.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 28 }} onClick={onShopNow}>Build yours <Icon.Arrow className="arrow" /></button>
            </div>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {gridImgs.slice(0, 4).map((im, i) => (
                <div key={i} style={{ aspectRatio: '3/4', overflow: 'hidden', border: '1px solid var(--line)', transform: i % 2 ? 'translateY(22px)' : 'none' }}>
                  <img src={im} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="eyebrow-row mono dim reveal" style={{ marginBottom: 40 }}><span className="ln"></span> 02 — Why Persuasive</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--ink)' }} className="feat-grid">
            {features.map((f, i) => (
              <div key={i} className="reveal" style={{ padding: '40px 32px 40px 0', borderRight: i < features.length - 1 ? '1px solid var(--line)' : 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="spread"><span style={{ color: 'var(--ink)' }}>{f.icon}</span><span className="mono-sm dim">0{i + 1}</span></div>
                <h3 className="display" style={{ fontSize: 24 }}>{f.t}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark center">
        <div className="wrap">
          <div className="eyebrow-row mono reveal" style={{ color: 'rgba(255,255,255,.6)', justifyContent: 'center', marginBottom: 26 }}>
            <span className="ln" style={{ flexBasis: 30 }}></span> Ready when you are <span className="ln" style={{ flexBasis: 30 }}></span>
          </div>
          <h2 className="display reveal" style={{ color: 'var(--paper)', fontSize: 'clamp(40px,8vw,120px)' }}>MAKE<br />IT YOURS</h2>
          <div className="reveal" style={{ marginTop: 34 }}>
            <button className="btn btn-light btn-lg" onClick={onShopNow}>Customize your fit <Icon.Arrow className="arrow" /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
