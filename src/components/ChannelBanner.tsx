
/**
 * Component to display the channel banner
 * Resembles the YouTube channel header structure
 */
export default function ChannelBanner() {
    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl mb-10 shadow-2xl border-4 border-white/10 group">
            {/* Banner Image */}
            <div className="w-full aspect-[1408/768] relative">
                <img
                    src="/banner.png"
                    alt="Starlight Dreams Studio Banner"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay to ensure readability and starlight effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Channel Info Overlay - Optional, if needed to match YT style more closely */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex items-end">
                <div className="flex items-center space-x-4">
                    <div className="hidden sm:block">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl">
                            Starlight Dreams Studio
                        </h2>
                        <p className="text-purple-200 text-sm md:text-base font-semibold drop-shadow-lg">
                            ✨ Bedtime Stories & Educational Adventures
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
