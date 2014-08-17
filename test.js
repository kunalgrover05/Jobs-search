
$( document ).ready(function() {
	var t=[];

	for ( i=0; i<5; ++i ) {
		$.ajax( {
			url: "https://api.angel.co/1/jobs",
			data: {page: i},
		 	success: function(data) {
				console.log(data.jobs);
				$.each(data.jobs, function( id, val ) {
					//console.log(val);	
	 				
	 				t.push(val);
	 			} );	
			},
			dataType: 'jsonp'
		} );
	}

	$( '#inp' ).keyup( function() {
		$( '#display' ).text( '' );
		var search = $( '#inp' ).val().toLowerCase();
		$.each(t, function(i,v) {
			$.each(v.tags, function(p,q) {
				if ( q.tag_type==="SkillTag" ) {
					if ( q.name.search( search ) !== -1 ) {
						console.log(t);
						$( '#display' ).append( '<li><a href=\'' + v.angellist_url + '\'>' + v.startup.name + '</a> ' + q.display_name + '</li>' );
					}
				}
			} );
		} );

		// var s = $( '#inp' ).val();
		// $( '#display' ).text( '' );
		
	} );
} );