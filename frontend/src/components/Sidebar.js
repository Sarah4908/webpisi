export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">AQUASTASIS</h1>
      <nav className="space-y-4">
        <p className="text-gray-300 hover:text-white cursor-pointer">
          Dashboard
        </p>
        <p className="text-gray-400 cursor-not-allowed">
          Reports
        </p>
        <p className="text-gray-400 cursor-not-allowed">
          Settings
        </p>
      </nav>
    </aside>
  );
}
