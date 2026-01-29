import {NextPageContext} from "next";

interface ErrorProps {
    statusCode?: number;
}

export default function ErrorPage({statusCode}: ErrorProps) {
    return (
        <>
            <h1 className={'text-5xl'}>{statusCode || '클라이언트'} 오류가 발생했습니다</h1>
        </>
    );
}

ErrorPage.getInitialProps = ({res, err}: NextPageContext) => {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
    return {statusCode};
}