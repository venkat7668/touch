/*
 * Hammer.JS jQuery plugin
 * version 0.3
 * author: Eight Media
 * https://github.com/EightMedia/hammer.js
 */
jQuery.fn.hammer = function(options)
{
    return this.each(function()
    {
  	if($(this).data('hammer')){
		 var $el = $(this);
	     var hammer = $el.data('hammer');
		}
		else{
        var hammer = new Hammer(this, options);
        var $el = jQuery(this);
        $el.data("hammer", hammer);
		}
        var events = ['hold','tap','doubletap','transformstart','transform','transformend','dragstart','drag','dragend','swipe','release'];

        for(var e=0; e<events.length; e++) {
            hammer['on'+ events[e]] = (function(el, eventName) {				
                return function(ev) {
                    el.trigger(jQuery.Event(eventName, ev));
                };
            })($el, events[e]);
        }
    });
};

(function(window){
	function Touch(){
		//bind an event
		this.bind=function(el,evt,callback,options){
			
			options=options||{}
	         var cb=function(evt){
				if(options.prevent_default){
					evt.stopPropagation();
					callback(evt);
				}else{
					callback(evt);
				}
			 }			 
			$(el).unbind(evt);	
			$(el).hammer(options);
			$(document).bind(evt,el,cb)			
		}
		
		//unbind an event 
		this.unbind=function(el,evt){
			$(el).unbind(evt);
		}
		
		//unbind all events
		this.unbindAll=function(el){
			$(el).unbind();
		}
	}
	window.Touch=new Touch();
})(window);
