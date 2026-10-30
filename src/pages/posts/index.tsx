import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getPosts from "src/posts/queries/getPosts"
import { excerpt, formatDate } from "src/posts/utils"

const ITEMS_PER_PAGE = 10

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [data] = usePaginatedQuery(getPosts, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  // Suspense garantiert Daten, Blitz 3 typisiert usePaginatedQuery aber als "T | undefined"
  if (!data) return null
  const { posts, hasMore } = data

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (posts.length === 0 && page === 0) {
    return (
      <p>
        Noch keine Beiträge vorhanden.{" "}
        <Link href={Routes.NewPostPage()}>Schreib den ersten!</Link>
      </p>
    )
  }

  return (
    <div>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="card">
            <h2>
              <Link href={Routes.ShowPostPage({ postId: post.id })}>{post.title}</Link>
            </h2>
            <p className="muted">{formatDate(post.createdAt)}</p>
            <p>{excerpt(post.content)}</p>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button disabled={page === 0} onClick={goToPreviousPage}>
          ← Neuere
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Ältere →
        </button>
      </div>
    </div>
  )
}

const PostsPage = () => {
  return (
    <Layout title="Beiträge">
      <div className="page-header">
        <h1>Alle Beiträge</h1>
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

export default PostsPage
