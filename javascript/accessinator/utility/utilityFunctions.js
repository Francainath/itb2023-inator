/*eslint no-console: 0*/

let SERVICE_PREFIX = 'accessinator';

/*
	LOGGING FUNCTIONS -----------------------------------------------------------------------------------------------------------------------
*/

function stringifyErrorReplacer(key, value) {
	if(value instanceof Error) {
		var error = {};

		Object.getOwnPropertyNames(value).forEach(function (key) {
			error[key] = value[key];
		});

		return error;
	}
	return value;
}


export function processError(loggers, context, error, message) {
	if (!context || error === null || error === undefined || !loggers) {
		console.error('Required args missing.');
		return;
	}

	//make it an array if it isn't one already
	loggers = [].concat(loggers);

	//encapsulate as an object to ensure consistency
	if(typeof(error) === 'string') {
		error = { 'error': error };
	}

	let data = { [`${SERVICE_PREFIX}.${context}`]:error };

	//add extra information if supplied
	if(message) {
		data['message'] = message;
	}

	loggers.forEach(logger => logger.error(JSON.stringify(data, stringifyErrorReplacer)));

	return error;
}


export function processInfo(infoData, logger, context) {
	let loggingData = '';

	if(typeof infoData === 'object') {
		loggingData = (infoData instanceof Error) ? infoData.message : JSON.stringify(infoData);
	} else if(typeof infoData === 'string') {
		loggingData = infoData;
	}

	if(context) {
		loggingData = `${context} ${loggingData}`;
	}

	if(logger) {
		logger.info(loggingData);
	} else {
		console.info(loggingData);
	}

	return infoData;
}


/*
	AXIOS FUNCTIONS -----------------------------------------------------------------------------------------------------------------------
*/

export function parseUrl(settings) {
	return `${settings.protocol}://${settings.hostname}:${settings.port}${settings.path}`;
}


/*
	DATA MANAGEMENT FUNCTIONS -----------------------------------------------------------------------------------------------------------------------
*/

export function deepCopy(value) {
	return (value !== undefined) ? JSON.parse(JSON.stringify(value)) : undefined;
}


/*
	DATA STATE FUNCTIONS -----------------------------------------------------------------------------------------------------------------------------
*/

export function isPopulatedObject(value) {
	return (value && value instanceof Object && !Array.isArray(value) && Object.keys(value).length) ? true : false;
}


export function isPopulatedArray(value) {
	return (value && value instanceof Array && value.length > 0) ? true : false;
}


export function isPopulatedString(value, length=1) {
	return (value && typeof value === 'string' && value.length >= length) ? true : false;
}


export function isObjectWithProperty(value, property) {
	return (isPopulatedObject(value) && property && typeof property === 'string' && value.hasOwnProperty(property)) ? true : false;
}


export function isJson(str) {
	try {
		if(typeof str !== 'string') {
			return false;
		}

		JSON.parse(str);

		return true;
	} catch (e) {
		return false;
	}
}


/*
	EXPORTS -----------------------------------------------------------------------------------------------------------------------------
*/

export default {
	//LOGGING FUNCTIONS
	processError,
	processInfo,
	//AXIOS FUNCTIONS
	parseUrl,
	//DATA MANAGEMENT FUNCTIONS
	deepCopy,
	//DATA STATE FUNCTIONS
	isPopulatedObject,
	isPopulatedArray,
	isPopulatedString,
	isObjectWithProperty,
	isJson
};