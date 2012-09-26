/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, sloppy: true, undef: true */
(function ($) {
		
	var methods = {
		init : function (options) {
		
			// public / defaults
			var settings = $.extend({
				"tableClass" : "responsive",
				"minWidth" : 780
			}, options);
			
			return this.each(function () {
				
				var $this = $(this),
					data = $this.data('rejoinder');
				
				if (!data) {
					$this.data('rejoinder', {
						target : $this,
						split : false
					});
				}
                
                addHeaderTable($this);
			
			});
		},
		destroy : function () {
			
			return this.each(function () {
			
				var $this = $(this),
					data = $this.data('rejoinder');
				
				data.rejoinder.remove();
			
			});
			
		},
		splitTable : function () {
		
		}
	};
    
    // private functions
    var addHeaderTable = function (elem) {
        var data = elem.data('rejoinder'),
            tblTop = elem.offset().top,
            tblLeft = elem.offset().left,
            tblWidth = elem.outerWidth(),
            tblColWidth = elem.find('th :first').outerWidth();

        console.log(tblColWidth);
        
        var $wrapperDiv = $(document.createElement("div"));
        $wrapperDiv.css({
            'position' : 'absolute',
            'top' : tblTop,
            'left' : tblLeft,
            'width' : tblColWidth,
            'overflow' : 'hidden'
        });
        elem.before($wrapperDiv);
        elem.wrap("<div class='mainResp' />");
        
        elem.clone().addClass("resp_hdr").width(tblWidth).appendTo($wrapperDiv);
        
        console.log($wrapperDiv);
        /*
        var tableClassStr = '.' + settings.tableClass;
        var $table = $(tableClassStr);
        
        var top = $table.offset().top;
        var left =  $table.offset().left;
        var width = $table.outerWidth();
        
        $table.before('<div id="respHeader" />');
        $table.wrap("<div class='mainResp' />");
        
        $table.clone().addClass("resp_hdr").width(width).appendTo("#respHeader");
        $("#respHeader").css({
            'position': 'absolute',
            'top': top,
            'left': left,
            'width': '85px',
            'overflow':'hidden'
        });
        */
    };

	$.fn.rejoinder = function (method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.rejoinder');
		}
		
		
		/*
		
		$(window).on("resize", function (e){
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
			
			$table.clone().addClass("resp_hdr").width(width).appendTo("#respHeader");
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
		*/
			
		return this;
	};
}(jQuery));