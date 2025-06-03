
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { products } from "./data"
import ProductFilters from "./ProductFilters"
import ProductModal from "./ProductModal"
import ProductCard from "./ProductCard"
import ComingSoon from "@/components/ui-kit/ComingSoon"

export default function Products({ elementRef }: { elementRef: React.RefObject<HTMLElement> }) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const filteredProducts =
        selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

    const openProductModal = (product: (typeof products)[0]) => {
        setSelectedProduct(product)
    }

    const closeProductModal = () => {
        setSelectedProduct(null)
    }

    return (<>
        <motion.section
            ref={elementRef}
            className="container mx-auto px-4 py-6 md:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <ComingSoon />
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 space-y-4 md:space-y-0">
                <h3 className="text-xl md:text-2xl font-semibold">Наши товары</h3>
                <ProductFilters selected={selectedCategory} onChange={setSelectedCategory} />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => openProductModal(product)} />
                ))}
            </div>
        </motion.section>

        <ProductModal product={selectedProduct} onClose={closeProductModal} />
    </>)
}