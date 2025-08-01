import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    description: string
    highlighted?: boolean
}

export default function FeatureCard({ icon: Icon, title, description, highlighted }: FeatureCardProps) {
    return (
        <div
            className={`transition-transform duration-300 transform rounded-2xl border border-white/30 shadow-xl p-6 text-center backdrop-blur-md ${highlighted
                ? "ring-4 ring-blue-500/40 scale-105 bg-white/80"
                : "bg-white/60 hover:scale-105"
                }`}
        >
            <div
                className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all ${highlighted ? "bg-gradient-to-br from-[#002E5D] to-blue-700" : "bg-gray-300"
                    }`}
            >
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#002E5D] mb-1">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
        </div>
    )
}

