"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Map, AlertTriangle, Users, Database, Shield } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header avec effet de scroll */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/sonatrach-logo-vector.svg"
              alt="Sonatrach Logo"
              className="h-12 transition-transform duration-300 hover:scale-105"
            />
            <span className="ml-3 text-xl font-bold">SonatrackEP</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#F08100] transition-colors">
              Fonctionnalités
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#F08100] transition-colors">
              À propos
            </a>
            <a href="#contact" className="text-gray-700 hover:text-[#F08100] transition-colors">
              Contact
            </a>
            <Link href="/login">
              <Button className="bg-[#F08100] hover:bg-orange-700 transition-all duration-300 hover:shadow-lg">
                Connexion
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/login">
              <Button className="bg-[#F08100] hover:bg-orange-700">Connexion</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Gestion Intelligente des Opérations <span className="text-[#F08100]">E&P en Algérie</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Une plateforme complète et intuitive pour la gestion, le suivi et l'analyse des opérations d'exploration
                et de production pétrolière sur l'ensemble du territoire algérien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-[#F08100] hover:bg-orange-700 transition-all duration-300 hover:shadow-lg"
                  >
                    Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-[#F08100] text-[#F08100] hover:bg-orange-50">
                  Voir la démo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#F08100] to-orange-500 opacity-30 blur-lg"></div>
                <img
                  src="/offshore-platform-silhouette.png"
                  alt="Plateforme pétrolière"
                  className="relative rounded-lg shadow-2xl w-full max-w-lg object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Décoration d'arrière-plan */}
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg width="400" height="400" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#F08100" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#F08100" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="#F08100" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold text-[#F08100] mb-2">250+</div>
              <div className="text-gray-600">Puits gérés</div>
            </div>
            <div className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold text-[#F08100] mb-2">15+</div>
              <div className="text-gray-600">Champs pétroliers</div>
            </div>
            <div className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold text-[#F08100] mb-2">98%</div>
              <div className="text-gray-600">Taux de disponibilité</div>
            </div>
            <div className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="text-4xl font-bold text-[#F08100] mb-2">24/7</div>
              <div className="text-gray-600">Support technique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fonctionnalités principales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme offre des outils puissants pour optimiser vos opérations d'exploration et de production
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Map className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cartographie interactive</h3>
              <p className="text-gray-600">
                Visualisez l'ensemble des champs pétroliers sur une carte interactive et accédez aux données détaillées
                en temps réel.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Analyses avancées</h3>
              <p className="text-gray-600">
                Générez des rapports détaillés et visualisez les tendances pour prendre des décisions éclairées basées
                sur les données.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <AlertTriangle className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Alertes et incidents</h3>
              <p className="text-gray-600">
                Recevez des notifications en temps réel sur les incidents et gérez efficacement les situations
                critiques.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gestion d'équipe</h3>
              <p className="text-gray-600">
                Coordonnez les équipes sur le terrain et optimisez l'allocation des ressources humaines.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Database className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Base de données centralisée</h3>
              <p className="text-gray-600">
                Accédez à toutes les informations depuis une base de données unifiée et sécurisée.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-[#F08100]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité avancée</h3>
              <p className="text-gray-600">
                Protégez vos données sensibles grâce à des protocoles de sécurité de pointe et des contrôles d'accès
                granulaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section à propos */}
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <img
                src="/algeria-oil-fields.png"
                alt="Carte des champs pétroliers"
                className="rounded-lg shadow-xl w-full max-w-lg mx-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">À propos de SonatrackEP</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SonatrackEP est une solution développée spécifiquement pour répondre aux besoins des opérations
                d'exploration et de production pétrolière en Algérie. Notre plateforme combine des technologies de
                pointe avec une interface intuitive pour offrir une expérience utilisateur optimale.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Développée en collaboration avec des experts du secteur, notre solution permet d'améliorer l'efficacité
                opérationnelle, de réduire les coûts et d'optimiser la prise de décision.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#F08100] mr-2"></div>
                  <span>Interface intuitive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#F08100] mr-2"></div>
                  <span>Données en temps réel</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#F08100] mr-2"></div>
                  <span>Support multilingue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#F08100] mr-2"></div>
                  <span>Accès mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment SonatrackEP transforme les opérations E&P au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#F08100] font-bold text-xl mr-4">
                  KB
                </div>
                <div>
                  <div className="font-bold">Karim Benali</div>
                  <div className="text-gray-500 text-sm">Chef d'équipe, Hassi Messaoud</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "SonatrackEP a considérablement amélioré notre efficacité opérationnelle. L'interface intuitive et les
                données en temps réel nous permettent de prendre des décisions plus rapidement et avec plus de
                précision."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#F08100] font-bold text-xl mr-4">
                  MB
                </div>
                <div>
                  <div className="font-bold">Meriem Boudiaf</div>
                  <div className="text-gray-500 text-sm">Ingénieure, Berkine</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "La cartographie interactive et les outils d'analyse sont particulièrement utiles pour notre équipe.
                Nous pouvons visualiser l'ensemble de nos opérations et identifier rapidement les opportunités
                d'optimisation."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#F08100] font-bold text-xl mr-4">
                  AK
                </div>
                <div>
                  <div className="font-bold">Ahmed Khelil</div>
                  <div className="text-gray-500 text-sm">Directeur des opérations</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Le système d'alertes et de notifications nous a permis de réduire considérablement le temps de réponse
                aux incidents. Un outil indispensable pour la gestion quotidienne de nos opérations."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-gradient-to-r from-[#F08100] to-orange-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à optimiser vos opérations E&P?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez les nombreuses équipes qui font confiance à SonatrackEP pour la gestion de leurs opérations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-[#F08100] hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                Commencer maintenant
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-600">
              Demander une démo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/sonatrach-logo-vector.svg" alt="Sonatrach Logo" className="h-10 invert" />
                <span className="ml-3 text-xl font-bold">SonatrackEP</span>
              </div>
              <p className="text-gray-400">
                Système de gestion des opérations d'exploration et de production pétrolière en Algérie
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutoriels
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support technique
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Siège Sonatrach, Alger, Algérie</li>
                <li>contact@sonatrackep.dz</li>
                <li>+213 (0) 21 54 XX XX</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">© 2025 SonatrackEP. Tous droits réservés.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
