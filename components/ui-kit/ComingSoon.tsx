import "./comingSoon.css"

export default function ComingSoon() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-4">

            <div className="relative inline-block rounded-lg overflow-hidden mb-4" >
                {/* Фоновый прямоугольник */}
                <div className="absolute inset-0 scrolling-text" />
                <div className="absolute inset-0 bg-black" style={{ opacity: 0.2 }} />

                {/* Текст поверх */}
                <h2 className="relative text-2xl md:text-5xl text-white px-5 py-4" style={{ fontFamily: "DaysSans" }}>
                    Скоро здесь появится новая коллекция
                </h2>
            </div>
            <p className="text-md md:text-lg text-gray-800" style={{ fontFamily: "Manrope", fontWeight: 400 }}>
                Следите за новостями — мы готовим что-то особенное для вас.
            </p>

        </section>
    )
}