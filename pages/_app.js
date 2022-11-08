import '../styles/globals.css'
import { UploaderProvider } from '@w3ui/react-uploader'
import { AuthProvider } from '@w3ui/react-keyring'
import { UploadsListProvider } from '@w3ui/react-uploads-list';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UploadsListProvider>
      </UploaderProvider>
    </AuthProvider>
  );
}

export default MyApp
