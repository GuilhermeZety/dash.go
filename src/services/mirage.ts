import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'


interface User{
    name: string
    email: string
    created_at: string
}

export function makeServer(){
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer
        },

        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            user: Factory.extend({
                name(i) {
                    return `Pessoinha ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLocaleLowerCase()
                },
                created_at() {
                    return faker.date.recent(10)
                },
            })
        },

        seeds(server){
            server.createList('user', 25)
        },
        
        routes() {
            this.namespace = 'api'
            // this.timing = 750
            
            this.get('/users', function (schema, request){
                const {page = 1, per_page = 10} = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page)

                const { users } = this.serialize(schema.all('user'))
                
                const parsedUsers = users ? users.slice(pageStart, pageEnd) : []
               
                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    {users: parsedUsers}
                )
            })

            this.get('/users/:id', function(schema, request) {
                const id = request.params.id

                return this.serialize(schema).users.find(id)
            })

            this.post('/users')

            this.namespace = ''
            this.passthrough()
        }
    })

    return server
}