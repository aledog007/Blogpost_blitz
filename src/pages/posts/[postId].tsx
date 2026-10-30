import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPost from "src/posts/queries/getPost"
import deletePost from "src/posts/mutations/deletePost"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { formatDate } from "src/posts/utils"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const currentUser = useCurrentUser()
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  // Suspense garantiert Daten, Blitz 3 typisiert useQuery aber als "T | undefined"
  if (!post) return null

  return (
    <>
      <Head>
        <title>{`${post.title} | Blitz Blog`}</title>
      </Head>

      <article>
        <h1>{post.title}</h1>
        <p className="muted">{formatDate(post.createdAt)}</p>
        <div className="post-content">{post.content}</div>
      </article>

      {/* Bearbeiten/Löschen nur für eingeloggte Personen – die Mutations prüfen das zusätzlich serverseitig */}
      {currentUser && (
        <div className="actions">
          <Link href={Routes.EditPostPage({ postId: post.id })}>Bearbeiten</Link>
          <button
            type="button"
            onClick={async () => {
              if (window.confirm("Diesen Beitrag wirklich löschen?")) {
                await deletePostMutation({ id: post.id })
                await router.push(Routes.PostsPage())
              }
            }}
          >
            Löschen
          </button>
        </div>
      )}
    </>
  )
}

const ShowPostPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PostsPage()}>← Alle Beiträge</Link>
      </p>

      <Suspense fallback={<div>Lädt …</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
