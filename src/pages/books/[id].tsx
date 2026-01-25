import {useRouter} from "next/router";

export default function BookDetailPage() {
    const router = useRouter()
    return (
        <>
            <h1 className={'text-5xl'}>도서 상세 페이지</h1>
            <div>
                <p>도서 ID : {router.query.id}</p>
            </div>
        </>
    );
}