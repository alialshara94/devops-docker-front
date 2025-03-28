// API client for the Person API

export interface Person {
  id?: number
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
  dateOfBirth: string
}

// Hardcoded API URL
const API_URL = "http://localhost:5001"

export async function getAllPersons(): Promise<Person[]> {
  try {
    const response = await fetch(`${API_URL}/api/Person`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      return []
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching all persons:", error)
    return []
  }
}

export async function getPersonById(id: number): Promise<Person | null> {
  try {
    const response = await fetch(`${API_URL}/api/Person/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error)
    return null
  }
}

export async function createPerson(person: Person): Promise<Person | null> {
  try {
    const response = await fetch(`${API_URL}/api/Person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error("Error creating person:", error)
    return null
  }
}

export async function updatePerson(id: number, person: Person): Promise<Person | null> {
  try {
    const response = await fetch(`${API_URL}/api/Person/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error(`Error updating person with ID ${id}:`, error)
    return null
  }
}

export async function deletePerson(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/Person/${id}`, {
      method: "DELETE",
    })

    return response.ok
  } catch (error) {
    console.error(`Error deleting person with ID ${id}:`, error)
    return false
  }
}

export async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/Person`, {
      method: "HEAD",
    })
    return response.ok
  } catch (error) {
    console.error("API availability check failed:", error)
    return false
  }
}

