import { Container, NewPost } from "../components";
import { useStateValue } from "../contexts/StateProvider";

const Home = () => {
  const [{ user }, dispatch] = useStateValue();

  return <Container className="mt-5">{user && <NewPost />}</Container>;
};

export default Home;
