export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full border-b border-gray-200 p-2">
        <h1>VAROS</h1>
      </header>
      <main className="flex-1 p-16 flex-col">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Total Users</h3>
            <p className="text-2xl font-bold">100</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Criar usuario
            </button>
            <div>
              <h3 className="text-lg font-bold">Filters</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
