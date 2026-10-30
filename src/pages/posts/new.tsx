import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreatePostSchema } from "src/posts/schemas"
import createPost from "src/posts/mutations/createPost"
import { PostForm, FORM_ERROR } from "src/posts/components/PostForm"
import { Suspense } from "react"

const NewPostPage = () => {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)

  return (
    <Layout title="Neuer Beitrag">
      <h1>Neuer Beitrag</h1>
      <Suspense fallback={<div>Lädt …</div>}>
        <PostForm
          submitText="Beitrag veröffentlichen"
          schema={CreatePostSchema}
          initialValues={{ title: "", content: "" }}
          onSubmit={async (values) => {
            try {
              const post = await createPostMutation(values)
              await router.push(Routes.ShowPostPage({ postId: post.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.PostsPage()}>← Alle Beiträge</Link>
      </p>
    </Layout>
  )
}

NewPostPage.authenticate = true

export default NewPostPage
