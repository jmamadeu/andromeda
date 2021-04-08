import React, { FC, useContext, useMemo, useCallback, useState } from 'react';
import { getFullGithubUserSchema } from '../components/githubProfile/githubProfile.schema';

import {
  DefaultGithubUserProps,
  GithubUserProfileProps,
  UserTypeProps,
} from '../components/githubProfile/githubProfile.type';
import useFetch from './useFetch';

type GithubProfileContextProps = {
  githubUsersProfiles: GithubUserProfileProps[];
  getUsersByType?: (userType: UserTypeProps) => GithubUserProfileProps[];
  handleSearchUsers?: (user: DefaultGithubUserProps) => void;
};

export const GithubProfilesContext = React.createContext<GithubProfileContextProps>(
  { githubUsersProfiles: [] }
);

export const GithubProfilesProvider: FC = ({ children }) => {
  const [githubUsersProfiles, setGithubUsersProfiles] = useState<
    GithubUserProfileProps[]
  >([]);

  const fetchGithubUsers = useCallback(
    async (user: DefaultGithubUserProps): Promise<DefaultGithubUserProps[]> => {
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

        return response.data as DefaultGithubUserProps[];
      } catch (err) {
        console.error(err.message);
        return [];
      }
    },
    []
  );

  const handleSearchUsers = useCallback(
    async ({ login }: DefaultGithubUserProps): Promise<void> => {
      try {
        const users = await fetchGithubUsers({ login });

        const usersProfiles = await Promise.all(
          users.map(async ({ login }) => {
            const userProfile = await getGithubUserProfile({ login });

            return userProfile;
          })
        );

        setGithubUsersProfiles(usersProfiles);
      } catch (err) {
        console.log(err.message);
      }
    },
    []
  );

  const getUsersByType = useCallback(
    ({ type }: UserTypeProps) =>
      githubUsersProfiles.filter((user) => user.type === type),
    []
  );

  const parseGithubUsers = useCallback(
    (userResponse): GithubUserProfileProps => {
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
    },
    []
  );

  const getGithubUserProfile = useCallback(
    async ({ login }: DefaultGithubUserProps) => {
      const { response } = useFetch({
        method: 'POST',
        path: '/graphql',
        query: getFullGithubUserSchema({ login }),
      });

      const userProfile = parseGithubUsers(response.data);

      return userProfile;
    },

    []
  );

  const memorizedValues = useMemo(
    () => ({
      githubUsersProfiles,
      handleSearchUsers,
      getUsersByType,
    }),
    [githubUsersProfiles, handleSearchUsers]
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
