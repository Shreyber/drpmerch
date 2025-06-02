"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import LoadingScreen from "@/components/layout/LoadingScreen"
import Hero from "@/components/layout/Hero"
import Footer from "@/components/layout/Footer"
import Products from "@/components/products/Products"

import { preloadImage } from "@/lib/preloadImage"


export default function DRPMerchStore() {

	const [isLoading, setIsLoading] = useState(true)
	const [showContent, setShowContent] = useState(false)
	const [isLoadingScreenReady, setIsLoadingScreenReady] = useState(false)

	const contentRef = useRef<null | HTMLDivElement>(null)

	// Сброс скролла при загрузке страницы
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// Обработка экрана загрузки
	useEffect(() => {
		if (isLoadingScreenReady) {
			preloadImage('/oka.png')

			const timeout = setTimeout(() => {
				setIsLoading(false)
				// задержка перед показом основного контента
				setTimeout(() => {
					setShowContent(true)
				}, 500)
			}, 3000) // длительность загрузки

			return () => clearTimeout(timeout)
		}
	}, [isLoadingScreenReady])

	return (
		<>
			<AnimatePresence>
				{isLoading && (
					<LoadingScreen onReady={() => setIsLoadingScreenReady(true)} />
				)}
			</AnimatePresence>
			{showContent && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 3 }}
					style={{
						minHeight: "100vh",
						backgroundColor: "#FAF8F5",
					}}
				>
					<Hero contentRef={contentRef} />
					<Products ref={contentRef} />
					<Footer />
				</motion.div>
			)}
		</>
	)
}
