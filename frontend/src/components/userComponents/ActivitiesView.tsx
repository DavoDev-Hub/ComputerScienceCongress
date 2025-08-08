"use client"

import * as LucideIcons from "lucide-react"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UIActivity } from "@/types/userTypes/activity"

interface ActivitiesViewProps {
    activities: UIActivity[]
    title: string
    subtitle: string
    onEnroll: (activity: UIActivity) => void
    isEnrolled: (id: string) => boolean
    showEnrollButton?: boolean
}

export function ActivitiesView({
    activities,
    title,
    subtitle,
    onEnroll,
    isEnrolled,
    showEnrollButton = true,
}: ActivitiesViewProps) {
    const getIconComponent = (iconName?: string) => {
        if (!iconName) return User
        const Icon = (LucideIcons as any)[iconName]
        return Icon || User
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#002E5D] dark:text-gray-100 mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
            </div>

            {activities.length === 0 ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No hay actividades disponibles por ahora.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity) => {
                        const ActivityIcon = getIconComponent(activity.icon)

                        // Seguridad para evitar NaN en la barra
                        const capacity = Math.max(0, activity.capacity || 0)
                        const enrolled = Math.min(activity.enrolled || 0, capacity)
                        const pct =
                            capacity > 0 ? Math.min(100, Math.round((enrolled / capacity) * 100)) : 0

                        const enrolledState = isEnrolled(activity.id)

                        return (
                            <Card
                                key={activity.id}
                                className="bg-white/80 dark:bg-[#1F1F1F] backdrop-blur-xl border-white/20 dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-[#002E5D] to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                                <ActivityIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-[#002E5D] dark:text-gray-100 text-lg leading-tight">
                                                    {activity.title}
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className="mt-1 border-blue-500 text-[#002E5D] dark:text-blue-300 dark:border-blue-400/40"
                                                >
                                                    {activity.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {activity.description}
                                    </p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                            <Calendar className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                            <span>
                                                {activity.date} • {activity.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                            <Clock className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                            <span>
                                                {activity.duration} • {activity.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                            <User className="w-4 h-4 text-[#002E5D] dark:text-blue-300" />
                                            <span>{activity.instructor}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <span className="text-[#002E5D] dark:text-blue-300 font-medium">
                                                {enrolled}/{capacity}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-1">inscritos</span>
                                        </div>
                                        <div className="w-28 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-[#002E5D] to-blue-500 dark:from-blue-500 dark:to-blue-400 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${pct}%` }}
                                                aria-valuenow={pct}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                role="progressbar"
                                            />
                                        </div>
                                    </div>

                                    {showEnrollButton && (
                                        <Button
                                            onClick={() => onEnroll(activity)}
                                            disabled={enrolledState || enrolled >= capacity}
                                            className={`w-full rounded-2xl transition-all duration-300 shadow-lg ${enrolledState
                                                ? "bg-green-500 hover:bg-green-600 text-white"
                                                : "bg-gradient-to-r from-[#002E5D] via-blue-700 to-blue-500 hover:from-blue-500 hover:via-blue-700 hover:to-[#002E5D] text-white"
                                                }`}
                                        >
                                            {enrolledState ? "✓ Inscrita" : "Inscribirse"}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

interface CombinedActivitiesViewProps {
    academicActivities: UIActivity[]
    recreationalActivities: UIActivity[]
    onEnroll: (activity: UIActivity) => void
    isEnrolled: (id: string) => boolean
}

export function CombinedActivitiesView({
    academicActivities,
    recreationalActivities,
    onEnroll,
    isEnrolled,
}: CombinedActivitiesViewProps) {
    return (
        <div className="space-y-12">
            <ActivitiesView
                activities={academicActivities}
                title="Actividades Académicas"
                subtitle="Talleres y seminarios para tu desarrollo profesional"
                onEnroll={onEnroll}
                isEnrolled={isEnrolled}
                showEnrollButton
            />
            <ActivitiesView
                activities={recreationalActivities}
                title="Actividades Recreativas"
                subtitle="Deportes, música y diversión para tu tiempo libre"
                onEnroll={onEnroll}
                isEnrolled={isEnrolled}
                showEnrollButton
            />
        </div>
    )
}

