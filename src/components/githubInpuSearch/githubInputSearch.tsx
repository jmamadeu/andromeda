import { FiSearch } from 'react-icons/fi';

import { GithubInputSearchProps } from './githubInputSearch.type';

const GithubInputSearch: React.FC<GithubInputSearchProps> = ({ ...rest }) => {
  return (
    <>
      <div className='mt-4 flex border rounded border-gray-primary'>
        <input
          {...rest}
          type='text'
          className='w-full pl-4 outline-none focus:outline-none text-lg'
        />
        <button className='focus:outline-none bg-pink-main p-2 mr-2 mt-2 mb-2'>
          <FiSearch color='#fff' size={18} />
        </button>
      </div>
    </>
  );
};

export default GithubInputSearch;
