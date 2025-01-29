import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

import style from './post.module.css';

import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import PostArticle from '@/app/(afterLogin)/_component/PostArticle';

import { faker } from '@faker-js/faker/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
    noImage?: boolean;
};

export default function Post({ noImage }: Props) {
    const target = {
        postId: 1,
        User: {
            id: 'elonmusk',
            nickname: 'Elon Musk',
            image: '/profile.jpeg',
        },
        content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
        createdAt: new Date(),
        Images: [] as any[],
    };

    if (Math.random() > 0.5) {
        target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
    }

    return (
        <PostArticle post={target}>
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
                    {!noImage && (
                        <div className={style.postImageSection}>
                            {target.Images && target.Images.length > 0 && (
                                <Link
                                    href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
                                    className={style.postImageSection}
                                >
                                    <img src={target.Images[0]?.link} alt="" />
                                </Link>
                            )}
                        </div>
                    )}
                    <ActionButtons />
                </div>
            </div>
        </PostArticle>
    );
}
