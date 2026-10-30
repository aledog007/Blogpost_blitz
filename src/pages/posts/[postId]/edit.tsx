import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdatePostSchema } from "src/posts/schemas"
import getPost from "src/posts/queries/getPost"
import updatePost from "src/posts/mutations/updatePost"
import { PostForm, FORM_ERROR } from "src/posts/components/PostForm"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)

  // Suspense garantiert Daten, Blitz 3 typisiert useQuery aber als "T | undefined"
  if (!post) return null

  return (
    <>
      <Head>
        <title>{`Bearbeiten: ${post.title} | Blitz Blog`}</title>
      </Head>

      <div>
        <h1>Beitrag bearbeiten</h1>
        <Suspense fallback={<div>Lädt …</div>}>
          <PostForm
            submitText="Änderungen speichern"
            schema={UpdatePostSchema}
            initialValues={post}
            onSubmit={async (values) => {
              try {
                const updated = await updatePostMutation({
                  ...values,
                  id: post.id,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowPostPage({ postId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditPostPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Lädt …</div>}>
        <EditPost />
      </Suspense>

      <p>
        <Link href={Routes.PostsPage()}>← Alle Beiträge</Link>
      </p>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
