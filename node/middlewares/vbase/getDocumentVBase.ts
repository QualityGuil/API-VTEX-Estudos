export async function getDocumentVBase(
    ctx: Context,
    next: () => Promise<unknown>
) {

    const {
        clients: { vbase }
    } = ctx

    try {

        const response: [] = await vbase.getJSON('listaCompras', 'listaComprasPath')

        ctx.state.list = response;

        ctx.state.found = true;

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
            message: "Lista de compras não encontrada"
        }

    }

    await next();
}