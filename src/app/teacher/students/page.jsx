'use client'

import { useState, useEffect } from "react"
import UsersClient from "@/components/amin/users/UsersClient"
import { getSession } from "@/libs/libs"

const page = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            let session = await getSession()
            let res = await fetch(`/api/users/getTeacherStudents/${session.userData.id}`)
            let users = await res.json()
            setUsers(Array.from(users.users))
        }
        fetchData()
    }, [])

    return (
        <div>
            {users != [] ? ( 
                <UsersClient users={users} admin={false} ></UsersClient>
            ) : (<p className="text-center block mx-auto">Cargando contenido...</p>)}
        </div>
    )
}

export default page