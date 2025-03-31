import { FC } from 'react';
import styles from './PostItem.module.css';

interface ICommentItem {
    user: IUser | undefined;
    post: IPost;
    comments: IComment[];
    expandPost: Record<number, boolean>;
    toggleComments: (value: number) => void;
}

export const PostItem: FC<ICommentItem> = ({user, post, comments, expandPost, toggleComments}) => {
    return (
        <li className={styles.post}>
            <p className={styles.post__author}>
                <strong>Author:</strong> {user ? user?.name : "Unknown"}
            </p>
            <h2 className={styles.post__title}>{post.title}</h2>
            <p className={styles.post__text}>{post.body}</p>

            <button
                className={styles.post__showComment}
                onClick={() => toggleComments(post.id)}>
                {expandPost[post.id] ? "Скрыть комментарии" : "Показать комментарии"}</button>

            {expandPost[post.id] && (
                <div className={styles.comments}>
                    <h3 className={styles.comments__title}>Комментарии</h3>
                    <ul className={styles.comments__list}>
                    {comments.filter(comment => comment.postId === post.id)
                        .map(comment => (
                            <li className={styles.comments__item} key={comment.id}>
                                <strong>{comment.email}</strong>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};