import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { searchProductById } from './middlewares/searchProductById'
import { Category } from '@vtex/api/lib/clients/apps/catalogGraphQL/category'
import { locale } from './middlewares/locale'
import { searchUserByEmailDocument } from './middlewares/searchUser'
import { addUser } from './middlewares/addUser'
import { jsonParser } from './middlewares/jsonParse'
import { searchUserByBody } from './middlewares/searchUserByBody'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
    found: boolean
  }

  interface IdentifiedCategory extends Category {
    parents: Pick<Category, 'name' | 'id'>[]
  }
}

export default new Service({
  clients,
  routes: {
    status: method({
      GET: [validate, status],
    }),

    searchProductById: method({
      GET: [locale, searchProductById],
    }),

    searchUserByEmailDocument: method({
      GET: [searchUserByEmailDocument],
    }),

    searchUserByBody: method({
      POST: [jsonParser, searchUserByBody]
    }),

    addUser: method({
      POST: [jsonParser, searchUserByBody, addUser]
    }),
  },
})
