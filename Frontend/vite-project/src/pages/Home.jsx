import {useState , useEffect} from 'react';
import PostCard from '../Componets/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/posts");
        const data = await res.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading posts...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Latest Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id || post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;




