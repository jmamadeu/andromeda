import { FiChevronDown } from 'react-icons/fi';
import { GithubProfileListProps } from './githubProfile.type';

import Image from 'next/image';

const GithubProfileList: React.FC<GithubProfileListProps> = ({
  style,
  type,
  data,
}) => {
  return (
    <>
      <div className={`${style} w-full`}>
        <h4 className='uppercase font-bold mb-1'>
          {type === 'User' ? `Users` : 'Companies'} ( {data.users.length} )
        </h4>
        <hr className='w-full h-1 bg-gray-bold' />

        {!data?.users.length && (
          <div className='text-lg text-gray-secondary mt-10 text-center'>
            <div className='flex flex-col items-center'>
              <span className='text-gray-primary text-center items-center text-5xl'>
                0
              </span>
              <h5>
                Hmmm... We didn't find any
                {type === 'User' ? ' users' : ' organizations'}...
              </h5>
            </div>
          </div>
        )}

        {(data?.users?.length && (
          <div className='flex flex-col mt-4'>
            <div className=' flex justify-between'>
              <span className='flex items-center'>
                {type === 'User' ? `User` : `Company`}
                <FiChevronDown className='' />
              </span>
              <span className='flex items-center justify-center text-gray-semi'>
                {type === 'User' ? 'Contributions' : 'People'} <FiChevronDown />
              </span>
            </div>

            <hr style={{ height: 1.5 }} className='w-full bg-gray-semi' />
          </div>
        )) ||
          ''}

        {data?.users?.map((user, i) => (
          <div key={i + 'user'}>
            <div
              key={user.login + 'user' + Math.random()}
              className='mt-2 flex justify-between items-center'
            >
              <div className='flex items-center'>
                {user.avatar_url ? (
                  <Image
                    loader={() => user.avatar_url}
                    src='/vercel.svg'
                    alt={user.login}
                    width={40}
                    height={40}
                    className='rounded-full'
                  />
                ) : (
                  <div className='rounded-full p-6 bg-gray-semi w-2 h-2' />
                )}
                <p className='ml-3'>
                  <strong>{user.login || ' '}</strong>
                  <br />
                  <span>{user.name || ' '}</span>
                </p>
              </div>

              <span> {user.total} </span>
            </div>
            <hr
              key={user.login + 'divider' + Math.random()}
              style={{ height: 1.5 }}
              className='w-full bg-gray-semi'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GithubProfileList;
