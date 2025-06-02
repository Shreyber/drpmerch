export default function Footer() {
    return (
        <footer className="bg-muted py-8"
            style={{
                backgroundImage: "url(/oka.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="container mx-auto px-4 text-center">
                <p className="text-lg font-black text-white">&copy; 2025 DRPMerch. Все права защищены.</p>
            </div>
        </footer>
    )
}