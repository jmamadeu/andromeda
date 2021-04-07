export type GithubProfileListProps = {
  type: 'USER' | 'ORG';
  style?: string;
  data?: GithubUserProfileProps[];
};

export type GithubUserProfileProps = {
  name: string;
  avatar_url: string;
  total: string;
  login: string;
  type: 'User' | 'Organization';
};
