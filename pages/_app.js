import '../styles/globals.css'
import { UploaderProvider } from '@w3ui/react-uploader'
import { AuthProvider } from '@w3ui/react-keyring'


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UploaderProvider>
        <Component {...pageProps} />
      </UploaderProvider>
    </AuthProvider>
  );
}

export default MyApp
