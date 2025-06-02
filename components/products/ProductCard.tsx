import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
    product: typeof import("./data").products[0],
    onClick: () => void
}

export default function ProductCard({ product, onClick, ...props }: Props) {
    return (
        <Card
            className="group hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
            style={{ backgroundColor: "#F8F8F8" }}
            {...props}
        >
            <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-3 md:p-4">
                    <h4 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">{product.name}</h4>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.colors.slice(0, 3).map((color) => (
                            <Badge key={color} variant="secondary" className="text-xs" style={{ backgroundColor: "#EAEAEA" }}>
                                {color}
                            </Badge>
                        ))}
                        {product.colors.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{product.colors.length - 3}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-bold">{product.price} ₽</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}