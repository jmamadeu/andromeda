import Head from 'next/head';

import { FiSearch } from 'react-icons/fi';
import { GithubProfileList } from '../components';

export default function Home() {
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

            <div className='mt-4 flex border rounded border-gray-primary'>
              <input
                type='text'
                className='w-full pl-4 outline-none focus:outline-none text-lg'
              />
              <button className='focus:outline-none bg-pink-main p-2 mr-2 mt-2 mb-2'>
                <FiSearch color='#fff' size={18} />
              </button>
            </div>

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
