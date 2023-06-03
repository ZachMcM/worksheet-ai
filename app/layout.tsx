import Footer from './components/Footer'
import Provider from './components/Provider'
import './globals.css'

export const metadata = {
  title: 'Better Speech',
  description: 'An app that helps make your speeches better!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className='bg-neutral-950 text-white'>
        <Provider>
          {children}
        </Provider>
        <Footer/>
      </body>
    </html>
  )
}
