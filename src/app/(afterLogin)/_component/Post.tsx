import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

import style from './post.module.css';

import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Post() {
    const target = {
        User: {
            id: 'elonmusk',
            nickname: 'Elon Musk',
            image: '/profile.jpeg',
        },
        content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
        createdAt: new Date(),
        Images: [],
    };
    return (
        <article className={style.post}>
            <div className={style.postWrapper}>
                <div className={style.postUserSection}>
                    <Link
                        href={`/${target.User.id}`}
                        className={style.postUserImage}
                    >
                        <img
                            src={target.User.image}
                            alt={target.User.nickname}
                        />
                        <div className={style.postShade} />
                    </Link>
                </div>
                <div className={style.postBody}>
                    <div className={style.postMeta}>
                        <Link href={`/${target.User.id}`}>
                            <span className={style.postUserName}>
                                {target.User.nickname}
                            </span>
                            &nbsp;
                            <span className={style.postUserNick}>
                                @{target.User.id}
                            </span>
                            &nbsp; · &nbsp;
                        </Link>
                        <span className={style.postDate}>
                            {dayjs(target.createdAt).fromNow(true)}
                        </span>
                    </div>
                    <div className={style.postContent}>{target.content}</div>
                    <div className={style.postImageSection}></div>
                    <ActionButtons />
                </div>
            </div>
        </article>
    );
}
