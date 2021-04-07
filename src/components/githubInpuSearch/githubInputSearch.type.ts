type GithubInputSearchDefaultProps = {
  onClickButton?: () => void;
};

export type GithubInputSearchProps = JSX.IntrinsicElements['input'] &
  GithubInputSearchDefaultProps;
