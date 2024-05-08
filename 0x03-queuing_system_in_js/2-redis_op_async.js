import { createClient, print } from 'redis';
import { promisify } from 'util';


const client = createClient();

client
.on('connect', () => {
    console.log('Redis client connected to the server');
})
.on('error', (err) => {
    console.log('Redis client not connected to the server:', err);
});

const getAsync = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
    try {
        const name = await getAsync(schoolName);
        console.log(name);
    } catch (err) {
        console.err(err);
    }
}

async function setNewSchool(schoolName, value) {
    try {
        await client.set(schoolName, value);
    } catch (err) {
        console.error(err);
    }
}
async function main() {
    await displaySchoolValue("Holberton");
    await setNewSchool("HolbertonSanFrancisco", "100");
    await displaySchoolValue("HolbertonSanFrancisco");
}

main();