const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/75 p-4">
      <div className="glass w-full max-w-md rounded-2xl border border-white/25 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cyan-100">{title}</h3>
          <button className="rounded-lg bg-white/20 px-2 py-1 text-sm transition hover:bg-white/30" onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
