import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
    icon: React.ElementType
    count: number
    label: string
}

export const StatCard = ({ icon: Icon, count, label }: StatCardProps) => (
    <Card className="bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#002E5D] mb-2">{count}</h3>
            <p className="text-gray-600">{label}</p>
        </CardContent>
    </Card>
)

