export type GithubProfileListProps = {
  type: 'User' | 'Organization';
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

export type DefaultGithubUserProps = {
  login: string;
};

export type UserTypeProps = {
  type: 'User' | 'Organization';
};
