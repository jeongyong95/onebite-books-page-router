import {ReactNode, useState} from "react";

export default function SearchbarLayout(
    {children}: { children: ReactNode }
) {
    const [count, setCount] = useState(0);
    return (
        <>
            <div>검색 도구</div>
            {count}
            <button onClick={() => setCount(count + 1)}>증가</button>
            {children}
        </>
    )
}