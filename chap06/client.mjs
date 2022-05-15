import { createReadStream } from 'fs';
import net from 'net';
import { pipeline } from 'stream';
import path from 'path';
import { createCipheriv } from 'crypto'

const filePath = process.argv[2]
const filename = path.basename(filePath);
const secret = Buffer.from(process.argv[3], 'hex')
const iv = 'asdasdasdasdasda'

const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connection listener');
})

client.on('connect', () => {
    client.write(filename);
    pipeline(
        createReadStream(filePath).pipe(createCipheriv('aes192', secret, iv)), client, (err) => {
        if (err) console.log(err);

        client.end();
    })
})