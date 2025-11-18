export async function getDocumentVBase(
    ctx: Context,
    next: () => Promise<unknown>
) {
    
    const {
        clients: { vbase }
    } = ctx

    const response: [] = await vbase.getJSON('listaCompras', 'listaComprasPath')

    ctx.state.list = response

    ctx.status = 200;
    ctx.body = {
        response
    }

    await next();
}