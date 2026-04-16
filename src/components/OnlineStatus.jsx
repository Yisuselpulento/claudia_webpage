export default function OnlineStatus() {
  return (
    <div className="flex items-center gap-2">
      {/* Punto verde con efecto parpadeo */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>

      {/* Texto */}
      <span className="text-sm text-green-500 font-semibold tracking-wider">EN LíNEA</span>
    </div>
  );
}