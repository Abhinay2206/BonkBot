import type React from "react"
import * as LucideIcons from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  // Get the icon component from LucideIcons, fallback to Zap if not found
  const IconComponent =
    typeof LucideIcons[icon as keyof typeof LucideIcons] === "function"
      ? (LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType)
      : LucideIcons.Zap

  // Calculate animation delay based on index
  const animationDelay = index * 100

  return (
    <div
      className="group relative p-1 rounded-2xl transition-all duration-300 hover:scale-105"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>

      {/* Card content */}
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl h-full border border-gray-100 dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-all">
        <div className="mb-4 relative">
          {/* Icon background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-emerald-400/20 rounded-full blur-sm"></div>
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-emerald-400 text-white">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
