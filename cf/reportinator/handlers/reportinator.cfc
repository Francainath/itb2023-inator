component {
    property name='couchbase' inject='CouchbaseClient@cfcouchbase';

	function preHandler(event,rc,prc) {
		if(!event.valueExists('format')) {
			event.setValue('format','JSON');
		}
	}


	function fullData(event,rc,prc) {
		try {
            var cbFullData = couchbase.n1qlQuery('
                SELECT *
				FROM inator
				WHERE data IS NOT MISSING
            ');

            if(cbFullData.success == true && cbFullData.results.len() > 0) {
                return cbFullData.results.map(function(in) {
                    return in.inator;
                });
            } else {
                return [];
            }
		} catch (any e) {
			event.renderData(type='json', data={ error: e.message }, statusCode=400 );
		}
	}


	function distinctData(event,rc,prc) {
		try {
            var cbDistinctData = couchbase.n1qlQuery('
                SELECT DISTINCT data
				FROM inator
				WHERE data IS NOT MISSING
            ');

            if(cbDistinctData.success == true && cbDistinctData.results.len() > 0) {
                return cbDistinctData.results.map(function(dd) {
                    return dd.data;
                });
            } else {
                return [];
            }
		} catch (any e) {
			event.renderData(type='json', data={ error: e.message }, statusCode=400 );
		}
	}


	function hasDataPoint(event,rc,prc) {
		try {
            var cbHasDataPoint = couchbase.n1qlQuery('
                SELECT *
				FROM inator
				WHERE data = "#rc.dataPoint#"
            ');

            if(cbHasDataPoint.success == true && cbHasDataPoint.results.len() > 0) {
                return cbHasDataPoint.results[1].inator;
            } else {
                return { message: 'no data found for "#rc.dataPoint#'};
            }
		} catch (any e) {
			event.renderData(type='json', data={ error: e.message }, statusCode=400 );
		}
	}
}
