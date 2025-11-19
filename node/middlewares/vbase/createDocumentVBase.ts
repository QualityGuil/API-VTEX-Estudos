import json from 'co-body'

export async function createDocumentVBase(
    ctx: Context,
    next: () => Promise<unknown>
) {

    const {
        clients: { vbase }
    } = ctx;

    const requestBody = await json(ctx.req)

    let listaBucket;
    let listaAtt;

    try {

        const responseSearchBucket: [] = await vbase.getJSON('listaCompras', 'listaComprasPath')

        listaBucket = responseSearchBucket

        listaAtt = [listaBucket, requestBody];

    } catch (error) {
        
        // if (!listaBucket || listaBucket.length === 0) {
        //     listaAtt = requestBody;
        // }

        if (ctx.status === 404) {
            listaAtt = requestBody;
        }

    }

    // Nome do bucket (local de armazenamento de arquivos da vtex)
    // caminho do documento no bucket
    // objeto a ser armazenado
    const response = await vbase.saveJSON('listaCompras', 'listaComprasPath', listaAtt);



    ctx.status = 201;
    ctx.body = {
        response
    }

    await next();
}