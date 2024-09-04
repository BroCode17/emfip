import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66d76b1a003cc9886eba');

// Create account instance
const account  = new Account(client);

//
