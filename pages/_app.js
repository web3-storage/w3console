import '../styles/globals.css'
import { UploaderProvider } from '@w3ui/react-uploader'
import { AuthProvider } from '@w3ui/react-keyring'
import { UploadsListProvider } from '@w3ui/react-uploads-list';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <Component {...pageProps} />
        </UploadsListProvider>
      </UploaderProvider>
    </AuthProvider>
  );
}

export default MyApp
