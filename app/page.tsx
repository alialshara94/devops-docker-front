import { getAllPersons } from "@/lib/api"
import { PersonTable } from "@/components/person-table"

export default async function Home() {
  // Get persons data, which will be empty if API is unavailable
  const persons = await getAllPersons()

  return (
    <main className="container py-8">
      <PersonTable persons={persons} />
    </main>
  )
}

