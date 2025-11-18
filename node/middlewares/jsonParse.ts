import bodyParser from 'co-body'

export const jsonParser = async (ctx: Context, next: () => Promise<any>) => {
  try {
    ctx.body = await bodyParser.json(ctx.req)
  } catch {
    ctx.body = {}
  }

  await next()
}
