import Head from 'next/head';
import { useState } from 'react';

import { GithubProfileList } from '../components';
import GithubInputSearch from '../components/githubInpuSearch/githubInputSearch';
import api from '../services/api';

interface GithubUsersProps {
  login: string;
  type: 'User' | 'Organization';
  url: string;
}

interface GithubUserProfileProps {
  login: string;
  name: string;
  avatar_url: string;
}

export default function Home() {
  const [githubUsers, setGithubUsers] = useState<GithubUsersProps[] | null>([]);

  const headers = {
    Authorization: `bearer `,
  };

  const getGithubUserProfile = async ({ login }: { login: string }) => {
    try {
      const headers = {
        Authorization: `bearer ${2}`,
      };

      const body = {
        query: `query {
      user(login: "${login}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
      };

      const userProfile = await api.get<GithubUserProfileProps>(`/graphql`, {
        data: body,
        headers,
      });

      return userProfile.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchGithubUsers = async ({ userName }: { userName: string }) => {
    try {
      const githubUsers = await api.get<GithubUsersProps[]>(`/search/users`, {
        params: {
          q: userName,
        },
      });

      const users = githubUsers.data.filter((user) => user.type === 'User');
      const orgs = githubUsers.data.filter(
        (user) => user.type === 'Organization'
      );

      const usersProfiles = await Promise.all(
        users.map(async ({ login }) => {
          const userProfile = await getGithubUserProfile({ login });

          return userProfile;
        })
      );

      console.log(githubUsers);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Andromeda | Find github users and companies fastly</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-gray-light w-screen h-screen flex justify-center items-center'>
        <section className='w-full max-w-xl mt-10'>
          <div>
            <h1 className='text-gray-bold font-bold text-3xl'>
              Search for Github Users
            </h1>

            <GithubInputSearch
              onChange={(e) => {
                console.log(e.target.value);

                fetchGithubUsers({ userName: 'jmamadeu' });
              }}
            />

            <section className='mt-6 flex justify-between'>
              <GithubProfileList totalRecords={10} type='USER' style='mr-4' />
              <GithubProfileList totalRecords={12} type='ORG' />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
