import html2canvas from 'html2canvas';

export function useQRDownload() {
  const downloadQRCard = async (
    card: { title: string; titleColor: string; qrColor: string },
    cardId: number
  ) => {
    try {
      const cardElement = document.querySelector(`[data-card-id="card-${cardId}"]`);
      if (!cardElement) return;

      const canvas = await html2canvas(cardElement as HTMLElement, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `${card.title}-card.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };

  return { downloadQRCard };
} 