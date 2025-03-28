"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { type Person, deletePerson } from "@/lib/api"

interface PersonTableProps {
  persons: Person[]
}

type SortField = "firstName" | "lastName" | "email"
type SortDirection = "asc" | "desc"

export function PersonTable({ persons }: PersonTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("lastName")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = async () => {
    if (!personToDelete?.id) return

    try {
      const success = await deletePerson(personToDelete.id)
      if (success) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting person:", error)
    } finally {
      setPersonToDelete(null)
    }
  }

  const filteredPersons = persons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedPersons = [...filteredPersons].sort((a, b) => {
    const fieldA = a[sortField].toLowerCase()
    const fieldB = b[sortField].toLowerCase()

    if (sortDirection === "asc") {
      return fieldA.localeCompare(fieldB)
    } else {
      return fieldB.localeCompare(fieldA)
    }
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 ml-1" />
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>People Directory</CardTitle>
            <CardDescription>Manage your contacts in one place</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button asChild>
              <Link href="/add">Add Person</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("firstName")}>
                  <div className="flex items-center">
                    First Name
                    <SortIcon field="firstName" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("lastName")}>
                  <div className="flex items-center">
                    Last Name
                    <SortIcon field="lastName" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                  <div className="flex items-center">
                    Email
                    <SortIcon field="email" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPersons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    {searchTerm
                      ? "No people found matching your search"
                      : "No people available. The API may be offline or no people have been added yet."}
                  </TableCell>
                </TableRow>
              ) : (
                sortedPersons.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.firstName}</TableCell>
                    <TableCell>{person.lastName}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild title="View Profile">
                          <Link href={`/profile/${person.id}`}>
                            <UserIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild title="Edit Person">
                          <Link href={`/edit/${person.id}`}>
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive"
                              title="Delete Person"
                              onClick={() => setPersonToDelete(person)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Person</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {personToDelete?.firstName} {personToDelete?.lastName}?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

