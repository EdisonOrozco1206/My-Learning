import { getSession } from "@/libs/libs"
import { redirect } from "next/navigation"
import Link from "next/link"
import TransactionsTable from "@/components/amin/transactions/TransactionsTable"
import DownloadTransactionsReport from "@/components/excel/DownloadTransactionsReport"
import LineChart from "@/components/charts/LineChart"
import Image from "next/image"


const getWeeklyTransactions = (transactions) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= oneWeekAgo;
  });
};

const processChartData = (transactions) => {  
  const weeklyData = {};

  transactions.forEach(({ date, amount }) => {
    const day = new Date(date).toLocaleDateString();
    weeklyData[day] = (weeklyData[day] || 0) + amount;
  });

  const labels = Object.keys(weeklyData).sort();
  const dataPoints = labels.map(label => weeklyData[label]);

  return { labels, dataPoints };
};

const AdminDashboard = async () => {
  const userData = await getSession()
  var total = 0
  if(userData.userData.role != "admin") redirect("/");

  const countReq = await fetch(`${process.env.BASE_URL}/api/count/dashboard`, {cache: "no-cache"});
  const count = await countReq.json()
  

  const transactionsReq = await fetch(`${process.env.BASE_URL}/api/transactions/lastTransactions`, {cache: "no-cache"});
  const transactions = await transactionsReq.json()

  const allTransactionsReq = await fetch(`${process.env.BASE_URL}/api/transactions/`, {cache: "no-cache"});
  const allTransactions = await allTransactionsReq.json()
  const weeklyTransactions = getWeeklyTransactions(allTransactions.transactions);
  const { labels, dataPoints } = processChartData(weeklyTransactions);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ingresos del día",
        data: dataPoints,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  transactions.transactions.map(t => {
    let date = new Date()
    let jsDate = date.toISOString("es-co")
    let now = jsDate.slice(0, 10)
    
    if(now == t.date.slice(0, 10)){
      total += t.amount
    }
  })

  return (
    <div className="bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10">
      <h1 className="text-center text-2xl">¡Bienvenido a administración!</h1>

      <div className="grid grid-cols-10 gap-4 mt-4">
        <Link  href={"/admins/transactions"} className="col-span-5 lg:col-span-2 border border-slate-800 flex justify-center items-center bg-white p-4 hover:bg-slate-200 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path> <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path> <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path> <path d="M3 6v10c0 .888 .772 1.45 2 2"></path> <path d="M3 11c0 .888 .772 1.45 2 2"></path> </svg> </span>
          <span>Transacciones</span>
        </Link>
        <Link  href={"/admins/users"} className="col-span-5 lg:col-span-2 border border-slate-800 flex justify-center items-center bg-white p-4 hover:bg-slate-200 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg> </span>
          <span>Usuarios</span>
        </Link>
        <Link  href={"/admins/category"} className="col-span-5 lg:col-span-2 border border-slate-800 flex justify-center items-center bg-white p-4 hover:bg-slate-200 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M4 6l16 0"></path> <path d="M4 12l16 0"></path> <path d="M4 18l12 0"></path> </svg> </span>
          <span>Categorías</span>
        </Link>
        <Link  href={"/admins/courses"} className="col-span-5 lg:col-span-2 border border-slate-800 flex justify-center items-center bg-white p-4 hover:bg-slate-200 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path> <path d="M16 3l-4 4l-4 -4"></path> </svg> </span>
          <span>Cursos</span>
        </Link>
        <Link  href={"/admins/certificates"} className="col-span-10 lg:col-span-2 border border-slate-800 flex justify-center items-center bg-white p-4 hover:bg-slate-200 transition-all">
          <span><svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path> <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path> <path d="M6 9l12 0"></path> <path d="M6 12l3 0"></path> <path d="M6 15l2 0"></path> </svg> </span>
          <span>Certificados</span>
        </Link>
      </div>

      <div>
        <h2 className="text-center text-2xl mt-4">Últimas transacciones</h2>
        <div className="flex w-full lg:w-2/6 mx-auto justify-center gap-4 whitespace-nowrap">
          <p className="bg-slate-800 text-white w-fit my-2 px-4 py-2">Total hoy: ${total}</p>
          <DownloadTransactionsReport all={false}/>
        </div>
        <TransactionsTable transactions={transactions.transactions}></TransactionsTable>
      </div>
      <div className="mt-4">
        <h2 className="text-center text-2xl mt-4">Estadísticas</h2>
        <div className="flex flex-col lg:flex-row justify-between mt-4 gap-6">
          <div className="bg-white w-full lg:w-1/2 h-fit">
            <h2 className="text-center text-md mt-4">Ingresos esta semana</h2>
            <LineChart data={chartData}></LineChart>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full h-full grid grid-cols-3 gap-4">
              <div className="w-full bg-white p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" strokeWidth="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
                <p className=" w-full text-center border-b border-slate-900">Instructores</p>
                <span>Total: {count.teachers}</span>
              </div>
              <div className="w-full bg-white p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={40} height={40}  strokeWidth={2}> <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path> <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path> </svg> 
                <p className=" w-full text-center border-b border-slate-900">Aprendices</p>
                <span>Total: {count.users}</span>
              </div>
              <div className="w-full bg-white p-4 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={40} height={40}  strokeWidth={2}> <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path> <path d="M16 3l-4 4l-4 -4"></path> </svg> 
                <p className=" w-full text-center border-b border-slate-900">Cursos</p>
                <span>Total: {count.courses}</span>
              </div>
            </div>
            <div className="max-w-full flex flex-col lg:flex-row bg-white h-full">
              <div className="lg:w-6/12 h-full overflow-hidden">
                <Image src={count.expensive.portait} className="h-full w-full" width={100} height={100} alt={`Portada curso: ${count.expensive.title}`}></Image>
              </div>
              <div className="lg:w-6/12 flex flex-col justify-between pt-2">
                <h3 className="border-b border-slate-200 text-center">Curso mas caro vendido</h3>
                <Link href={"/course/details/"+count.expensive.id} className="lg:text-sm text-center hover:underline py-4 lg:py-0">{count.expensive.title}</Link>
                <Link href={"/course/details/"+count.expensive.id} className="text-sm text-center border border-slate-800 bg-slate-800 text-white py-2">$ {count.expensive.price}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard