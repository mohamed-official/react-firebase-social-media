import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container, Feed, NewPost } from "../components";
import { useStateValue } from "../contexts/StateProvider";
import { firestore } from "../firebase";

const Home = () => {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const postsRef = collection(firestore, "posts");
  const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postsQuery);
      setPosts(data.docs.map((doc) => ({ ...doc.data() })));
    }

    getPosts();
  }, [posts]);

  return (
    <Container className="mt-5">
      {user && <NewPost posts={posts} setPosts={setPosts} />}
      <Feed posts={posts} />
    </Container>
  );
};

export default Home;
