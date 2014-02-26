// Requires oDesk API Smart Package!

oDeskJobs = function( params ) {
	this._deps	 = new Deps.Dependency;
	this._jobs	 = null;
	this._params = ( params ) ? params : {
		q: 'meteor'
	};
}

/*
 | API methods
*/
oDeskJobs.prototype.search = function( params, callback ) {
	this._params = params;
	Meteor.call( 'oDeskJobs', 'search', params, function( error, result ) {
		callback( error, result );
	});
}
/*
 | Utility methods
 |
 | Reactive list of jobs - automatically reloads
 | the template when list of jobs (this._jobs) changes
*/
oDeskJobs.prototype.jobs = function () {
	this._deps.depend();
	return this._jobs;
};

oDeskJobs.prototype.refresh = function () {
	var self = this;

	this._setJobs( null );

	this.search(
		this._params,
		function ( error, result ) {
			if ( error ) {
				console.log( '[oDeskJobs] Search Error: ' + error.code + ' - ' + error.message );
			} else {
				console.log( JSON.stringify( result ) );
				self._setJobs( result.jobs );
			}
		}
	);
}

/*
 | Internal methods
 */
oDeskJobs.prototype._setJobs = function( value ) {
	if ( value === this._jobs ) {
		return;
	}
	this._jobs = value;
	return this._deps.changed();
}
