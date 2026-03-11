const Toast = ({ message, type = 'info' }) => {
  if (!message) return null;
  const palette = {
    info: 'bg-cyan-500/15 border-cyan-300/50 text-cyan-100',
    success: 'bg-emerald-500/15 border-emerald-300/50 text-emerald-100',
    error: 'bg-red-500/15 border-red-300/50 text-red-100',
  };
  return (
    <div className={`mb-4 rounded-xl border px-3 py-2 text-sm backdrop-blur-sm ${palette[type] || palette.info}`}>
      {message}
    </div>
  );
};

export default Toast;
