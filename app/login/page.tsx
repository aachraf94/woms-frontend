"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img src="/sonatrach-logo-vector.svg" alt="Sonatrach Logo" className="h-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Connexion à SonatrackEP</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Système de gestion des opérations E&P en Algérie</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="nom@sonatrach.dz" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#F08100] hover:text-orange-700">
                      Mot de passe oublié?
                    </a>
                  </div>
                </div>
                <div className="mt-1">
                  <Input id="password" name="password" type="password" autoComplete="current-password" />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="ml-2">
                  Rester connecté
                </Label>
              </div>

              <div>
                <Button type="submit" className="w-full bg-[#F08100] hover:bg-orange-700">
                  Se connecter
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Application réservée au personnel autorisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
