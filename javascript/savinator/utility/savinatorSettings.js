/*
	SETTINGS --------------------------------------------------
*/

const environment = 'local';

const port = 36002;

const loggerConfig = {
	level: 'debug'//set to 'info' to mute debug logs
};

const couchbaseConnection = 'couchbase://localhost:8091';

const couchbaseAuth = {
	username: '',//add Couchbase username here
	password: ''//add Couchbase password here
};

const couchbaseTimeout = 20000;

const couchbaseBucket = 'inator';

const atomicDocumentName = 'inatorcounter';


/*
	EXPORTS ---------------------------------------------------
*/

export default {
	environment,
	port,
	loggerConfig,
	couchbaseConnection,
	couchbaseAuth,
	couchbaseTimeout,
	atomicDocumentName,
	couchbaseBucket
};