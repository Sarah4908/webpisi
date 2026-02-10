export default function Header() {
  return (
    <header className="mb-8 flex justify-between items-center">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <button className="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </header>
  );
}
