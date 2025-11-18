export async function searchProductById(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { catalogGraphQL },
        vtex: {
            route: { params }
        },
    } = ctx

    const productId = params.id as string

    try {

        // console.log("🔍 Procurando produto...")

        const product = await catalogGraphQL.product(productId)

        console.log(product, "✅ Produto encontrado")

        ctx.status = 200
        ctx.body = product
    } catch (error) {
        console.log('❌ Erro ao buscar produto:', error);

        ctx.status = 400;
        ctx.body = `❌ Erro ao buscar produto: ${productId}`;
    }

    await next()
}
