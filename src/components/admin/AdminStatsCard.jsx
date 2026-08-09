export default function AdminStatsCard({ label, value, icon: Icon, tone = 'success' }) {
  const tones = {
    success: 'bg-success/10 text-success-dark',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tones[tone]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-tiny text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
