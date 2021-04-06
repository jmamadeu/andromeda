import { FiChevronDown } from 'react-icons/fi';
import { GithubProfileListProps } from './githubProfile.type';

const GithubProfileList: React.FC<GithubProfileListProps> = ({
  style,
  type,
  totalRecords,
}) => {
  return (
    <>
      <div className={`${style} w-full`}>
        <h4 className='uppercase font-bold mb-1'>
          {type === 'USER' ? `Users` : 'Companies'} ( {totalRecords} )
        </h4>
        <hr className='w-full h-1 bg-gray-bold' />

        <div className='flex flex-col mt-4'>
          <div className=' flex justify-between'>
            <span className='flex items-center'>
              {type === 'USER' ? `User` : `Company`}
              <FiChevronDown className='' />
            </span>
            <span className='flex items-center justify-center text-gray-semi'>
              {type === 'USER' ? 'Contributions' : 'People'} <FiChevronDown />
            </span>
          </div>

          <hr style={{ height: 1.5 }} className='w-full bg-gray-semi' />
        </div>

        <div className='mt-2 flex justify-between items-center'>
          <div className='flex items-center'>
            {<div className='rounded-full p-6 bg-gray-semi w-2 h-2' />}
            <p className='ml-3'>
              <strong>jmamadeu</strong>
              <br />
              <span>João Amadeu</span>
            </p>
          </div>

          <span>23</span>
        </div>
      </div>
    </>
  );
};

export default GithubProfileList;
