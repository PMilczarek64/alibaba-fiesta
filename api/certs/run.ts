import { checkForCerts, CERT_FILE, KEY_FILE } from './setupCerts.js';

await checkForCerts(KEY_FILE, CERT_FILE);
