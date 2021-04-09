import { DefaultGithubUserProps } from './githubProfile.type';

export const organizationSchemaFields = `
  name
  avatarUrl
  login
  membersWithRole {
    totalCount
  }
`;

export const userSchemaFields = `
  name
  avatarUrl
  login
  contributionsCollection {
    contributionCalendar {
      totalContributions
    }
  }
`;

export const getFullGithubUserSchema = ({
  login,
}: DefaultGithubUserProps): string => {
  const userOrganizationSchema = `
  query {
    organization(login: "${login}") {
      ${organizationSchemaFields}
    }

    user(login: "${login}") {
      ${userSchemaFields}
    }
  }
  `;

  return userOrganizationSchema;
};
