// ============================================================
// PERSUASIVE — Cart (redesigned). Charge model preserved:
// total = subtotal; shipping is calculated offline (Buy 2 = free).
// ============================================================
import { CartItem } from '../App';
import { Icon } from './persuasive/ui';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: string) => void;
  onProceedCheckout: () => void;
  onShop: () => void;
}

export function itemTitle(item: CartItem) {
  return item.productName || 'Premium Cotton Tee';
}
export function itemVariant(item: CartItem) {
  return `${item.shirtColor} · ${item.embroideryColor} thread`;
}

export function CheckoutPage({ cartItems, onRemoveFromCart, onProceedCheckout, onShop }: CheckoutPageProps) {
  const subtotal = cartItems.reduce((t, i) => t + i.price, 0);
  const total = subtotal;
  const freeShip = cartItems.length >= 2;
  const oneAway = cartItems.length === 1;

  if (cartItems.length === 0) {
    return (
      <div className="psv">
        <div className="wrap section center" style={{ minHeight: '58vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <div className="display" style={{ fontSize: 'clamp(40px,8vw,96px)' }}>EMPTY<br />CART</div>
          <p className="dim" style={{ maxWidth: 360 }}>Nothing here yet. Head to the customizer and build your colourway.</p>
          <button className="btn btn-lg" onClick={onShop}>Start customizing <Icon.Arrow className="arrow" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="psv wrap section" style={{ paddingTop: 48 }}>
      <div className="spread" style={{ marginBottom: 34, alignItems: 'flex-end' }}>
        <h1 className="display" style={{ fontSize: 'clamp(34px,6vw,72px)' }}>Cart</h1>
        <span className="mono dim">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,0.8fr)', gap: 'clamp(28px,4vw,60px)', alignItems: 'start' }} className="cart-grid">
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {cartItems.map((it) => (
            <div key={it.id} className="row" style={{ gap: 20, padding: '22px 0', borderBottom: '1px solid var(--line)', alignItems: 'stretch' }}>
              <div style={{ width: 86, height: 104, flex: '0 0 auto', border: '1px solid var(--line)', overflow: 'hidden', background: it.swatch || 'var(--paper-2)' }}>
                <img src={it.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="stack" style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                <div className="spread">
                  <span className="display" style={{ fontSize: 20 }}>{itemTitle(it)}</span>
                  <span className="display" style={{ fontSize: 18 }}>R{it.price.toFixed(0)}</span>
                </div>
                <span className="mono-sm dim">{itemVariant(it)}</span>
                <div className="row" style={{ gap: 14, marginTop: 4 }}>
                  <span className="tag">Size {it.size}</span>
                  <button className="navlink row" style={{ gap: 7, color: 'var(--muted)' }} onClick={() => onRemoveFromCart(it.id)}><Icon.Trash size={14} /> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--ink)', position: 'sticky', top: 90 }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--ink)', background: 'var(--ink)' }}>
            <span className="mono" style={{ color: 'var(--paper)' }}>Order summary</span>
          </div>
          <div style={{ padding: '22px' }}>
            <div className="spread" style={{ marginBottom: 14 }}><span className="dim" style={{ fontSize: 14 }}>Subtotal</span><span style={{ fontSize: 15 }}>R{subtotal.toFixed(2)}</span></div>
            <div className="spread" style={{ marginBottom: 14 }}>
              <span className="dim" style={{ fontSize: 14 }}>Shipping</span>
              <span style={{ fontSize: 13 }}>{freeShip ? <span style={{ color: 'var(--accent)' }}>FREE</span> : <span className="dim">Calculated after order</span>}</span>
            </div>
            {oneAway && (
              <div className="tag" style={{ width: '100%', justifyContent: 'center', marginBottom: 16, borderStyle: 'dashed' }}>Add 1 more → free shipping</div>
            )}
            <hr className="rule rule-ink" style={{ margin: '16px 0' }} />
            <div className="spread" style={{ marginBottom: 6 }}>
              <span className="display" style={{ fontSize: 20 }}>Total</span>
              <span className="display" style={{ fontSize: 24 }}>R{total.toFixed(2)}</span>
            </div>
            <p className="mono-sm dim" style={{ marginBottom: 18 }}>Excludes shipping</p>
            <button className="btn btn-block btn-lg" onClick={onProceedCheckout}>Checkout <Icon.Arrow className="arrow" /></button>
            <button className="navlink" style={{ marginTop: 16, display: 'block' }} onClick={onShop}>Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}
