import json from 'co-body'

export async function createDocumentVBase(
    ctx: Context,
    next: () => Promise<unknown>
) {

    const {
        clients: { vbase }
    } = ctx;

    const requestBody = await json(ctx.req)

    try {

        let listaAtt;

        if (ctx.state.found) {

            const responseSearchBucket: [] = await vbase.getJSON('listaCompras', 'listaComprasPath')

            listaAtt = [responseSearchBucket, requestBody];

        } else {
            listaAtt = requestBody
        }

        // Nome do bucket (local de armazenamento de arquivos da vtex)
        // caminho do documento no bucket
        // objeto a ser armazenado
        const response = await vbase.saveJSON('listaCompras', 'listaComprasPath', listaAtt);

        ctx.status = 201;
        ctx.body = {
            response
        }

    } catch (error) {

        ctx.status = 400
        ctx.body = {
            message: "Erro ao criar arquivo"
        }

    }

    await next();
}