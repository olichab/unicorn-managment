// server.js create a mock api
import { createServer, Model } from 'miragejs'
import {
  uniqueNamesGenerator,
  names,
  starWars,
  animals
} from 'unique-names-generator'
import {
  maneColors,
  tailColors,
  hornColors,
  furColors,
  nStartingUnicorns
} from './config'

const getRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [names, starWars, animals],
    length: 1
  })
}

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,
    models: {
      unicorn: Model
    },
    seeds(server) {
      for (let i = 0; i < nStartingUnicorns; i++) {
        server.create('unicorn', {
          name: getRandomName().slice(0, 12),
          details: {
            mane: maneColors[i],
            tail: tailColors[i],
            fur: furColors[i],
            horn: hornColors[i]
          }
        })
      }
    },
    routes() {
      this.namespace = 'api'

      this.get('/unicorns', (schema) => {
        return schema.unicorns.all()
      })

      let nID = nStartingUnicorns + 1
      this.post('/unicorn', (schema, request) => {
        const details = JSON.parse(request.requestBody)
        return schema.unicorns.create({
          details,
          name: getRandomName(),
          id: nID++
        })
      })
    }
  })

  return server
}
