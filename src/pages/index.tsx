"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useState } from "react";

const QRCode = dynamic(
  () => import("qrcode.react").then(mod => mod.QRCodeSVG),
  {
    ssr: false,
    loading: () => <p>Loading QR Code...</p>,
  }
);

// const japaneseTexts = [
//   { title: "鶏のデイビッド", url: "https://david.com" },
//   { title: "鶏のイエス", url: "https://jesus.com" },
//   { title: "鶏のエンディカ", url: "https://endika.com" },
//   { title: "鶏のアルベルト", url: "https://albert.com" },
//   { title: "鶏のトーニン", url: "https://tonin.com" },
// ];

export default function Component() {
  const [url, setUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [titleList, setTitleList] = useState<string[]>([]);

  const handleAddTitle = () => {
    if (newTitle.trim()) {
      setTitleList([...titleList, newTitle.trim()]);
      setNewTitle("");
    }
  };

  const handleRemoveTitle = (index: number) => {
    setTitleList(titleList.filter((_, i) => i !== index));
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
            
            {titleList.length > 0 && (
              <div className="bg-gray-100 p-2 rounded-md">
                <p className="text-sm text-gray-500 mb-2">Títulos añadidos:</p>
                {titleList.map((title, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded mb-1">
                    <CardTitle className="text-lg">
                      {title}
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

            {url && titleList.length > 0 && (
              <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {titleList.map((title, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center aspect-square"
                    >
                      <h1 className="text-xl md:text-2xl font-bold text-black text-center mb-6">
                        {title}
                      </h1>
                      <QRCode value={url} size={200} level="H" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
