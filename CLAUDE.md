# Persuasive — Project Context

E-commerce site for the "Persuasive" custom-embroidery shirt brand. Single-product builder (color + embroidery color + size), Yoco checkout, Resend email confirmations.

## Stack
- React 18 + TypeScript + Vite (`vite 6.3.5`)
- Tailwind + shadcn/ui (Radix primitives) — components live in `src/components/ui/`
- Vercel for hosting + serverless functions in `api/`
- Resend for transactional email
- Yoco hosted checkout for payments (ZAR, cents)

## Dev commands
- `npm run dev` — Vite only. **Does NOT serve `/api/*` routes.** Useful for UI-only work.
- `npm run dev:vercel` — `vercel dev`, serves the full stack including `/api/*` at `localhost:3000`. Use this for any flow that touches the API (checkout, admin auth, stock, email).
- `npm run build` — `vite build`. Production build; type errors will fail it.

## Routing
No React Router. Page state is a `useState` union in `src/App.tsx`:
`'home' | 'shop' | 'checkout' | 'proceed-checkout' | 'checkout-success' | 'admin' | 'admin-order'`

The only URL-driven entries are:
- `/admin` → `AdminPanel` (stock management)
- `?payment=success` → triggers `PaymentSuccess` (Yoco return)

Everything else is in-memory state. Refreshing mid-flow drops you back to `home`.

## Data persistence — IMPORTANT
**There is no database.** A transaction is "stored" by:
1. The owner notification email landing in `alessandro.persuasive@gmail.com` (the de facto orders log).
2. Stock decrement in `api/admin/stock.js`.

Stock is held in a module-level array (`stockData`) inside the serverless function — **it resets on every cold start / redeploy**. Do not treat it as durable. If we ever add a real DB, this is the first thing that needs migrating.

## Order flows

### Customer (paid)
`ProceedCheckoutPage.handlePay` → stashes order in `localStorage.pendingOrder` → `POST /api/yoco/checkout` → redirects to Yoco → Yoco returns to `?payment=success` → `App.tsx` routes to `PaymentSuccess` → reads `pendingOrder` → `POST /api/send-email` → loops `DELETE /api/admin/stock` per item → clears localStorage.

### Admin (no payment) — added 2026-05-14
Footer link on `HomePage` → password `<Dialog>` → `POST /api/admin/auth` → on success, `sessionStorage.adminAuth = 'true'` and route to `'admin-order'` page (`AdminOrderPage.tsx`). That page reuses `ProductCustomizer` to build a cart, then collects billing/delivery, then `POST /api/send-email` with `isAdminOrder: true` + stock decrement. No Yoco call.

The `isAdminOrder` flag in `api/send-email.js`:
- Prefixes owner subject with `[ADMIN]`
- Adds an amber banner inside owner email body
- Changes customer email heading from "Payment Successful" → "Order Confirmed"
- Customer email subject stays neutral ("Order Confirmation - Your Custom Shirts")

## Auth
Single shared admin password from `process.env.ADMIN_PASSWORD`, validated by `api/admin/auth.js`. Frontend gate is `sessionStorage.adminAuth === 'true'`. Used by both `AdminPanel` (`/admin` route) and `AdminOrderPage` (footer-link flow). No real user accounts.

## Environment variables (set in Vercel + `.env.local`)
- `ADMIN_PASSWORD` — admin gate (no quotes around value)
- `RESEND_API_KEY` — Resend email API
- `YOCO_SECRET_KEY` — Yoco server-side
- `VITE_YOCO_PUBLIC_KEY` — Yoco client (must be `VITE_` prefixed to be exposed to the browser bundle)

**Env var gotchas:**
- Vercel only injects env vars at build time → adding/changing one requires a **redeploy** (or push a commit). Existing deployments don't pick up new values.
- `vercel dev` reads `.env.local` once at startup → restart the server after edits.
- Don't quote values in `.env.local` (`KEY=value`, not `KEY="value"`) — Vercel includes the quotes as part of the string.

## DNS / Email setup
Domain bought at **domains.co.za**, but **nameservers point to Cloudflare** (`imani.ns.cloudflare.com`, `max.ns.cloudflare.com`). Cloudflare is the authoritative DNS provider. **All DNS records (Vercel A/CNAME, Resend SPF/DKIM, etc.) must be added in Cloudflare** — anything added at domains.co.za or in Vercel's DNS panel is ignored.

Resend sends from `alessandro@contact.persuasive.online`. The `contact.persuasive.online` subdomain is verified on Resend. Verification needs:
- SPF TXT at `send.contact` → `v=spf1 include:amazonses.com ~all`
- DKIM TXT at `resend._domainkey.contact` → **must include `v=DKIM1; k=rsa;` prefix** before `p=...` (Resend rejects records that are only `p=...`)

**Cloudflare gotchas:**
- Mail-related DNS records (TXT, MX, DKIM CNAME) must be **DNS-only (grey cloud)**, not proxied (orange cloud). Orange-cloud breaks Resend verification silently.
- Cloudflare auto-appends the zone to record names. Enter `resend._domainkey.contact`, not the full FQDN, or you'll create a doubled name.

## Known issues / tech debt
- `api/send-email.js:210, 391` logs `✅ ... sent` even when the Resend response contains `error: {...}`. The SDK doesn't throw on validation errors — must check `response.error` to know if delivery actually succeeded. Has caused "looks fine in logs but emails never arrived" debugging.
- Stock is lossy (see Data persistence above).
- The customer email's "What's Next?" section assumes shipping — may read oddly for in-person admin sales.
- No order history anywhere — past orders only exist as emails in the owner's inbox.

## File map (the parts that matter)
- `src/App.tsx` — page state + routing + headers
- `src/components/HomePage.tsx` — landing + footer with admin link + password dialog
- `src/components/ProductCustomizer.tsx` — variant/size picker, source of truth for shirt + embroidery options
- `src/components/CheckoutPage.tsx` — cart view
- `src/components/ProceedCheckoutPage.tsx` — billing/delivery form for paid checkout, triggers Yoco
- `src/components/PaymentSuccess.tsx` — Yoco return handler, fires email + stock decrement
- `src/components/AdminPanel.tsx` — `/admin` stock management
- `src/components/AdminOrderPage.tsx` — admin-only "place order without payment" flow
- `api/admin/auth.js` — password check
- `api/admin/stock.js` — in-memory stock CRUD
- `api/send-email.js` — Resend customer + owner emails (handles `isAdminOrder` flag)
- `api/yoco/checkout.js` — Yoco hosted checkout session creator
