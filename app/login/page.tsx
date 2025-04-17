"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeftIcon } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler une connexion
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/sonatrach-logo-vector.svg" alt="Sonatrach Logo" className="h-20" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion à SonatrackEP</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Système de gestion des opérations E&P en Algérie</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Connectez-vous à votre compte</CardTitle>
            <CardDescription>Entrez vos identifiants pour accéder au système</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nom@sonatrach.dz" required />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-[#F08100] hover:text-[#F08100]">
                    Mot de passe oublié?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2 text-sm">
                  Rester connecté
                </Label>
              </div>

              <Button type="submit" className="w-full bg-[#F08100] hover:bg-orange-700" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-gray-600">
              Cette application est réservée au personnel autorisé de Sonatrach et ses partenaires.
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
