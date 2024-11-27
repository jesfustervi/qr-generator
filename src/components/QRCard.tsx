import { CardTitle } from "@/components/ui/card";
import { ColorPicker } from "@/components/ColorPicker";
import { QRCodeSVG } from "qrcode.react";

interface QRCardProps {
  card: {
    title: string;
    titleColor: string;
    qrColor: string;
  };
  url: string;
  onColorChange: (color: string) => void;
}

export function QRCard({ card, url, onColorChange }: QRCardProps) {
  return (
    <div>
      <div className="mb-2 flex justify-center">
        <ColorPicker 
          color={card.titleColor}
          onChange={onColorChange}
          title="Color del título y QR"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center aspect-square border-t-2 border-t-primary/10">
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