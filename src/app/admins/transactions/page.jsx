import TransactionsRows from "@/components/amin/transactions/TransactionsRows";

const page = async () => {
    const transactionsReq = await fetch(process.env.BASE_URL+"/api/transactions/",{cache: "no-cache"});
    const transactions = await transactionsReq.json()

    return (
        <TransactionsRows transactions={transactions.transactions}></TransactionsRows>
    )
}

export default page