import React, { FC, useContext, useMemo, useCallback, useState } from 'react';

import { getFullGithubUserSchema } from '../components/githubProfile/githubProfile.schema';
import {
  DefaultGithubUserProps,
  GithubDataProps,
  GithubUserProfileProps,
  UserTypeProps,
} from '../components/githubProfile/githubProfile.type';
import api from '../services/api';

type SearchUsersProps = {
  login: string;
  page?: number;
};

type GithubProfileContextProps = {
  githubUsersProfiles: GithubDataProps;
  getUsersByType?: (userType: UserTypeProps) => GithubDataProps;
  handleSearchUsers?: (handleOptions: SearchUsersProps) => void;
  isLoadingUsers: boolean;
  clearUsersList?: () => void;
  showMoreUsers?: (userName: string) => void;
};

export const GithubProfilesContext = React.createContext<GithubProfileContextProps>(
  { githubUsersProfiles: {} as GithubDataProps, isLoadingUsers: false }
);

export const GithubProfilesProvider: FC = ({ children }) => {
  const [
    githubUsersProfiles,
    setGithubUsersProfiles,
  ] = useState<GithubDataProps | null>(null);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const clearUsersList = () =>
    setGithubUsersProfiles({
      users: [],
      total: 0,
    });

  const showMoreUsers = useCallback(
    (userName: string) => {
      const nextUsersPage = githubUsersProfiles?.users?.length + 5;

      handleSearchUsers({ page: nextUsersPage, login: userName });
    },
    [githubUsersProfiles]
  );

  const fetchGithubUsers = useCallback(
    async (user: DefaultGithubUserProps, page: number = 5) => {
      try {
        const { data } = await api.get('/search/users', {
          params: {
            q: user.login,

            per_page: page,
          },
        });

        return data;
      } catch (err) {
        console.error(err.message);
        return [];
      }
    },
    []
  );

  const handleSearchUsers = useCallback(
    async ({ login, page }: SearchUsersProps): Promise<void> => {
      try {
        setIsLoadingUsers(true);

        const users = await fetchGithubUsers({ login }, page);

        const usersProfiles = await Promise.all(
          users.items.map(async ({ login }) => {
            const userProfile = await getGithubUserProfile({ login });

            return userProfile as GithubUserProfileProps;
          })
        );

        setGithubUsersProfiles({
          total: users.total_count,
          users: usersProfiles as GithubUserProfileProps[],
        });

        setIsLoadingUsers(false);
      } catch (err) {
        console.log(err.message);
        setIsLoadingUsers(false);
      }
    },
    []
  );

  const getUsersByType = useCallback(
    ({ type }: UserTypeProps) => {
      const usersFilters =
        githubUsersProfiles?.users?.filter((user) => user.type === type) || [];

      return {
        users: usersFilters,
        total: githubUsersProfiles?.total,
      };
    },
    [githubUsersProfiles]
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
      const response = await api.post('/graphql', {
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
      isLoadingUsers,
      clearUsersList,
      showMoreUsers,
    }),
    [
      githubUsersProfiles,
      handleSearchUsers,
      getUsersByType,
      isLoadingUsers,
      clearUsersList,
      showMoreUsers,
    ]
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
