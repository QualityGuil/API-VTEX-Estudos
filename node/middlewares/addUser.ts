export async function addUser(
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

    if (ctx.state.found) {
        ctx.status = 409;
        ctx.body = {
            message: "Usuário já existente"
        }
        return
    }

    const newUserData: UserData = ctx.body as UserData;

    try {
        const addUser = await masterdata.createDocument({
            dataEntity: 'FG',
            fields: newUserData,
        })

        ctx.status = 201
        ctx.body = {
            message: "Usuário cadastrado com sucesso!",
            addUser
        }
    } catch (error) {
        console.error('❌ Erro ao adicionar usuário:', error);

        ctx.status = error.response?.status || 500;

        ctx.body = {
            error: error,
            message: 'Erro ao adicionar usuário no Master Data.',
            details: error.message || 'Verifique os logs do serviço para mais detalhes.'
        };
    }

    await next()
}
