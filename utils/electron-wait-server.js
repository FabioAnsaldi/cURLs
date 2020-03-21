const net = require( 'net' );
const config = require( '../config/app.js' );
const client = new net.Socket();

client.on('error', (error) => {
    console.log('We are still waiting ...');
    setTimeout(tryConnection, 1000);
});

let startedElectron = false;

const tryConnection = () => client.connect( {
    host: config.server.address,
    port: config.server.port
    }, () => {

        client.end();
        if(!startedElectron) {
            
            console.log('Starting electron ...');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run app:dev');
        }
} );

tryConnection();