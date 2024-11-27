import { CardTitle } from "@/components/ui/card";
import { ColorPicker } from "@/components/ColorPicker";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useQRDownload } from "@/hooks/useQRDownload";

interface QRCardProps {
  card: {
    title: string;
    titleColor: string;
    qrColor: string;
  };
  url: string;
  onColorChange: (color: string) => void;
  cardId: number;
}

export function QRCard({ card, url, onColorChange, cardId }: QRCardProps) {
  const { downloadQRCard } = useQRDownload();

  return (
    <div>
      <div className="mb-2 flex justify-center gap-2">
        <ColorPicker 
          color={card.titleColor}
          onChange={onColorChange}
          title="Color del título y QR"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => downloadQRCard(card, cardId)}
          title="Descargar QR"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <div 
        data-card-id={`card-${cardId}`}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center aspect-square border-t-2 border-t-primary/10"
      >
        <CardTitle 
          className="text-xl md:text-2xl text-center mb-6"
          style={{ color: card.titleColor }}
        >
          {card.title}
        </CardTitle>
        <QRCodeSVG 
          value={url} 
          size={200} 
          level="H"
          fgColor={card.qrColor}
        />
      </div>
    </div>
  );
} 