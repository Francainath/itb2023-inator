# itb2023-inator
Inator application for ITB-2023 presentation

There are 2 sets of applications in this project: 1 in CFML/ColdBox, the other in JavaScript/NodeJS

There are 3 applications in each set:
1. accessinator
2. savinator
3. reportinator

Accessinator should run out-of-the-box as it only transfers data from index.html to the savinator.

Both the savinator and reportinator require a Couchbase instance with a bucket named "inator" to exist.

Also, in both the savinator and reportinator settings, you'll have to add the credentials for your Couchbase instance in the appropriate settings file.
For the CFML/ColdBox versions those are found at the bottom of config/Coldbox.cfc as follows:
couchbase = {
		servers = "http://127.0.0.1:8091",
	bucketname = "inator",
	viewTimeout = "1000",
	username: "",//add Couchbase username here
	password: ""//add Couchbase password here
};

For the JavaScript/NodeJS versions those are found at utility/{{appName}}Settings.js as follows:
const couchbaseAuth = {
	username: '',//add Couchbase username here
	password: ''//add Couchbase password here
};

If the URL mappings to your local are correct, Couchbase is up and running with an "inator" bucket, and you have the credentials in the settings file, any version of the savinator and reportinator app should work as expected.

The index.html file is a simple and stark interface to interact with the applications.
It publishes to the accessinator the data entered into the text field, and interacts with the various report options down below.

WARNING: the publish from index.html to the CFML/ColdBox accessinator has a CORS issue. If I get that fixed, I'll remove this warning.

Also, the apps work identically and are interchangable other than the warning above.