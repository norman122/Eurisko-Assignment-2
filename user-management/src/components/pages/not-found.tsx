export default function NotFound() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500 text-center p-8">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </main>
  );
}
