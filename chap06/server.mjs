import net from 'net';
import { createWriteStream, write } from 'fs';
import { createDecipheriv, randomBytes } from 'crypto'

const secret = randomBytes(24)
console.log(`secret: ${secret.toString('hex')}`)

const server = net.createServer((socket) => {
    const chunks = [];
    socket.on('data', (data) => {
        chunks.push(data);
    });

    socket.on('close', () => {
        const data = Buffer.concat(chunks);
        const authTagLocation = data.length - 16;
        const authTag = data.slice(authTagLocation);
        const ivLocation = data.length - 32;
        const iv = data.slice(ivLocation, authTagLocation);
        const encryptedData = data.slice(0, ivLocation);
        const decipher = createDecipheriv('aes192', secret, iv)
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([decipher.update(encryptedData),decipher.final()]);
        const result = createWriteStream(decrypted);
        console.log('Started accepting file', result);
        console.log('closed')
    })

    socket.on('error', (e) => {
        console.log('Error', e)
    })
})

server.listen(3000);