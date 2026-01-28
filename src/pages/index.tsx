import style from "./index.module.css"
import {ReactNode} from "react";
import SearchbarLayout from "@/pages/components/searchbar-layout";

export default function HomePage() {
    return (
        <div>
            <h1 className={`${style.title} text-2xl`}>인덱스 페이지입니다.</h1>
        </div>
    )
}

HomePage.getLayout = (page: ReactNode) => {
    return <SearchbarLayout>{page}</SearchbarLayout>
}