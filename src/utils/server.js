// server.js create a mock api
import { createServer, Model } from 'miragejs'
import { uniqueNamesGenerator, names, starWars } from 'unique-names-generator'
import { maneColors, eyeColors, hornColors, furColors, nStartingUnicorns } from './config'

const getRandomName = () => {
  return uniqueNamesGenerator({
    dictionaries: [names, starWars],
    length: 1
  })
}

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,
    models: {
      unicorn: Model
    },
    seeds (server) {
      for (let i = 0; i < nStartingUnicorns; i++) {
        server.create('unicorn', {
          name: getRandomName(),
          mane: maneColors[i],
          eye: eyeColors[i],
          fur: furColors[i],
          horn: hornColors[i]
        })
      }
    },
    routes () {
      this.namespace = 'api'

      this.get('/unicorns', (schema) => {
        return schema.unicorns.all()
      })

      this.post('/unicorn', (schema, request) => {
        const details = JSON.parse(request.requestBody)
        console.log(details)
        debugger
      })
    }
  })

  return server
}
