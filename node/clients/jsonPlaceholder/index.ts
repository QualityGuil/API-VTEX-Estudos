import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export class JsonPlaceholder extends ExternalClient {
    constructor(ctx: IOContext, options?: InstanceOptions) {
        super(BASE_URL, ctx, {
            ...options,
            headers: {
                Accept: 'application/json',
                ...options?.headers,
            }
        })
    }

    // Método
    public getPostById = (id: string) => {
        const response = this.http.get(`/posts/${id}`);
        return response
    }

    public createPost = (
        data: {
            title: string,
            body: string,
            userId: number
        }
    ) => {
        const response = this.http.post(
            '/posts',
            data, // body de envio
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response
    }

}