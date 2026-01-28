import {useRouter} from "next/router";
import SearchbarLayout from "@/pages/components/searchbar-layout";
import {ReactNode} from "react";

export default function SearchPage() {
    const router = useRouter()

    return (
        <div>
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