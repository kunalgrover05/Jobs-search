
$( document ).ready(function() {
	var t=[];

	for ( i=0; i<30; ++i ) {
		$.ajax( {
			url: "https://api.angel.co/1/jobs",
			data: {page: i},
		 	success: function(data) {
				$.each(data.jobs, function( id, val ) {
					t.push(val);
	 			} );	
			},
			dataType: 'jsonp'
		} );
	}

	function print_all( v ) {
		var t = '';
		$.each(v.tags, function(p,q) {
			t += '\'' + q.display_name+ '\' ';
		} ); 
		return t;
	}

	function search() {
		$( '#display' ).text( '' );
		var search = $( '#inp' ).val().toLowerCase();
		var search_loc = $( '#inploc' ).val().toLowerCase();
		$.each(t, function(i,v) {
			var x = 0;
			var z = 0;
			$.each(v.tags, function(p,q) {
				if ( q.tag_type === "LocationTag" && q.name.search( search_loc ) !== -1 ) {
					x=1;
				} else if ( q.name.search( search ) !== -1 ) {
					z=1;
				}
			} );
			if (x===1 && z===1) {
				$( '#display' ).append( '<li><a href=\'' + v.angellist_url + '\'>' + v.startup.name + '</a> ' + print_all( v ) + '</li>' );
			}
		} );
	}

	$( '#inp' ).keyup( function() {
		search();
	} );
	$( '#inploc' ).keyup( function() {
		search();
	} );
} );