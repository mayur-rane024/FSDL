const StatsCard = ({ title, value }) => (
  <div className="glass rounded-xl border border-white/20 p-4 transition hover:border-cyan-200/40 hover:bg-white/12">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{title}</p>
    <h4 className="mt-1 text-2xl font-bold text-cyan-100">{value}</h4>
  </div>
);

export default StatsCard;
