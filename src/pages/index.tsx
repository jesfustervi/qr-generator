"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const QRCode = dynamic(
  () => import("qrcode.react").then(mod => mod.QRCodeSVG),
  {
    ssr: false,
    loading: () => <p>Loading QR Code...</p>,
  }
);

export default function Component() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerateQR = () => {
    if (url) {
      setQrCodeUrl(url);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Generador de Código QR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Ingrese URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleGenerateQR} className="w-full">
              Generar Código QR
            </Button>
            {isClient && qrCodeUrl && (
              <div className="mt-4 flex justify-center">
                <QRCode value={qrCodeUrl} size={200} level="H" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
