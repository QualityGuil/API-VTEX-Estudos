import json from 'co-body';

export async function createPost(
    ctx: Context,
    next: () => Promise<unknown>
) {

    const {
        clients: { JsonPlaceholder },
    } = ctx

    const requestBody = await json(ctx.req);

    if (!requestBody) {
        throw new Error('Body inválido!')
    }

    try {

        const response = await JsonPlaceholder.createPost(requestBody);

        ctx.status = 201;
        ctx.body = {
            message: "Post criado com sucesso!",
            response
        }

    } catch (error) {

        ctx.state.found = false;

        ctx.status = 404;
        ctx.body = {
            encontrado: ctx.state.found,
            message: "Não foi possível criar Post!"
        }

    }

    await next();
}