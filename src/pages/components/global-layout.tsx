import style from "./global-layout.module.css"
import {ReactNode} from "react";

export default function GlobalLayout({children}: { children: ReactNode }) {
    return (
        <div className={`space-y-10 flex flex-col justify-center ${style.container}`}>
            <header className={"border-y w-full flex justify-center"}>
                <div className={'w-full flex justify-around'}>
                    <div>네비게이션</div>
                    <nav className={"nav-links mb-4 flex gap-4 text-blue-600 underline"}>
                        <a href={"/"}>홈</a>
                        <a href={"/about"}>소개</a>
                        <a href={"/search"}>검색</a>
                    </nav>
                </div>
            </header>
            <main className={'border-y flex-8 w-full'}>
                {children}
            </main>
            <footer className={'border-y h-full flex flex-col items-center'}>
                <div className={''}>
                    @Joo Jeongyong
                </div>
            </footer>
        </div>
    )
}