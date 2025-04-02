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
    })

    return (
        // <p>Hola</p>
        <UsersClient users={users} admin={false} ></UsersClient>
    )
}

export default page