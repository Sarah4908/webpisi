export default function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
