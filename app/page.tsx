import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Système de Gestion des Opérations E&P en Algérie</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plateforme complète pour la gestion, le suivi et l'analyse des opérations d'exploration et de production
          pétrolière sur l'ensemble du territoire algérien.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Connexion</h2>
          <form className="space-y-4">
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="nom@sonatrach.dz"
              />
            </div>
            <div className="text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input id="password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-orange-600 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Rester connecté
                </label>
              </div>
              <a href="#" className="text-sm text-orange-600 hover:text-orange-500">
                Mot de passe oublié?
              </a>
            </div>
            <Link href="/dashboard" className="w-full">
              <button
                type="button"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Se connecter
              </button>
            </Link>
          </form>
        </div>
      </main>
      <footer className="w-full p-4 border-t bg-white text-center text-gray-600">
        <p>© 2025 SonatrackEP - Système de Gestion E&P pour l'Algérie</p>
      </footer>
    </div>
  )
}
