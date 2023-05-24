component {
	function preHandler(event,rc,prc) {
		if(!event.valueExists('format')) {
			event.setValue('format','JSON');
		}
	}

	function process(event,rc,prc) {
		try {
			var savinatorData = {};
			if(StructKeyExists(rc, 'data')) {
				savinatorData.data = rc.data;
			} else {
				throw(type='NoDataError', message='no data to process through Accessinator');
			}

			cfhttp(
				method='POST',
				charset='utf-8',
				url='http://localhost:36002/saveRequest',
				result='result'
			) {
				cfhttpparam(name='Content-type', type='header', value='application/json');
				cfhttpparam(type='body', value=serializeJSON(savinatorData));
			}
			
			event.renderData(type='json', data={ data: 'Sent #savinatorData.data# to Savinator successfully' }, statusCode=200);
		} catch (any e) {
			event.renderData(type='json', data={ error: e.message }, statusCode=400 );
		}
	}
}
