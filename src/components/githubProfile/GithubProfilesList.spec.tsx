import { getByTestId, render, screen } from '@testing-library/react';

import GithubProfileList from './GithubProfileList';

describe('Github User Profile', () => {
  test('should show numbers of users loaded', () => {
    render(<GithubProfileList data={{ total: 0, users: [] }} type='User' />);

    const elementCounter = screen.getByTestId('element-counter');

    expect(elementCounter.textContent).toBe('0');
  });
});
