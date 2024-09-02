'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from 'lucide-react'

export function ReviewForm() {
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [review, setReview] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the review data to your backend
        console.log({ rating, name, email, review })
        // Reset form
        setRating(0)
        setName('')
        setEmail('')
        setReview('')
        alert('Thank you for your review!')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                            key={star}
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={`p-0 ${rating >= star ? 'text-black' : 'text-gray-300'}`}
                            onClick={() => setRating(star)}
                        >
                            <Star className="h-6 w-6 fill-current" />
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="review">Review</Label>
                <Textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Submit Review</Button>
        </form>
    )
}
