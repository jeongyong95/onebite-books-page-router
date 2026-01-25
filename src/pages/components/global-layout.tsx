import {ReactNode} from "react";

export default function GlobalLayout({children} : {children : ReactNode}) {
    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-2 px-4"}>
            <header>
                <div>네비게이션</div>
                <nav className={"nav-links mb-4 flex gap-4 text-blue-600 underline"}>
                    <a href={"/"}>홈</a>
                    <a href={"/about"}>소개</a>
                    <a href={"/search"}>검색</a>
                </nav>
                <main>
                    {children}
                </main>
                <footer>@Joo Jeongyong</footer>
            </header>
        </div>
    )
}