import { FiSearch } from 'react-icons/fi';

import { GithubInputSearchProps } from './githubInputSearch.type';

const GithubInputSearch: React.FC<GithubInputSearchProps> = ({
  onClickButton,
  ...rest
}) => {
  return (
    <>
      <div className='mt-4 flex border rounded border-gray-primary'>
        <input
          {...rest}
          type='text'
          onKeyPress={(e) => {
            if (e?.key === 'Enter') {
              onClickButton();
            }
          }}
          className='w-full pl-4 outline-none focus:outline-none text-lg'
        />
        <button
          onClick={onClickButton}
          className='focus:outline-none bg-pink-main p-2 mr-2 mt-2 mb-2'
        >
          <FiSearch color='#fff' size={18} />
        </button>
      </div>
    </>
  );
};

export default GithubInputSearch;
