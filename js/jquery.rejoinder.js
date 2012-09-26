(function( $ ) {
	$.fn.tablizer = function( options ) {
		
		// public / defaults
		var settings = $.extend({
			"tableClass":"responsive",
			"minWidth":780,
		}, options);
		
		// private / reset
		var settings = $.extend({
			'split':false,
		},settings)
		
		$(window).on("resize", function(e){
			if ($(e.target).width() <= settings.minWidth && !settings.split) {
				splitTable();
			} else if ($(e.target).width() > settings.minWidth && settings.split) {
				cleanupTable();
			} else if (settings.split) {
				resizeTable();
			}
		});
		
		function resizeTable() {
			console.log("resize table");
		}
		
		function splitTable() {
			settings.split = true;
			console.log("split table");
			
			var tableClassStr = '.' + settings.tableClass;
			var $table = $(tableClassStr);
			
			var top = $table.offset().top;
			var left =  $table.offset().left;
			var width = $table.outerWidth();
			
			$table.before('<div id="respHeader" />');
			$table.wrap("<div class='mainResp' />");
			
			$table.clone().removeClass(".responsive").addClass("resp_hdr").width(width).appendTo("#respHeader");
			$("#respHeader").css({
				'position': 'absolute',
				'top': top,
				'left': left,
				'width': '85px',
				'overflow':'hidden'
			})
		}
		
		function cleanupTable() {
			settings.split = false;
			console.log("cleanup table");
			
			var tableClassStr = '.' + settings.tableClass;
			var $table = $(tableClassStr);
		}	
			
		return this;
	}
})(jQuery);