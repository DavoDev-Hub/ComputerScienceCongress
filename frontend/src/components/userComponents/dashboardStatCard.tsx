import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    count: number;
    label: string;
}

const StatCard = ({ icon: Icon, count, label }: StatCardProps) => {
    return (
        <div className="bg-white/80 dark:bg-[#1F1F1F] dark:border dark:border-gray-700
  backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-black/40
  p-6 flex flex-col items-center text-center border border-white/20">

            <div className="w-12 h-12 rounded-full
    bg-gradient-to-br from-[#002E5D] to-blue-700
    dark:from-blue-600 dark:to-blue-400
    flex items-center justify-center shadow-md mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>

            <div className="text-3xl md:text-4xl font-semibold
    text-[#002E5D] dark:text-gray-100 tracking-tight">
                {count}
            </div>

            <div className="mt-1 text-sm md:text-base
    text-gray-600 dark:text-gray-300">
                {label}
            </div>
        </div>

    );
};

export default StatCard;

