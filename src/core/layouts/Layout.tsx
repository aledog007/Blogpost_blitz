import Head from "next/head"
import Link from "next/link"
import React, { Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"

const UserNav = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <span className="muted">{currentUser.email}</span>
        <button type="button" className="link-button" onClick={() => logoutMutation()}>
          Logout
        </button>
      </>
    )
  }

  return (
    <>
      <Link href={Routes.LoginPage()}>Login</Link>
      <Link href={Routes.SignupPage()}>Registrieren</Link>
    </>
  )
}

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Blitz Blog` : "Blitz Blog"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="site-header">
        <nav className="container nav">
          <Link href={Routes.Home()} className="brand">
            Blitz Blog
          </Link>
          <div className="nav-links">
            <Link href={Routes.PostsPage()}>Beiträge</Link>
            <Link href={Routes.NewPostPage()}>Neuer Beitrag</Link>
            <Suspense fallback={null}>
              <UserNav />
            </Suspense>
          </div>
        </nav>
      </header>

      <main className="container">{children}</main>
    </>
  )
}

export default Layout
