import { useState } from 'react';

export function useSVGCopy() {
  const [hasCopied, setHasCopied] = useState(false);

  const copySVGCard = async (cardId: number) => {
    try {
      const cardElement = document.querySelector(`[data-card-id="card-${cardId}"]`);
      if (!cardElement) return;

      const svgElement = cardElement.querySelector('svg');
      if (!svgElement) return;

      const svgString = new XMLSerializer().serializeToString(svgElement);
      const fullSvgString = `<?xml version="1.0" encoding="UTF-8"?>${svgString}`;

      await navigator.clipboard.writeText(fullSvgString);

      console.log('SVG copiado:', fullSvgString);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (error) {
      console.error("Error copiando el SVG:", error);
      setHasCopied(false);
    }
  };

  return { copySVGCard, hasCopied };
} 