import Link from "next/link";

/**
 * Custom 404 page matching the portfolio's executive dark theme.
 */
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[#050505]">
            <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-electric-blue)] to-[var(--color-muted-gold)] mb-6">
                404
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                Page Not Found
            </h1>
            <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-md mb-8 leading-relaxed font-light">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-colors"
            >
                Return Home
            </Link>
        </div>
    );
}
