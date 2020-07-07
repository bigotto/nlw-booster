import os from 'os';

let ip = os.networkInterfaces();
ip = Object.values(ip)[0];
const ipLocal = ip[1].address;

export default ipLocal;