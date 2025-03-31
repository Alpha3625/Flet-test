import { useEffect, useState } from 'react';
import { PostItem } from '../post-item/PostItem';

export const PostsList = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [expandPost, setExpandPost] = useState<Record<number, boolean>>({});

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

    const toggleComments = (postId: number) => {
        setExpandPost((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <ul>
            {posts.map(post => {
                const user = users.find(u => u.id === post.userId);
                return (
                    <PostItem
                        key={post.id}
                        user={user}
                        post={post}
                        comments={comments}
                        expandPost={expandPost}
                        toggleComments={toggleComments} />
                );
            })}
        </ul>
    );
};