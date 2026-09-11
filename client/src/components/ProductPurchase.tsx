import { useId, useState } from "react";
import { useSearch } from "wouter";
import { Input } from "@/components/ui/input";
import { InquiryDrawer, WhatsAppCta } from "@/components/SiteShell";
import { isValidOrderQuantity } from "@/data/business";
import type { Product } from "@/data/products";

export function ProductPurchase({ product }: { product: Product }) {
  const search = useSearch();
  const requestedVariant = new URLSearchParams(search).get("variant");
  const [variantId, setVariantId] = useState(product.variants?.find(variant => variant.id === requestedVariant)?.id ?? "");
  const variant = product.variants?.find(item => item.id === variantId);
  const minimum = variant?.minimumOrderQuantity ?? product.minimumOrderQuantity;
  const price = variant?.unitPrice ?? product.unitPrice!;
  const unit = product.orderUnit ?? "bottle";
  const units = `${unit}s`;
  const variantLabel = product.variantLabel ?? "variant";
  const priceDisplay = `US$${price.toFixed(2)} / ${unit}`;
  const [quantity, setQuantity] = useState(minimum === undefined ? "" : String(minimum));
  const inputId = useId();
  // A positive integer is an inquiry estimate when MOQ is unknown, not a minimum order promise.
  const validQuantity = minimum === undefined && quantity.trim() === "" || isValidOrderQuantity(quantity, minimum ?? 1);
  const valid = validQuantity && (!product.variants || Boolean(variant));
  const context = { productName: variant?.name ?? product.name, sku: product.sku, productUrl: `/products/${product.slug}${variant ? `?variant=${variant.id}` : ""}`, category: product.productType ?? product.category, format: variant?.format ?? product.format, standardMoq: minimum === undefined ? undefined : `${minimum} ${units}${variant ? ` per selected ${variantLabel}` : ""}`, quantity: quantity.trim() ? `${Number(quantity)} ${units}` : undefined, unitPrice: priceDisplay, subtotal: valid && quantity.trim() ? `US$${(Number(quantity) * price).toFixed(2)}` : undefined };
  const quantityHelp = !validQuantity ? (minimum === undefined ? "Enter a positive whole number, or leave the estimate blank." : `Enter a whole number of at least ${minimum} ${units}.`)
    : quantity.trim() ? `Product subtotal: US$${(Number(quantity) * price).toFixed(2)}. Shipping and taxes to be confirmed.${minimum === undefined ? " MOQ is not yet confirmed." : ""}`
    : "MOQ is not yet confirmed. You can request details without entering a quantity.";
  return <div className="product-purchase">
    <div className="purchase-price"><strong>{priceDisplay}</strong><span>{minimum === undefined ? "MOQ: Ask for details" : `Minimum order: ${minimum} ${units}${product.variants ? ` per selected ${variantLabel}` : ""}`}</span></div>
    {product.variants && <div className="purchase-variant">
      <label htmlFor={`${inputId}-variant`}>Choose a {variantLabel}</label>
      <select id={`${inputId}-variant`} value={variantId} onChange={event => setVariantId(event.target.value)} aria-describedby={`${inputId}-variant-help`}>
        <option value="">Select a {variantLabel === "size" ? "size" : "label"} from the photo</option>
        {product.variants.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <p id={`${inputId}-variant-help`} className="quantity-help" aria-live="polite">{variant ? `Shown ${variant.imagePosition} in the group photo. ${variant.note ?? ""}` : "Select the product label to prepare an inquiry. Each variant has its own minimum quantity."}</p>
    </div>}
    <label htmlFor={inputId}>{minimum === undefined ? "Estimated quantity" : "Quantity"} ({units}){minimum === undefined ? " — optional" : ""}</label>
    <Input id={inputId} type="number" min={minimum} step={1} inputMode="numeric" value={quantity} onChange={event => setQuantity(event.target.value)} aria-invalid={!validQuantity} aria-describedby={`${inputId}-help`} />
    <p id={`${inputId}-help`} className="quantity-help" aria-live="polite">{quantityHelp}</p>
    {valid ? <><WhatsAppCta label="Get Wholesale Quote" intent="quote" context={context} /><InquiryDrawer triggerLabel="Email inquiry" intent="quote" context={context} triggerClassName="email-inquiry-button" /></> : <button type="button" className="button-primary" disabled>Get Wholesale Quote</button>}
    <p className="purchase-note">Continue on WhatsApp to confirm availability and delivery. This prepares an inquiry; it does not place an order.</p>
  </div>;
}
