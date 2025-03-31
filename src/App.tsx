import { PostsList } from './components/posts-list/PostsList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.AppContainer}>
        <h1 className={styles.AppTitle}>Welcome to TalkBox</h1>
        <PostsList />
      </div>
    </div>
  );
}

export default App;