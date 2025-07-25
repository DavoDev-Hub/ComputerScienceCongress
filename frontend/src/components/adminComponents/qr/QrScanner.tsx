import { useRef, useState } from "react";
import QrScanner from "react-qr-barcode-scanner";
import { toast } from "sonner";
import { createAsistencia } from "@/services/adminServices/apiAsistencia";

function QRScanner({ onScanSuccess }: { onScanSuccess: () => void }) {
    const [scanning, setScanning] = useState(true);
    const lastScannedRef = useRef<string | null>(null);

    const handleScan = async (data: string | null) => {
        if (!data || data === lastScannedRef.current) return;

        setScanning(false);
        lastScannedRef.current = data;

        try {
            const parsed = JSON.parse(data);
            await createAsistencia(parsed);
            toast.success("Asistencia registrada correctamente");


            onScanSuccess();
        } catch (error) {
            console.error("Error procesando QR:", error);
            toast.error("QR inválido o asistencia fallida");
        } finally {
            setTimeout(() => {
                lastScannedRef.current = null;
            }, 3000);
        }
    };

    return (
        <div className="rounded-lg overflow-hidden border w-full max-w-sm mx-auto aspect-[4/4]">
            <QrScanner
                onUpdate={(err, result) => {
                    if (result) handleScan(result.getText());
                    if (err) console.warn(err);
                }}
                facingMode="environment"
            />
        </div>
    );
}

export default QRScanner;

