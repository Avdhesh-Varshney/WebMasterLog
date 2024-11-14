'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

const Contributors = () => {
  const URL = 'https://api.github.com/repos/Avdhesh-Varshney/WebMasterLog/contributors?per_page=500';
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [hoveredContributor, setHoveredContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    fetch(URL, {
      next: {
        revalidate: 86400,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContributors(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(contributors[0])

  return (
    <div className="bg-[#191c24] p-4 rounded-lg my-2">
      <h1 className="text-5xl text-center mb-4">Our Valuable Contributors</h1>
      <div className="flex flex-wrap justify-center">
        {contributors.length > 0 ? (
          contributors.map((contributor, index) => (
            <div
              key={index}
              className="relative mx-2 my-3"
              onMouseEnter={() => setHoveredContributor(contributor)}
              onMouseLeave={() => setHoveredContributor(null)}
            >
              <div style={{ width: '65px', height: '65px', clipPath: 'polygon(50% 0%, 91% 25%, 91% 75%, 50% 100%, 9% 75%, 9% 25%)' }}>
                <Image src={contributor.avatar_url} alt={contributor.login} width={100} height={100} sizes='100' />
              </div>
              {hoveredContributor === contributor && (
                <div className="absolute -left-16 top-16 z-20 w-48 p-4 bg-[#191c24] border-[1px] border-blue-400 font-bold rounded-lg shadow-lg transition-opacity duration-300 animate-fadeIn flex flex-col items-center gap-2">
                  <Link href={contributor.html_url}>
                    <Image src={contributor.avatar_url} alt={contributor.login} className='rounded-lg w-32 h-32' width={100} height={100} sizes='100' />
                  </Link>
                  <p className="text-base text-center">{contributor.login}</p>
                  <p className='text-sm text-center'>Contributions: {contributor.contributions} 🏆</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>API Limit Exceeded!</p>
        )}
      </div>
    </div>
  );
};

export default Contributors;
