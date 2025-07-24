import { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface QRScannerProps {
    onClose: () => void;
    onSuccess: (data: {
        id_alumno: number;
        id_actividad?: number;
        id_conferencia?: number;
        fecha_asistencia: string;
    }) => void;
}

function QRScanner({ onClose, onSuccess }: QRScannerProps) {
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null)

    const iniciarScanner = async () => {
        try {
            const cameras = await Html5Qrcode.getCameras()
            console.log("Cámaras detectadas:", cameras)

            if (cameras.length === 0) {
                throw new Error("No se encontraron cámaras disponibles")
            }

            const cameraId = cameras[0].id
            html5QrCodeRef.current = new Html5Qrcode("reader")

            const config = { fps: 10, qrbox: 250 }

            await html5QrCodeRef.current.start(
                cameraId,
                config,
                async (decodedText) => {
                    try {
                        const data = JSON.parse(decodedText)
                        console.log("QR leído:", data)
                        onSuccess(data)
                        toast.success("QR escaneado correctamente")
                        await html5QrCodeRef.current?.stop()
                        onClose()
                    } catch (error) {
                        console.error("Error procesando QR:", error)
                        toast.error("QR inválido o malformado")
                    }
                },
                () => { }
            )
        } catch (error) {
            console.error("Error iniciando escáner:", error)
            toast.error("No se pudo acceder a la cámara")
            onClose()
        }
    }

    const detenerScanner = async () => {
        try {
            if (html5QrCodeRef.current) {
                await html5QrCodeRef.current.stop()
                html5QrCodeRef.current.clear()
            }
        } catch (error) {
            console.warn("Error al detener el escáner:", error)
        }
    }

    useEffect(() => {
        iniciarScanner()
        return () => {
            detenerScanner()
        }
    }, [])

    return (
        <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-sm text-gray-700">Escanea el código QR del alumno</p>

            <div
                id="reader"
                className="w-[320px] h-[320px] rounded-lg overflow-hidden shadow border"
            />

            <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
                Cerrar escáner
            </Button>
        </div>
    )
}

export default QRScanner

