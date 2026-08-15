import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}