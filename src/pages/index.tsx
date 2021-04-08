import Head from 'next/head';
import { useState } from 'react';

import { GithubProfileList } from '../components';
import GithubInputSearch from '../components/githubInpuSearch/githubInputSearch';
import { useGithubProfiles } from '../hooks/useGithubProfiles';

import { FiSearch } from 'react-icons/fi';

export default function Home() {
  const [userName, setUserName] = useState<string>('');

  const {
    getUsersByType,
    handleSearchUsers,
    isLoadingUsers,
  } = useGithubProfiles();

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
                handleSearchUsers({ login: userName });
              }}
            />

            {isLoadingUsers && (
              <div className='text-xl text-gray-secondary mt-10 text-center'>
                <div className='flex flex-col items-center'>
                  <h5>Loading users...</h5>
                </div>
              </div>
            )}

            {!userName && (
              <div className='text-2xl text-gray-secondary mt-10 text-center'>
                <div className='flex flex-col items-center'>
                  <FiSearch
                    size={60}
                    className='text-gray-primary text-center items-center'
                  />
                  <h5>Enter a login, name or company you are looking for.</h5>
                </div>
              </div>
            )}

            {userName && !isLoadingUsers && (
              <section className='mt-6 flex justify-between'>
                <GithubProfileList
                  type='User'
                  data={getUsersByType({ type: 'User' })}
                  style='mr-4'
                />
                <GithubProfileList
                  type='Organization'
                  data={getUsersByType({ type: 'Organization' })}
                />
              </section>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
