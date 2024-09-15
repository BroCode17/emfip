'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Banner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="bg-primary text-primary-foreground px-4 py-3 text-center relative">
            <p className="text-sm font-medium">
                🎉 Special Offer: Buy 2 sets, get 1 free! Use code EMFIP at checkout
            </p>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsVisible(false)}
                aria-label="Dismiss banner"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
