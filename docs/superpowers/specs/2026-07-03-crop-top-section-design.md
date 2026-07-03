# Crop Top Section — Design

**Date:** 2026-07-03
**Status:** Approved

## Goal

Add a third product to the customizer: **Crop Tops**, alongside the existing Cotton Tee and Cap. Two fixed colorways, both with Pink embroidery, one size, always available (no stock tracking).

## Product facts

| key   | productName         | thread | price | size     |
|-------|---------------------|--------|-------|----------|
| White | Oversized Crop Top  | Pink   | R450  | One Size |
| Black | Crop Top            | Pink   | R400  | One Size |

Key difference from the Cap: each colorway carries its **own name and price** (the cap shares one price across colorways).

## Images (Cloudflare R2 `persuasive-images` → `images.persuasive.online`)

- White: `Crop Top White Pink Embroidery/White Pink Front.jpeg`, `.../White Pink Back.jpeg`
- Black: `Crop Top Black Pink Embroidery/Black Pink Front.jpeg`, `.../Black Pink Back.jpeg`

Front image is primary (used as the cart thumbnail).

## Approach

Mirror the existing Cap pattern. Rejected alternatives: generalizing Cap+CropTop into one shared component (touches working cap code, YAGNI); one tab per crop top (clutters tab bar — they are one category).

## Changes

1. **`src/components/persuasive/data.ts`**
   - New `CropTop` interface (like `Colorway` but with `productName` and `price` per entry).
   - New `cropTopColorways: CropTop[]` array with the two entries above.

2. **`src/App.tsx`**
   - Extend `CartItem.productType` union: `'tee' | 'cap' | 'croptop'`.

3. **`src/components/ProductCustomizer.tsx`**
   - New `CropTopCustomizer` component modeled on `CapCustomizer`: gallery, colorway swatches, fixed matched Pink thread display, single "One Size" segment. Selecting a colorway updates heading (name), price, and images. No stock check.
   - Adds to cart with `productType: 'croptop'`, `productName` = colorway's name, `shirtColor` = key, `embroideryColor` = 'Pink'.
   - Third tab in the switcher: label "Crop Top", sublabel "New · From R400". Tab state union becomes `'tee' | 'cap' | 'croptop'`.

4. **`api/send-email.js`**
   - Extend `describeItem` so crop tops read as `"<productName> — <color> / Pink thread (One Size)"` instead of the default "shirt with embroidery" phrasing.

## No changes needed

- `CheckoutPage` — already renders arbitrary `productName` (`itemTitle`) and `"<color> · <thread> thread"` (`itemVariant`); "White · Pink thread" reads fine.
- Stock decrement in `PaymentSuccess` — crop-top color-size rows aren't in `stockData`; the `DELETE /api/admin/stock` no-ops for unknown rows (caps already work this way).

## Testing

- `npm run build` passes (type check).
- Manual: crop-top tab shows, colorway switch updates name/price/images, add-to-cart lands correct line item, checkout shows correct title/variant/price.
