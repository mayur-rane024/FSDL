const Loader = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="h-11 w-11 animate-spin rounded-full border-4 border-cyan-300/80 border-t-transparent" />
    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-100/70">Loading</p>
  </div>
);

export default Loader;
