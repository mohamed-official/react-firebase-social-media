
import Post from "./Post";

const Feed = ({ posts }) => {
  

  return (
    <div className="flex flex-col gap-6 mt-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
