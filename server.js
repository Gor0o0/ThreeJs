import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import {Server} from 'socket.io';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

// -=-=|main server fastify
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
// -=-=|player data
class PlayerData{
    constructor(playerId, playerName, currentModel){
        this.id = playerId;
        this.name = playerName;
        this.currentModel = currentModel; //> some model index
        this.position = {x: 0, y: 0, z: 0};
        this.rotation = {x: 0, y: 0, z: 0};
    }
}

// -=-=|server socket.io
const io = new Server(fastify.server);
const sessions = new Map(); //> {key: number, value: Map()}

io.on('connection', (socket) => {
    socket.on('join', (sessionId, playerName) => {
        if(!sessions.has(sessionId)){
            //> if !exist - create new
            sessions.set(sessionId, new Map());
        }
        const playerData = new PlayerData(socket.id, playerName);
        const session = sessions.get(sessionId);

        session.set(session, playerData);

        socket.broadcast.emit('PlayerJoined', playerData); //> broadcast значит - раздать всем кроме себя
    });
    socket.on('move', (playerPosition, playerRotation) => {
        socket.broadcast.emit('PlayerMoved', {
            id: socket.id,
            position: playerPosition,
            rotation: playerRotation
        });
    });

    socket.on('disconnect', (playerId) => {
        console.log('Player disconnected');
    });
});
