import './globals.css'
import '98.css'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className="window-body">
            {children}
          </div>
      </body>
    </html>
  )
}
