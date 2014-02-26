# meteor-odesk-jobs

oDesk Jobs - the Meteor way.


## Dependencies

 * [meteor-odesk-api](https://github.com/MiroHibler/meteor-odesk-api) - A Meteor wrapper for oDesk API
 * Meteor v0.7.1+


## TL;DR;

_meteor-odesk-jobs_ helps you to manage oDesk jobs list.

Further information on the oDesk API for jobs is available at [http://developers.odesk.com/search-jobs](http://developers.odesk.com/search-jobs).


## Installation

Install using [Meteorite](https://github.com/oortcloud/meteorite) - Installer & smart package manager for Meteor:

```sh
$ mrt add odesk-jobs			// it will add `odesk-api` package automatically
```

Use in your template (by default, it will list all jobs related to Meteor):

```html
<div id="oDeskJobs">
	{{> oDeskJobs}}
</div>
```


## API

_oDeskJobs_ at the moment exposes the following methods **both on the server and the client**:

### `call( method, params, asyncCallback )`
**Perform an method for jobs list**

### `search( params, asyncCallback )`
**Perform a search for jobs by `method` criteria**

 * `method` The method to use: only "search" at the moment
 * `params` Parameters for search (see [http://developers.odesk.com/search-jobs](http://developers.odesk.com/search-jobs) for more info)
 * `asyncCallback` Callback function for returned data or errors with two parameters. The first one being an error object which is null when no error occured, the second one an object with all information retrieved as long as no error occured.

Also for convenience, there are utility methods (**client only!**):

### `jobs()`
**List all jobs for a `method` criteria**

This method will invoke a `search( params, asyncCallback )` method internally.

### `refresh()`
**Refresh list of all jobs for a given `method` criteria**


Example:

```javascript
try {
	var oJobs = new oDeskJobs();
} catch ( error ) {
	console.log( error.message );
}

oJobs.search( { q: 'meteor' }, function ( error, result ) {
	if ( error )
		console.log( error.message );
	else
		console.log( JSON.stringify( result ) ); // Do something with your data!
});
```

## Changelog

### v0.1.0
 * Initial release

## Copyright and license

Copyright © 2014 [Miroslav Hibler](http://miro.hibler.me)

_meteor-odesk-jobs_ is licensed under the [**MIT**](http://miro.mit-license.org) license.
