import { getSession } from "@/libs/libs"
import { redirect } from "next/navigation"
import Link from "next/link"
import TransactionsTable from "@/components/amin/transactions/TransactionsTable"

const AdminDashboard = async () => {
  const userData = await getSession()
  var total = 0
  if(userData.userData.role != "admin") redirect("/");

  const transactionsReq = await fetch(`${process.env.BASE_URL}/api/transactions/lastTransactions`, {cache: "no-cache"});
  const transactions = await transactionsReq.json()

  transactions.transactions.map(t => {
    let date = new Date()
    let jsDate = date.toISOString("es-co")
    let now = jsDate.slice(0, 10)
    
    if(now == t.date.slice(0, 10)){
      total += t.amount
    }
  })

  return (
    <div className="bg-slate-300 p-4 w-4/5 mx-auto mt-10">
      <h1 className="text-center text-2xl">Bienvenido a administración!!</h1>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <Link  href={"/admins/transactions"} className="col-span-1 border flex justify-center items-center bg-green-500 p-4 hover:bg-green-600 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path> <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path> <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path> <path d="M3 6v10c0 .888 .772 1.45 2 2"></path> <path d="M3 11c0 .888 .772 1.45 2 2"></path> </svg> </span>
          <span>Transacciones</span>
        </Link>
        <Link  href={"/admins/users"} className="col-span-1 border flex justify-center items-center bg-indigo-500 p-4 hover:bg-indigo-600 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg> </span>
          <span>Usuarios</span>
        </Link>
        <Link  href={"/admins/category"} className="col-span-1 border flex justify-center items-center bg-purple-500 p-4 hover:bg-purple-600 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M4 6l16 0"></path> <path d="M4 12l16 0"></path> <path d="M4 18l12 0"></path> </svg> </span>
          <span>Categorias</span>
        </Link>
        <Link  href={"/admins/courses"} className="col-span-1 border flex justify-center items-center bg-yellow-500 p-4 hover:bg-yellow-600 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path> <path d="M16 3l-4 4l-4 -4"></path> </svg> </span>
          <span>Cursos</span>
        </Link>
        <Link  href={"/admins/certificates"} className="col-span-1 border flex justify-center items-center bg-pink-500 p-4 hover:bg-pink-600 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path> <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path> <path d="M6 9l12 0"></path> <path d="M6 12l3 0"></path> <path d="M6 15l2 0"></path> </svg> </span>
          <span>Certificados</span>
        </Link>
      </div>

      <h2 className="text-center text-2xl mt-4">Ultimas transacciones</h2>
      <div>
        <p className="bg-slate-800 text-white w-fit mx-auto my-2 px-4 py-2">Total hoy: ${total}</p>
        <TransactionsTable transactions={transactions.transactions}></TransactionsTable>
      </div>
    </div>
  )
}

export default AdminDashboard