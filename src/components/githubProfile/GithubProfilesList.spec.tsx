import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import GithubProfileList from './GithubProfileList';

test('should show login form', () => {
  const { debug } = render(
    <GithubProfileList data={{ total: 0, users: [] }} type='User' />
  );

  debug();
  // Events and assertions...
});
