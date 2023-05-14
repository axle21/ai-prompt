import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
    title : "Promptopia", 
    description:"Discover and share AI prompt"
}

type Props = {
    children: React.ReactNode;
    pageProps:any
}

const RootLayout = ({ children, pageProps } :Props) => {
  return (
    <html lang="en">
        <body>
            <Provider session={...pageProps}>
                <div className='main'>
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
           
        </body>
    </html>
  )
}

export default RootLayout
