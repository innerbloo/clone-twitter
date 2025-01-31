import style from './explore.module.css';

import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import TrendSection from '@/app/(afterLogin)/explore/_component/TrendSection';

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
                <TrendSection />
            </div>
        </main>
    );
}
