import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url); //> там где лежит папка и есть root package
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: false });

fastify.register(fastifyStatic, { root: __dirname })
fastify.get('/', (_, reply) => { //> что именно отправаить если постучатся
    reply.sendFile('index.html');
});

fastify.listen({ port: 8000, host: '0.0.0.0' }, () => {
    console.log(`Server is active: http://localhost:8000`);
});
