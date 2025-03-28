"use client"

import { createPerson } from "@/lib/api"
import { PersonForm } from "@/components/person-form"
import type { Person } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function AddPersonPage() {
  const router = useRouter()

  const handleSubmit = async (data: Person) => {
    try {
      const result = await createPerson(data)
      if (result) {
        router.push("/")
      } else {
        // Handle error silently - the API client already logs errors
        router.push("/")
      }
    } catch (error) {
      console.error("Error creating person:", error)
      router.push("/")
    }
  }

  return (
    <main className="container py-8">
      <PersonForm
        onSubmit={handleSubmit}
        title="Add New Person"
        description="Create a new contact in the directory"
        submitLabel="Create Person"
      />
    </main>
  )
}

