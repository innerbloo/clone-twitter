import style from './explore.module.css';

import BackButton from '@/app/(afterLogin)/_component/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import Trend from '@/app/(afterLogin)/_component/Trend';

export default function Home() {
    return (
        <main className={style.main}>
            <div className={style.searchTop}>
                <div className={style.searchZone}>
                    <div className={style.buttonZone}>{/*<BackButton />*/}</div>
                    <div className={style.formZone}>
                        <SearchForm />
                    </div>
                </div>
            </div>
            {/*<div className={style.formZone}>*/}
            {/*    <SearchForm />*/}
            {/*</div>*/}
            <div className={style.trend}>
                <h3>나를 위한 트렌드</h3>
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
            </div>
        </main>
    );
}
