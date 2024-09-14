import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 text-center">
      <div className="mb-8 animate-bounce">
        <Loader2 className="h-24 w-24 text-gray-400 animate-spin" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! Looks like this page got tangled up in our wool dryer balls.
      </p>
      <div className="max-w-md mb-8">
        <p className="text-gray-500">
          Don't worry, our dryer balls are great at removing tangles. Let's get you back on track!
        </p>
      </div>
      <Button asChild className="animate-pulse">
        <Link href="/">
          Roll Back to Home
        </Link>
      </Button>
    </div>
  )
}