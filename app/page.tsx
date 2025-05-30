"use client"

import { useState } from "react"
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const products = [
  {
    id: 1,
    name: "Футболка",
    price: 1890,
    category: "t-shirts",
    image: "/tshirt.jpg",
    colors: ["Black", "White", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Легендарная футболка DRPMerch из премиального 100% хлопка. Мягкая, дышащая ткань обеспечивает комфорт на весь день. Стильный логотип подчеркнет ваш уникальный стиль. Идеально подходит для повседневной носки, тренировок и встреч с друзьями.",
    images: [
      "/tshirt.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 2,
    name: "Vintage Cap",
    price: 1990,
    category: "caps",
    image: "/cap.jpg",
    colors: ["Black", "Khaki", "Navy"],
    sizes: ["One Size"],
    description:
      "Винтажная кепка в стиле 90-х с регулируемым ремешком. Изготовлена из прочного хлопкового твила, который становится только лучше со временем. Классический дизайн дополнит любой образ - от спортивного до кэжуал. Защитит от солнца и добавит харизмы вашему стилю.",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
  },
  {
    id: 3,
    name: "Premium Hoodie",
    price: 5990,
    category: "hoodies",
    image: "/hoodie.jpg",
    colors: ["Gray", "Black", "Maroon"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Роскошная толстовка из смесового хлопка с флисовой подкладкой. Невероятно мягкая и теплая, она станет вашей любимой вещью в гардеробе. Современный крой подчеркивает силуэт, а качественные материалы гарантируют долговечность. Идеальна для прохладных вечеров и активного отдыха.",
    images: [
      "/hoodie-2.jpg",
      "/hoodie-3.jpg",
      "/hoodie-4.jpg",
    ],
  },
  {
    id: 4,
    name: "Шопер",
    price: 2490,
    category: "accessories",
    image: "/bag.jpg",
    colors: ["Black", "White", "Red"],
    sizes: ["One Size"],
    description:
      "Культовая сумка-шоппер из прочного хлопкового канваса с фирменным принтом лагеря. Просторное основное отделение легко вместит все необходимое — от пляжных принадлежностей до походного набора. Внутренний карман на молнии надежно сохранит ваши ценности, а усиленные ручки выдержат любые приключения. Эта сумка — идеальный компаньон для тех, кто всегда готов к новым открытиям, как в те беззаботные дни в лагере. Носите с собой частичку лагерного духа каждый день!",
    images: [
      "/bag.jpg", 
      "/bag-2.jpg",
    ],
  },
  {
    id: 5,
    name: "Бомбер",
    price: 3490,
    category: "bomber",
    image: "/bomber.jpg",
    colors: ["White", "Black", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Культовый бомбер, вдохновленный традицией вечерних посиделок у костра. Изготовлен из премиального хлопка с добавлением эластана для идеальной посадки. Утепленная подкладка сохранит тепло в прохладные вечера, как те самые лагерные костры. Фирменная вышивка #DRPWR на груди и нашивка лагеря на рукаве напомнят о беззаботных днях и песнях под гитару. Практичные карманы на кнопках, эластичные манжеты и воротник-стойка — этот бомбер сочетает в себе ностальгию и современный стиль. Для тех, кто хранит лагерный дух в сердце.",
    images: ["/bomber.jpg", "/placeholder.svg?height=400&width=400"],
  },
  {
    id: 6,
    name: "Жилетка",
    price: 5490,
    category: "jackets",
    image: "/jacket.jpg",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Элегантная жилетка в лагерном стиле, вдохновленная формой вожатых и капитанов команд. Изготовлена из плотного хлопкового твила с водоотталкивающей пропиткой — выдержит и утреннюю росу, и внезапный летний дождь. Классический крой с двумя накладными карманами и декоративными пуговицами с якорями отсылает к традициям лагерных линеек и парадов. Внутренняя подкладка с принтом карты лагеря — секретный элемент для настоящих ценителей. Эта жилетка — символ лидерства и командного духа, который останется с вами на долгие годы после последнего лагерного звонка.",
    images: [
      "/jacket.jpg",
      "/jacket-2.jpg",
      "/jacket-3.jpg",
    ],
  },
  {
    id: 7,
    name: "Beanie",
    price: 1490,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    colors: ["Black", "Gray", "Burgundy"],
    sizes: ["One Size"],
    description:
      "Стильная вязаная шапка из мягкой акриловой пряжи с добавлением шерсти. Плотная вязка сохраняет тепло даже в самые холодные дни. Универсальный дизайн подходит к любому стилю одежды. Компактная и легкая - всегда поместится в кармане или рюкзаке.",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
  },
  {
    id: 8,
    name: "Long Sleeve Tee",
    price: 3990,
    category: "t-shirts",
    image: "/placeholder.svg?height=400&width=400",
    colors: ["White", "Black", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Стильная футболка с длинными рукавами из плотного хлопкового джерси. Современный приталенный крой подчеркивает фигуру, а качественная ткань обеспечивает комфорт и долговечность. Идеальна для межсезонья и создания многослойных образов. Базовая вещь, которая никогда не выйдет из моды.",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
  },
]

const categories = [
  { value: "all", label: "Все товары" },
  { value: "t-shirts", label: "Футболки" },
  { value: "caps", label: "Кепки" },
  { value: "hoodies", label: "Худи" },
  { value: "sweatshirts", label: "Свитшоты" },
  { value: "bomber", label: "Бомберы" },
  { value: "jackets", label: "Жилетки" },
  { value: "accessories", label: "Аксессуары" },
]

export default function DRPMerchStore() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const openProductModal = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev === selectedProduct.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <h1 className="text-2xl font-bold">DRPMerch</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-16" style={{
  backgroundImage: 'url(/oka.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4" style={{
  color: 'aliceblue'
}}># D R P W R</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4" style={{
  color: 'aliceblue',
  background: 'rgba(0, 0, 0, 0.56)',
  fontFamily: 'monospace'
}}>
            Носи воспоминания о лучших днях в лагере. Каждая вещь — частичка тех незабываемых моментов, песен у костра и
            дружбы, которая остаётся на всю жизнь. Твоя история. Твой лагерь. Твой стиль.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
          <h3 className="text-xl md:text-2xl font-semibold">Наши товары</h3>
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Фильтр по категории" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openProductModal(product)}
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
                      <Badge key={color} variant="secondary" className="text-xs">
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
          ))}
        </div>
      </section>

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={closeProductModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={selectedProduct.images[currentImageIndex] || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
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
                  {selectedProduct.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {selectedProduct.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                            currentImageIndex === index ? "border-primary" : "border-gray-200"
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${selectedProduct.name} ${index + 1}`}
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
                    <p className="text-3xl font-bold mb-4">{selectedProduct.price} ₽</p>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Colors */}
                  <div>
                    <h4 className="font-semibold mb-3">Доступные цвета:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color) => (
                        <Badge key={color} variant="outline" className="px-3 py-1">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h4 className="font-semibold mb-3">Размеры:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
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

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2024 DRPMerch. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
