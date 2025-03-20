import { getSession } from "@/libs/libs"
import CertificatesClient from "@/components/amin/certificates/CertificatesClient"
import { redirect } from "next/navigation"

const page = async () => {
    const userData = await getSession()
    if(!userData.userData || userData.userData.role == "user"){ redirect("/") }

    const certificatesReq = await fetch(process.env.BASE_URL+"/api/certificates/")
    const certificates = await certificatesReq.json()

    return (
        <CertificatesClient certificates={certificates.certificates} role={userData.userData.role}></CertificatesClient>
    )
}

export default page