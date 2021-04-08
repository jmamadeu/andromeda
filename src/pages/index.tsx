import Head from 'next/head';
import { forwardRef, useRef, useState } from 'react';

import { GithubProfileList } from '../components';
import GithubInputSearch from '../components/githubInpuSearch/githubInputSearch';
import { GithubUserProfileProps } from '../components/githubProfile/githubProfile.type';
import api from '../services/api';

const TOKEN_GITHUB_API = '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';

export default function Home() {
  const [githubUsers, setGithubUsers] = useState<
    GithubUserProfileProps[] | null
  >([]);
  const [userName, setUserName] = useState<string>('');

  const parseGithubUsers = (userResponse): GithubUserProfileProps => {
    const { user, organization } = userResponse.data;

    const userParsed = {
      type: user ? 'User' : 'Organization',
      name: user?.name || organization?.name,
      login: user?.login || organization?.login,
      avatar_url: user?.avatarUrl || organization?.avatarUrl,
      total:
        user?.contributionsCollection?.contributionCalendar
          ?.totalContributions ||
        organization?.membersWithRole?.totalCount ||
        0,
    };

    return userParsed as GithubUserProfileProps;
  };

  const getGithubUserProfile = async ({ login }: { login: string }) => {
    try {
      const headers = {
        Authorization: 'bearer ' + TOKEN_GITHUB_API,
      };

      const organizationSchemaFields = `
        name
        avatarUrl
        login
        membersWithRole {
          totalCount
        }
      `;

      const userSchemaFields = `
        name
        avatarUrl
        login
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      `;

      const body = `
        query {
          organization(login: "${login}") {
            ${organizationSchemaFields}
          }

          user(login: "${login}") {
            ${userSchemaFields}
          }

        }`;

      const { data } = await api.post(`/graphql`, { query: body }, { headers });

      const userProfile = parseGithubUsers(data);

      return userProfile;
    } catch (err) {
      console.error(err.message);
      return {} as GithubUserProfileProps;
    }
  };

  const fetchGithubUsers = async ({
    userName,
  }: {
    userName: string;
  }): Promise<{ login: string }[]> => {
    try {
      const githubUsers = await api.get(`/search/users`, {
        params: {
          q: userName,
          page: 1,
          per_page: 5,
        },
      });

      return githubUsers.data.items;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  const handleButtonSearchClick = async () => {
    try {
      const githubUsers = await fetchGithubUsers({ userName });

      const usersProfiles = await Promise.all(
        githubUsers.map(async ({ login }) => {
          const userProfile = await getGithubUserProfile({ login });

          return userProfile;
        })
      );

      setGithubUsers(usersProfiles);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUsersByType = (type: 'User' | 'Organization') =>
    githubUsers.filter((user) => user?.type === type);

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
              value={userName}
              onChange={(event) => {
                setUserName(event?.target?.value);
              }}
              onClickButton={() => {
                handleButtonSearchClick();
              }}
            />

            <section className='mt-6 flex justify-between'>
              <GithubProfileList
                type='USER'
                data={getUsersByType('User')}
                style='mr-4'
              />
              <GithubProfileList
                type='ORG'
                data={getUsersByType('Organization')}
              />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
