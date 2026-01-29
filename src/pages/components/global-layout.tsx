import style from "./global-layout.module.css"
import {ReactNode} from "react";
import Link from "next/link";

export default function GlobalLayout({children}: { children: ReactNode }) {
    return (
        <div className={`space-y-10 flex flex-col justify-center ${style.container}`}>
            <header className={"border-y w-full flex justify-center"}>
                <div className={'w-full flex justify-around'}>
                    <div>네비게이션</div>
                    <nav className={"nav-links mb-4 flex gap-4 text-blue-600 underline"}>
                        <Link href={"/"}>홈</Link>
                        <Link href={"/about"}>소개</Link>
                        <Link href={"/search"}>검색</Link>
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