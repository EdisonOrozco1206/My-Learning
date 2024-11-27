'use client'

import { useRouter } from "next/navigation"

const SearchInput = () => {
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchQuery = e.target.search.value
        const search = searchQuery.trim()
        router.push(`/search/${encodeURIComponent(search)}`)
        e.target.search.value = ''
    }

    return (
        <ul className="w-1/3">
            <form action="" method="get" className="flex items-center w-full" onSubmit={handleSubmit}>
                <input type="text" name="search" placeholder="Busca un curso..." className="w-3/4 inline-block border-none p-2 text-black" />

                <button className="inline-block bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </button>
            </form>
        </ul>
    )
}

export default SearchInput