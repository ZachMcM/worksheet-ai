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
    <html lang="en">
      <body className='bg-neutral-50 '>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
