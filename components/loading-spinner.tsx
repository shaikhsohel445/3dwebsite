import { Cpu, Sparkles } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text = "Loading..." }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <Cpu className={`${sizeClasses[size]} text-blue-400 animate-spin`} />
        <Sparkles className="w-3 h-3 text-emerald-400 absolute -top-1 -right-1 animate-pulse" />
      </div>
      {text && <p className="text-gray-300 text-sm animate-pulse">{text}</p>}
    </div>
  )
}
