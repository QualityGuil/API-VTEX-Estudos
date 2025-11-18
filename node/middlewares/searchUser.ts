export async function searchUserByEmailDocument(
    ctx: Context,
    next: () => Promise<any>
) {
    const {
        clients: { masterdata },
        vtex: { route: { params } }
    } = ctx

    // const { email } = params

    const targetEmail = params.email as string;
    const targetDocument = params.document as string;

    const whereQuery = `email="${targetEmail}" OR document="${targetDocument}"`;

    try {

        const searchDocumentByEmailDocument = await masterdata.searchDocuments({
            dataEntity: 'FG',
            fields: ['email', 'document'],
            where: whereQuery,
            // where: `email="${targetEmail}" OR document="${targetDocument}"`,
            pagination: {
                page: 1,
                pageSize: 10,
            },
        })

        console.log(searchDocumentByEmailDocument, "✅ Produto encontrado");

        if (!searchDocumentByEmailDocument || searchDocumentByEmailDocument.length === 0) {
            ctx.status = 404;
            ctx.body = {
                found: false,
                message: "Usuário não encontrado"
            }
            ctx.state.found = false;
        }


        console.log(ctx.response.body, "✅ response");

        ctx.status = 200;
        ctx.body = searchDocumentByEmailDocument;
        ctx.state.found = true;
    } catch (error) {
        console.log('❌ Erro ao buscar usuário:', error);

        ctx.response.body = true
        console.log(ctx.response.body, "✅ response");

        ctx.status = 400;
        ctx.body = `❌ Erro ao buscar usuário`;
    }

    await next();
}
