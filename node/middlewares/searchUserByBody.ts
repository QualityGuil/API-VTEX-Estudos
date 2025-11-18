export async function searchUserByBody(
    ctx: Context,
    next: () => Promise<any>
) {
    const {
        clients: { masterdata }
    } = ctx

    interface UserData {
        name: string;
        lastName: string;
        age: number;
        email: string;
        document: string;
        city: string;
        state: string;
    }

    const newUserData: UserData = ctx.body as UserData;

    const whereQuery = `email="${newUserData.email}" OR document="${newUserData.document}"`

    try {

        const resulSearchUser = await masterdata.searchDocuments({
            dataEntity: 'FG',
            fields: ['email', 'document'],
            where: whereQuery,
            pagination: {
                page: 1,
                pageSize: 10
            }

        })

        if (!resulSearchUser || resulSearchUser.length === 0) {
            ctx.state.found = false
        } else {
            ctx.state.found = true
        }

    } catch (error) {
        console.error('❌ Erro ao adicionar usuário:', error);

        ctx.status = error.response?.status || 500;

        ctx.body = {
            error: true,
            message: 'Erro ao adicionar usuário no Master Data.',
            details: error.message || 'Verifique os logs do serviço para mais detalhes.'
        };
    }

    await next()
}
