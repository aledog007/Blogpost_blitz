import { Suspense } from "react"
import Link from "next/link"
import { Routes, BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { PostsList } from "src/pages/posts"

const Home: BlitzPage = () => {
  return (
    <Layout>
      <section className="hero">
        <h1>Blitz Blog</h1>
        <p className="muted">
          Ein minimaler Blog, gebaut mit Blitz.js (Next.js + Prisma + Zero-API-RPC) für den
          Framework-Vergleich.
        </p>
      </section>

      <div className="page-header">
        <h2>Neueste Beiträge</h2>
        <Link href={Routes.NewPostPage()} className="button">
          Neuer Beitrag
        </Link>
      </div>

      <Suspense fallback={<div>Lädt …</div>}>
        <PostsList />
      </Suspense>
    </Layout>
  )
}

export default Home
