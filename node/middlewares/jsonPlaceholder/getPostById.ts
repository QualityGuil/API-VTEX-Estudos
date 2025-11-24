export async function getPostById(
    ctx: Context,
    next: () => Promise<unknown>
) {

    const {
        clients: { JsonPlaceholder },
        vtex: {
            route: { params }
        }
    } = ctx
    
    const postId = params.id as string

    if(!postId) {
        throw new Error('Id não inserido!');
    }

    try {

        const response = await JsonPlaceholder.getPostById(postId);

        ctx.status = 200;
        ctx.body = {
            encontrado: ctx.state.found,
            response
        }

    } catch (error) {

        ctx.state.found = false;

        ctx.status = 404;
        ctx.body = {
            encontrado: ctx.state.found,
            message: "Post não encontrado!"
        }

    }

    await next();
}