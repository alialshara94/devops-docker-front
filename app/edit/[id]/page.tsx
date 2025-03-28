"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getPersonById, updatePerson } from "@/lib/api"
import { PersonForm } from "@/components/person-form"
import type { Person } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EditPersonPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const data = await getPersonById(id)
        if (data) {
          setPerson(data)
        } else {
          setError("Person not found or API unavailable")
        }
      } catch (err) {
        setError("Failed to load person data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPerson()
  }, [id])

  const handleSubmit = async (data: Person) => {
    try {
      const result = await updatePerson(id, data)
      if (result) {
        router.push("/")
      } else {
        // If update fails, just go back to home
        router.push("/")
      }
    } catch (error) {
      console.error("Error updating person:", error)
      router.push("/")
    }
  }

  if (loading) {
    return (
      <main className="container py-8">
        <div className="w-full max-w-2xl mx-auto">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </main>
    )
  }

  if (error || !person) {
    return (
      <main className="container py-8">
        <div className="w-full max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>{error || "Person not found"}</p>
              <Button asChild className="w-fit mt-2">
                <Link href="/">Return to Home</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-8">
      <PersonForm
        initialData={person}
        onSubmit={handleSubmit}
        title="Edit Person"
        description="Update contact information"
        submitLabel="Save Changes"
      />
    </main>
  )
}

