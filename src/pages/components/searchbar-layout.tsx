import style from "./searchbar-layout.module.css"
import {ChangeEvent, ReactNode, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

export default function SearchbarLayout(
    {children}: { children: ReactNode }
) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const isInitialized = useRef(false)

    useEffect(() => {
        if (router.isReady && !isInitialized.current) {
            setSearch((router.query.keyword as string) || "")
            isInitialized.current = true
        }
    }, [router.isReady, router.query.keyword]);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const params = new URLSearchParams(url.split('?')[1])
            setSearch(params.get('keyword') || "")
        }
        router.events.on("routeChangeComplete", handleRouteChange)
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange)
        }
    }, [router]);

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const searchBooks = () => {
        if (!search || router.query.keyword === search) return
        router.push(`/search?keyword=${search}`)
    }

    const searchUsingEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            searchBooks()
        }
    };
    return (
        <>
            <div className={style.searchbar_container}>
                <input type={"text"}
                       placeholder={"검색어를 입력하세요."}
                       value={search}
                       onChange={updateSearch}
                       onKeyDown={searchUsingEnter}
                />
                <button onClick={searchBooks}>검색</button>
            </div>
            {children}
        </>
    )
}