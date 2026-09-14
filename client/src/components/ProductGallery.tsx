import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/data/products";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const gallery = product.gallery!;
  const current = gallery[selected];
  return <div className="product-gallery">
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="gallery-main" aria-label={`Enlarge ${current.label.toLowerCase()}`}>
          <img src={current.src} srcSet={current.srcSet} sizes="(max-width: 760px) 92vw, 46vw" alt={current.alt} width={current.width} height={current.height} fetchPriority="high" />
          <span className="gallery-zoom"><ZoomIn size={18} /> View larger</span>
        </button>
      </DialogTrigger>
      <DialogContent className="gallery-dialog">
        <DialogTitle>{product.name}</DialogTitle>
        <DialogDescription>{current.label}. Pinch to zoom or open the full image.</DialogDescription>
        <img src={current.fullSize ?? current.src} alt={current.alt} width={current.width} height={current.height} />
        <a className="text-link" href={current.fullSize ?? current.src} target="_blank" rel="noreferrer">Open full image</a>
      </DialogContent>
    </Dialog>
    {gallery.length > 1 && <div className="gallery-thumbnails" aria-label="Product images">
      {gallery.map((item, index) => <button type="button" key={item.src} aria-label={`Show ${item.label.toLowerCase()}`} aria-pressed={index === selected} onClick={() => setSelected(index)}>
        <img src={item.thumbnail} alt="" width={160} height={160} loading="lazy" />
        <span>{item.label}</span>
      </button>)}
    </div>}
    <p className="gallery-disclosure">{product.imageDisclosure}</p>
  </div>;
}
