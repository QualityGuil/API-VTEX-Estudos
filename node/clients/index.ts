import { IOClients } from '@vtex/api'

import Status from './status'
import { JsonPlaceholder } from './jsonPlaceholder'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  // Client exporta client customizado
  public get JsonPlaceholder() {
    // 'key', Client
    return this.getOrSet('JsonPlaceholder', JsonPlaceholder)
  }
  
}
