import Link from 'next/link';

import style from './trend.module.css';

import { Hashtag } from '@/model/Hashtag';

export default function Trend({ trend }: Readonly<{ trend: Hashtag }>) {
    const { title, count } = trend;

    return (
        <Link href={`/search?q=${trend.title}`} className={style.container}>
            <div className={style.count}>실시간트렌드</div>
            <div className={style.title}>{title}</div>
            <div className={style.count}>{count.toLocaleString()} posts</div>
        </Link>
    );
}
