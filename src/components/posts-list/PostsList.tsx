import { useEffect, useState } from 'react';
import styles from './PostsList.module.css';
import { PostItem } from '../post-item/PostItem';

export const PostsList = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchApi = async () => {
        const urls = ['users', 'posts', 'comments'];
        try {
            const [usersRes, postsRes, commentsRes] = await Promise.all(urls.map(url => {
               return fetch(`https://jsonplaceholder.typicode.com/${url}`).then(res => res.json())
            }))

            setUsers(usersRes);
            setPosts(postsRes);
            setComments(commentsRes);
        } catch (error) {
            console.log(`Error loading data: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <ul className={styles.list}>
            {posts.map(post => (
                <PostItem key={post.id} post={post} users={users} comments={comments} />
            ))}
        </ul>
    );
};