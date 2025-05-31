"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Filter, ChevronLeft, ChevronRight, ArrowDownCircle } from "lucide-react"
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
      "/tshirt.jpg"
    ],
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 5990,
    category: "hoodies",
    image: "/hoodie-4.jpg",
    colors: ["Gray", "Black", "Maroon"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Роскошная толстовка из смесового хлопка с флисовой подкладкой. Невероятно мягкая и теплая, она станет вашей любимой вещью в гардеробе. Современный крой подчеркивает силуэт, а качественные материалы гарантируют долговечность. Идеальна для прохладных вечеров и активного отдыха.",
    images: [
      "/hoodie-4.jpg",
      "/hoodie-2.jpg",
      "/hoodie-3.jpg",
      "/hoodie.jpg",
    ],
  },
  {
    id: 3,
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
    id: 4,
    name: "Бомбер",
    price: 3490,
    category: "bomber",
    image: "/bomber.jpg",
    colors: ["White", "Black", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Культовый бомбер, вдохновленный традицией вечерних посиделок у костра. Изготовлен из премиального хлопка с добавлением эластана для идеальной посадки. Утепленная подкладка сохранит тепло в прохладные вечера, как те самые лагерные костры. Фирменная вышивка #DRPWR на груди и нашивка лагеря на рукаве напомнят о беззаботных днях и песнях под гитару. Практичные карманы на кнопках, эластичные манжеты и воротник-стойка — этот бомбер сочетает в себе ностальгию и современный стиль. Для тех, кто хранит лагерный дух в сердце.",
    images: [
      "/bomber.jpg"
    ],
  },
  {
    id: 5,
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
    id: 6,
    name: "Vintage Cap",
    price: 1990,
    category: "caps",
    image: "/cap.jpg",
    colors: ["Black", "Khaki", "Navy"],
    sizes: ["One Size"],
    description:
      "Винтажная кепка в стиле 90-х с регулируемым ремешком. Изготовлена из прочного хлопкового твила, который становится только лучше со временем. Классический дизайн дополнит любой образ - от спортивного до кэжуал. Защитит от солнца и добавит харизмы вашему стилю.",
    images: [
      "/cap.jpg"
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
  const [scrolled, setScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)


  const heroRef = useRef(null)
  const contentRef = useRef<null | HTMLDivElement>(null); 
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // отслеживаем выход Hero из вьюпорта
  })

  // Анимации: масштаб и прозрачность
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      window.scrollTo(0, startY + distance * ease)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
      // задержка перед показом основного контента
      setTimeout(() => {
        setShowContent(true)
      }, 0)
    }, 2000) // длительность загрузки

    return () => clearTimeout(timeout)
  }, [])

  // Автодоскролл вниз при скролле ВНИЗ
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (window.scrollY > window.innerHeight / 4 && window.scrollY < window.innerHeight / 2 && e.deltaY > 0) {
        if (contentRef.current) {
          const offsetTop = contentRef.current.offsetTop
          smoothScrollTo(offsetTop, 1500) // 1500 мс — замедленный скролл
        }
      }
    }
    window.addEventListener("wheel", handleScroll, { passive: true })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [])

  useEffect(() => {
  let touchStartY = 0

  const onTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY
  }

  const onTouchEnd = (e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY - touchEndY

    // Только если свайп вниз и пользователь ещё на hero
    if (deltaY > 30 && window.scrollY < window.innerHeight / 2) {
      if (contentRef.current) {
        const offsetTop = contentRef.current.offsetTop
        smoothScrollTo(offsetTop, 1500) // 1500 мс — замедленный скролл
      }
    }
  }

  window.addEventListener("touchstart", onTouchStart, { passive: true })
  window.addEventListener("touchend", onTouchEnd, { passive: true })

  return () => {
    window.removeEventListener("touchstart", onTouchStart)
    window.removeEventListener("touchend", onTouchEnd)
  }
}, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const CampfireIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    className="w-16 h-16"
    animate={{
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <path d="M361.155 91.245l-18 .193.42 38.98c-45.773 13.285-108.533 19.738-166.474 23.573 35.097 96.284 99.357 173.77 157.845 257.13 20.718-19.655 51.11-31.983 83.46-36.01-20.8-18.109-36.634-27.966-58.833-70.438 31.27 37.085 52.579 48.467 77.623 62.006 3.263-13.094 8.938-24.638 18.721-32.674 8.667-7.12 20.026-10.654 33.53-10.344-46.874-59.763-101.67-117.054-127.83-189.435l-.462-42.98zM163.25 102.92l-17.998.244s.25 18.34.56 36.97c.156 9.316.325 18.703.489 25.929.06 2.636.117 4.58.174 6.542-34.378 83.733-69.154 160.993-123.92 233.442 33.635-1.387 66.326-1.203 98.552-.041 22.263-62.617 23.346-134.855 35.627-202.006 11.417 68.562 10.566 139.445 33.483 205.83 42.962 3.082 85.69 7.198 129.35 10.926-55.67-79.151-118.213-155.037-155.118-249.365-.05-1.782-.1-3.396-.152-5.737-.162-7.156-.333-16.523-.488-25.82-.31-18.594-.559-36.914-.559-36.914z" />
  </motion.svg>
  )

  return (
    <>
    <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/polenovo-dark.png)', zIndex: -1 }}
            />
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="flex items-center justify-center flex-col text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">Погружаемся в детство</h1>
              <CampfireIcon />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    {showContent && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="border-b">
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
      </header> */}

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Фон с эффектом приближения */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url(/oka.png)",
            scale
          }}
        />

        {/* Текст */}
        <motion.div className="relative z-10 text-center text-white px-4"
          style={{ opacity }}>
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow mb-6">
            # D R P R P B L C
          </h1>
          <p className="text-md md:text-xl bg-black/50 p-4 rounded max-w-xl mx-auto font-mono">
            Носи воспоминания о лучших днях в лагере. Каждая вещь — частичка тех незабываемых моментов, песен у костра и
                  дружбы, которая остаётся на всю жизнь. Твоя история. Твой лагерь. Твой стиль.
          </p>
        </motion.div>

          {/* Scroll Down Button */}
          <button
            onClick={() => {
              if (contentRef.current) {
                const offsetTop = contentRef.current.offsetTop
                smoothScrollTo(offsetTop, 1500) // 1500 мс — замедленный скролл
              }
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white transition-colors z-10"
            aria-label="Scroll Down"
          >
            <ArrowDownCircle className="w-8 h-8" />
          </button>

      </motion.section>

      {/* Filters */}
      {/* <section className="container mx-auto px-4 py-6 md:py-8"> */}
      <motion.section
        ref={contentRef}
        className="container mx-auto px-4 py-6 md:py-8"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
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
      </motion.section>
      {/* </section> */}

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
          <p className="text-sm text-muted-foreground">&copy; 2025 DRPMerch. Все права защищены.</p>
        </div>
      </footer>
    </div>
    </motion.div>
    )}
  </>
  )
}
