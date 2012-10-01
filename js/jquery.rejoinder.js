/*global $:true,jQuery:true*/
/*jslint debug: true, devel: true, evil: true, vars: true, sloppy: true, undef: true */
(function ($) {

	var methods = {
		init : function (options) {
		
			// public / defaults
			var settings = $.extend({
				'tableClass' : 'responsive',
				'minWidth' : 767
			}, options);
			
			return this.each(function (i) {

				var $this = $(this),
					data = $this.data('rejoinder');
				
				if (!data) {
					$this.data('rejoinder', settings);
				}
                
                updateHeaderTable($this);
                
                $(window).on('resize', { elem: $this }, function (e) { updateHeaderTable(e.data.elem); });
                
			});
		},
		destroy : function () {
			
			return this.each(function () {
			
				var $this = $(this),
					data = $this.data('rejoinder');
				
				data.rejoinder.remove();
                
                rmHeaderTable($this);
			});
			
		}
	};
    
    // private functions
    var updateHeaderTable = function (elem) {
        var data = elem.data('rejoinder'),
            tblColWidth = elem.find('th :first').outerWidth();
        
        if ($(window).width() < data.minWidth && !elem.data('split')) {
            var wrapper = elem.clone();
            elem.wrap("<div class='table-wrapper' />");
            wrapper.removeClass("responsive");
            elem.closest(".table-wrapper").append(wrapper);
            wrapper.wrap("<div class='pinned' />");
            elem.wrap("<div class='scrollable' />");
            
            wrapper.find("td:not(.firstCol), th:not(.firstCol)").css('display', 'none');
            resizeTableRowHeight(elem);
            
            elem.data('split', true);
            
        } else if ($(window).width() < data.minWidth && elem.data('split')) {
            resizeTableRowHeight(elem);

        } else if (elem.data('split') && $(window).width() >= data.minWidth) {
            
            elem.closest(".table-wrapper").find(".pinned").remove();
            elem.unwrap();
            elem.unwrap();
            
            elem.data('split', false);
        }
    };
    
    var resizeTableRowHeight = function (elem) { 
        originalTableRows = elem.find("tr");
        elem.closest('.table-wrapper').find('.pinned table tr').each(function (i, e) {
            $(e).css('height', $(originalTableRows[i]).css('height'));
        });
    };

	$.fn.rejoinder = function (method) {
		var $this = $(this);
        
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.rejoinder');
		}
        
		return this;
	};
}(jQuery));