// pages/navigation.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchRepositories } from '../lib/github';

const Navigation = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories = async () => {
      const repos = await fetchRepositories();
      setRepositories(repos);
    };
    getRepositories();
  }, []);

  return (
    <div>
      <h1>Public Repositories</h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link href={`/gallery/${repo.name}`} legacyBehavior>
              <a>{repo.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
