import {useRouter} from "next/router";
import SearchbarLayout from "@/pages/components/searchbar-layout";
import {ReactNode} from "react";

export default function SearchPage() {
    const router = useRouter()

    return (
        <div>
            <h1 className={'text-5xl'}>도서 검색 페이지</h1>
            <div>
                <p>검색 : {router.query.title}</p>
            </div>
        </div>
    )
}

SearchPage.getLayout = function getLayout(page: ReactNode) {
    return (
        <SearchbarLayout>
            {page}
        </SearchbarLayout>
    )
}