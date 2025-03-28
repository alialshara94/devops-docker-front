import { getPersonById } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"
import Link from "next/link"
import { AlertCircle, ArrowLeftIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  const person = await getPersonById(id)

  if (!person) {
    return (
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Directory
            </Link>
          </Button>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Person Not Found</AlertTitle>
            <AlertDescription>
              The requested person profile could not be found or the API is unavailable.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Directory
          </Link>
        </Button>

        <Card>
          <CardHeader className="bg-primary/5 pb-8">
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl">
                {person.firstName} {person.lastName}
              </CardTitle>
              <Button asChild>
                <Link href={`/edit/${person.id}`}>Edit Profile</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid gap-6">
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{person.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{person.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{person.address}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Date of Birth</p>
                <p className="text-sm text-muted-foreground">{format(new Date(person.dateOfBirth), "MMMM d, yyyy")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

