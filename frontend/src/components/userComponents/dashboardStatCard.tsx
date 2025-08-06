import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    count: number;
    label: string;
}

const StatCard = ({ icon: Icon, count, label }: StatCardProps) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#002E5D] to-blue-700 flex items-center justify-center shadow-md mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#002E5D]">{count}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
};

export default StatCard;

