component {
    property name='couchbase' inject='CouchbaseClient@cfcouchbase';

	function preHandler(event,rc,prc) {
		if(!event.valueExists('format')) {
			event.setValue('format','JSON');
		}
	}

	function saveRequest(event,rc,prc) {
		try {
            var existingData = couchbase.n1qlQuery('
                SELECT meta().id 
                FROM inator
                WHERE data = "#rc.data#"
            ');

            if(existingData.success == true && existingData.results.len() > 0) {
                var existingVersionDocName = existingData.results[1].id;
                
                var existingVersion = couchbase.getAndLock(existingVersionDocName, '15');

                existingVersion.value.numberOfUploads = incrementValue(existingVersion.value.numberOfUploads);

                couchbase.replace(
                    id=existingVersionDocName,
                    value=existingVersion.value,
                    cas=existingVersion.cas
                );

                return { data:'Updated #existingVersion.value.data# in Savinator successfully. Now has #existingVersion.value.numberOfUploads# numberOfUploads.' };
            } else {
                var inatorcounter = couchbase.counter('inatorCounter', 1);

                couchbase.upsert(
                    id='inator::#inatorCounter#',
                    value={ data:rc.data, numberOfUploads:1 }
                );

                return { data:'Created #rc.data# in Savinator successfully.' };
            }
		} catch(any e) {
			event.renderData(type='json', data={ error: e.message }, statusCode=400 );
		}
	}
}
