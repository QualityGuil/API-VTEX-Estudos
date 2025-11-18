export async function deleteDocumentVBase(
    ctx: Context,
    next: () => Promise<unknown>
) {
    
    const {
        clients: { vbase }
    } = ctx

    vbase.deleteFile('listaCompras', 'listaComprasPath')


    ctx.status = 200;
    ctx.body = {
        message: "Lista de compras deletada"
    }

    await next();
}