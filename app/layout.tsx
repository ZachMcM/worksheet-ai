import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Provider from './components/Provider'
import './globals.css'

export const metadata = {
  title: 'worksheetai',
  description: 'Get a worksheet with AI. Fast.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth w-screen'>
      <body className='bg-neutral-950 text-white overflow-x-hidden max-w-full'>
        <Provider>
          <main className='min-h-screen'>
            <Navbar/>
            {children}
          </main>
        </Provider>
        <Footer/>
      </body>
    </html>
  )
}
