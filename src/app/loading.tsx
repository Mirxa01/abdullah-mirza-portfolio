/**
 * Loading skeleton displayed during route transitions.
 */
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[var(--color-electric-blue)] animate-spin" />
                <p className="text-white/40 text-sm font-medium tracking-widest uppercase">Loading</p>
            </div>
        </div>
    );
}
