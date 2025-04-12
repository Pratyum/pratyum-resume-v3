import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <Layout>
            {children}
          </Layout>
        </AppContextProvider>
      </body>
    </html>
  );
}