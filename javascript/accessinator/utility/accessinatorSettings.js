/*
	SETTINGS ----------------------------------------------------------------------------
*/

export const environment = 'local';

export const port = 36001;

export const loggerConfig = {
	level: 'debug'//set to 'info' to mute debug logs
};

export const savinatorHTTPSettings = {
	protocol: 'http',
	hostname: 'localhost',
	port: 36002,
	path: '/saveRequest',
	method: 'POST'
};


/*
	EXPORTS ----------------------------------------------------------------------------
*/

export default {
	environment,
	port,
	loggerConfig,
	savinatorHTTPSettings
};