import { motion, useTransform, useScroll } from "framer-motion"
import { useRef, useEffect } from "react"
import { ArrowDownCircle } from "lucide-react"

import { smoothScrollTo } from "@/lib/smoothScrollTo"
import { easeOutCubic } from "@/lib/easingFunctions"

export default function Hero({ contentRef, ...props }: { contentRef: React.RefObject<HTMLDivElement> }) {

    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"] // отслеживаем выход Hero из вьюпорта
    })

    // Анимации: масштаб и прозрачность
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2])
    const positionY = useTransform(scrollYProgress, [0, 1], [0, -1000])

    // Автодоскролл вниз при скролле ВНИЗ
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (window.scrollY > window.innerHeight / 4 && window.scrollY < window.innerHeight / 2 && e.deltaY > 0) {
                if (contentRef.current) {
                    const offsetTop = contentRef.current.offsetTop
                    smoothScrollTo(offsetTop, 1500, easeOutCubic)
                }
            }
        }

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
                    smoothScrollTo(offsetTop, 1500)
                }
            }
        }

        window.addEventListener("wheel", handleScroll, { passive: true })
        window.addEventListener("touchstart", onTouchStart, { passive: true })
        window.addEventListener("touchend", onTouchEnd, { passive: true })

        return () => {
            window.removeEventListener("wheel", handleScroll)
            window.removeEventListener("touchstart", onTouchStart)
            window.removeEventListener("touchend", onTouchEnd)
        }
    }, [])

    return (<>
        <motion.section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center flex-col"
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
            <motion.div style={{ y: positionY, flexGrow: 1, alignContent: "center" }}>
                <motion.div className="relative z-10 text-center text-white px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow mb-6">
                        # D R P R P B L C
                    </h1>
                </motion.div>
                <motion.div className="relative z-10 text-center text-white px-4"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1 }}
                >
                    <p className="text-md md:text-xl bg-black/50 p-4 rounded max-w-xl mx-auto font-mono">
                        Носи воспоминания о лучших днях в лагере. Каждая вещь — частичка тех незабываемых моментов, песен у костра и
                        дружбы, которая остаётся на всю жизнь. Твоя история. Твой лагерь. Твой стиль.
                    </p>
                </motion.div>
            </motion.div>
            <motion.div className="relative text-white z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{
                    opacity: { duration: 2, delay: 3 },
                    scale: {
                        duration: 3,
                        repeat: 5,
                    }
                }}
                style={{ bottom: "6vh" }}
            >
                {/* Scroll Down Button */}
                <button
                    onClick={() => {
                        if (contentRef.current) {
                            const offsetTop = contentRef.current.offsetTop
                            smoothScrollTo(offsetTop, 1500)
                        }
                    }}
                    className=""
                    aria-label="Scroll Down"
                >
                    <ArrowDownCircle className="w-8 h-8" />
                </button>
            </motion.div>
        </motion.section >
    </>)
}