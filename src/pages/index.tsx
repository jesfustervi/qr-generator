"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useState } from "react";
import { QRCard } from "@/components/QRCard";

const QRCode = dynamic(
  () => import("qrcode.react").then(mod => mod.QRCodeSVG),
  {
    ssr: false,
    loading: () => <p>Loading QR Code...</p>,
  }
);

interface CardItem {
  title: string;
  titleColor: string;
  qrColor: string;
}

export default function Component() {
  const [url, setUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [cardList, setCardList] = useState<CardItem[]>([]);

  const handleAddTitle = () => {
    if (newTitle.trim()) {
      setCardList([...cardList, {
        title: newTitle.trim(),
        titleColor: "#000000",
        qrColor: "#000000"
      }]);
      setNewTitle("");
    }
  };

  const handleRemoveTitle = (index: number) => {
    setCardList(cardList.filter((_, i) => i !== index));
  };

  const handleUpdateColors = (index: number, color: string) => {
    const newList = [...cardList];
    newList[index].titleColor = color;
    newList[index].qrColor = color;
    setCardList(newList);
  };

  return (
    <div className="min-h-screen p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Generador de Código QR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Añadir título a la lista"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleAddTitle()}
                className="flex-1"
              />
              <Button onClick={handleAddTitle} variant="secondary">
                Añadir
              </Button>
            </div>
            
            {cardList.length > 0 && (
              <div className="bg-gray-100 p-2 rounded-md">
                <p className="text-sm text-gray-500 mb-2">Títulos añadidos:</p>
                {cardList.map((card, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded mb-1">
                    <CardTitle className="text-lg" style={{ color: card.titleColor }}>
                      {card.title}
                    </CardTitle>
                    <button
                      onClick={() => handleRemoveTitle(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Input
              type="url"
              placeholder="Ingrese URL para los códigos QR"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full"
            />

            {url && (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cardList.length > 0 ? (
                    cardList.map((card, index) => (
                      <QRCard
                        key={index}
                        cardId={index}
                        card={card}
                        url={url}
                        onColorChange={(color) => handleUpdateColors(index, color)}
                      />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center aspect-square">
                      <QRCode 
                        value={url} 
                        size={200} 
                        level="H"
                        fgColor="#000000"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
