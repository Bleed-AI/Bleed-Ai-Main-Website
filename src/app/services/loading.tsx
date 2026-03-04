export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B1130F]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff3d38]/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-4 border-[var(--border-color)] border-t-[#B1130F] rounded-full animate-spin mx-auto mb-6" />

        <p className="text-[var(--text-secondary)] text-sm">Loading page...</p>
      </div>
    </div>
  );
}
