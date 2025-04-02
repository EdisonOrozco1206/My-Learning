import React from "react";
import TransactionsRows from "@/components/amin/transactions/TransactionsRows";

const page = async () => {
    const transactionsReq = await fetch(process.env.BASE_URL+"/api/transactions/", {cache: "no-cache"});
    const data = await transactionsReq.json()

    return (
        <TransactionsRows transactions={data.transactions}></TransactionsRows>
    )
}

export default page