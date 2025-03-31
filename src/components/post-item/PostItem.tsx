import { FC } from 'react';
import styles from './PostItem.module.css';

interface ICommentItem {
    users: IUser[];
    post: IPost;
    comments: IComment[];
}

export const PostItem: FC<ICommentItem> = ({post, comments}) => {
    return (
        <li className={styles.post}>
            {/* <strong>{user ? user.name : "Unknown"}</strong> */}
            <h2 className={styles.post__title}>{post.title}</h2>
            <p className={styles.post__text}>{post.body}</p>
            <h3>Комментарии</h3>
            <ul className={styles.comments}>
               {comments.filter(comment => comment.postId === post.id)
                .map(comment => (
                    <li className={styles.comment} key={comment.id}>
                        <strong>{comment.email}</strong>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </li>
    );
};