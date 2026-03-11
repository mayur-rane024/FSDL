const PolicyCard = ({ policy, onApply }) => {
  return (
    <div className="glass animate-floatIn rounded-2xl p-5 shadow-glass transition duration-300 hover:-translate-y-1 hover:border-cyan-200/40">
      <p className="mb-2 inline-block rounded-full border border-cyan-200/40 bg-cyan-300/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
        {policy.category}
      </p>
      <h3 className="text-xl font-semibold leading-tight">{policy.name}</h3>
      <p className="mt-2 min-h-16 text-sm text-slate-100/85">{policy.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <p className="rounded-lg bg-white/8 p-2">Premium: ${policy.premiumAmount}</p>
        <p className="rounded-lg bg-white/8 p-2">Coverage: ${policy.coverageAmount}</p>
        <p className="rounded-lg bg-white/8 p-2">Duration: {policy.durationInYears} yrs</p>
      </div>
      {onApply && (
        <button onClick={() => onApply(policy)} className="btn-primary mt-4 w-full">
          Apply Now
        </button>
      )}
    </div>
  );
};

export default PolicyCard;
