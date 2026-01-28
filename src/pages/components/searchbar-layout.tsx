import {ChangeEvent, ReactNode, useState} from "react";
import {useRouter} from "next/router";
import * as sea from "node:sea";

export default function SearchbarLayout(
    {children}: { children: ReactNode }
) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const searchBooks = () => {
        if (!search || router.query.keyword === search) return
        router.push(`/search?keyword=${search}`)
    }
    return (
        <>
            <div>
                <input type={"text"}
                       placeholder={"검색어를 입력하세요."}
                       value={search || (router.query.keyword as string)}
                       onChange={onChangeSearch}
                />
                <button onClick={searchBooks}>검색</button>
            </div>
            {children}
        </>
    )
}