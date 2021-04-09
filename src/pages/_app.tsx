import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { GithubProfilesProvider } from '../hooks/useGithubProfiles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GithubProfilesProvider>
        <Component {...pageProps} />
      </GithubProfilesProvider>
    </>
  );
}

export default MyApp;
