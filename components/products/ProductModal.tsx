
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
    product: typeof import("./data").products[0] | null,
    onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
        if (product) {
            setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
        }
    }

    const prevImage = () => {
        if (product) {
            setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
        }
    }

    return (
        <Dialog open={!!product} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto"
                style={{ fontFamily: "Comfortaa" }}>
                {product && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl md:text-2xl font-bold">{product.name}</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <div className="relative aspect-square overflow-hidden rounded-lg">
                                    <img
                                        src={product.images[currentImageIndex] || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {product.images.length > 1 && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                                onClick={nextImage}
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnail Images */}
                                {product.images.length > 1 && (
                                    <div className="flex space-x-2 overflow-x-auto">
                                        {product.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? "border-primary" : "border-gray-200"
                                                    }`}
                                            >
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <p className="text-3xl font-bold font-sans mb-4">{product.price} ₽</p>
                                    <p className="text-[#444] leading-relaxed">{product.description}</p>
                                </div>

                                {/* Colors */}
                                <div>
                                    <h4 className="font-bold mb-3">Доступные цвета:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color) => (
                                            <Badge key={color} variant="outline" className="px-3 py-1">
                                                {color}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div>
                                    <h4 className="font-bold mb-3">Размеры:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <Badge key={size} variant="outline" className="px-3 py-1">
                                                {size}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}