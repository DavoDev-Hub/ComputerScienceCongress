import { useCallback } from "react"

export function useQRCode() {
    const toDataURL = useCallback(async (text: string) => {
        const QR = await import("qrcode")
        return await QR.toDataURL(text, {
            margin: 1,
            scale: 6,
            errorCorrectionLevel: "M",
        })
    }, [])

    return { toDataURL }
}

