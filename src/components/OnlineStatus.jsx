export default function OnlineStatus() {
  return (
    <div className="flex items-center gap-1">
      {/* Punto verde con efecto parpadeo */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>

      {/* Texto */}
      <span className="text-xs text-green-500 font-semibold tracking-wide ">EN LíNEA</span>
    </div>
  );
}