import React, { FC, useContext, useMemo, useCallback, useState } from 'react';

import {
  DefaultGithubUserProp,
  GithubUserProfileProps,
} from '../components/githubProfile/githubProfile.type';
import useFetch from './useFetch';

type GithubProfileContextProps = {
  githubUsersProfiles: GithubUserProfileProps[];
};

export const GithubProfilesContext = React.createContext<GithubProfileContextProps>(
  { githubUsersProfiles: [] }
);

export const GithubProfilesProvider: FC = ({ children }) => {
  const [githubUsersProfiles, setGithubUsersProfiles] = useState<
    GithubUserProfileProps[]
  >([]);

  const fetchGithubUsers = useCallback(
    async (user: DefaultGithubUserProp): Promise<DefaultGithubUserProp[]> => {
      try {
        const { response } = useFetch({
          path: '/search/users',
          method: 'POST',
          params: {
            q: user.login,
            page: 1,
            per_page: 5,
          },
        });

        return response.data as DefaultGithubUserProp[];
      } catch (err) {
        console.error(err.message);
        return [];
      }
    },
    []
  );

  const getGithubUserProfile = useCallback(
    (user: DefaultGithubUserProp) => {},

    []
  );

  const memorizedValues = useMemo(
    () => ({
      githubUsersProfiles,
    }),
    [githubUsersProfiles]
  );

  return (
    <>
      <GithubProfilesContext.Provider value={memorizedValues}>
        {children}
      </GithubProfilesContext.Provider>
    </>
  );
};

export const useGithubProfiles = () => {
  const context = useContext(GithubProfilesContext);

  return context;
};
