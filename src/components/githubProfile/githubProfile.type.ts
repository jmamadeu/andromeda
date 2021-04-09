export type GithubProfileListProps = {
  type: 'User' | 'Organization';
  style?: string;
  data?: GithubDataProps;
};

export type GithubDataProps = {
  total?: number;
  users: GithubUserProfileProps[];
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
