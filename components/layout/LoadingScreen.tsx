import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import { TentIcon } from "@/components/ui-kit/TentIcon"

type Props = {
    onReady: () => void
}

export default function LoadingScreen({ onReady }: Props) {
    const [isReady, setIsReady] = useState(false)

    // Прогружаем картинку для загрузочного экрана
    useEffect(() => {
        const image = new Image()
        image.src = '/polenovo-dark.png'
        image.onload = () => {
            setIsReady(true)
            onReady()
        }

        return () => { image.onload = null }
    }, [])

    return (<>
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            {isReady &&
                <motion.div
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    transition={{
                        opacity: { duration: 4 },
                        scale: { duration: 4, delay: 1 }
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/polenovo-dark.png)', zIndex: -1, transformOrigin: 'bottom' }}
                />
            }
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1 }}
                transition={{ duration: 4, delay: 1 }}
                className="flex items-center justify-center flex-col text-center">
                <h1 className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: "Comfortaa"}}>Погружаемся в детство</h1>
                <TentIcon />
            </motion.div>
        </motion.div>
    </>)
}