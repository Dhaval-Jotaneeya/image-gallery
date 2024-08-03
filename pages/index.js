// pages/index.js
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Image Gallery</h1>
      <Link href="/navigation" legacyBehavior>
        <a>Go to Repositories</a>
      </Link>
    </div>
  );
};

export default Home;
