import StatCard from "../components/StatCard";

export default function DashboardPage() {
  return (
    <section>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <StatCard label="pH Level" value="--" />
        <StatCard label="Temperature" value="--" />
        <StatCard label="Water Level" value="--" />
      </div>

      <div className="bg-white h-64 rounded shadow flex items-center justify-center">
        <p className="text-gray-400">Chart goes here</p>
      </div>
    </section>
  );
}
