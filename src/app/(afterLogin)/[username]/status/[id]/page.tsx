import style from './singlePost.module.css';

import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import Post from '@/app/(afterLogin)/_component/Post';

export default function SinglePost() {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <BackButton />
                <h3 className={style.headerTitle}>게시물</h3>
            </div>
            <Post />
            <CommentForm />
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}
