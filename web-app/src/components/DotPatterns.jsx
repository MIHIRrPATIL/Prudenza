export default function DotPattern() {
    return (
      <div className=" inset-0 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-3 gap-2 opacity-30">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="w-2 h-2 bg-white/50 rounded-full"></span>
          ))}
        </div>
      </div>
    );
  }
  