import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPostsInput
  extends Pick<Prisma.PostFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

// Öffentlich: Beiträge dürfen ohne Login gelesen werden (kein resolver.authorize())
export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetPostsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: posts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.post.count({ where }),
      query: (paginateArgs) => db.post.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      posts,
      nextPage,
      hasMore,
      count,
    }
  }
)
