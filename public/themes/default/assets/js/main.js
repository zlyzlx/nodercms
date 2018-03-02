(function($){
$.ScrollFixed = function(el, options){
var base = this;
base.$el = $(el);
base.el = el;
var target = base.$el;
var original_left = parseInt(target.css('left'));
//var original_right = parseInt(target.css('right'));
var original_right=0;
var _fix_position = function(){
if(base.options.fixed == 'right'){
target.css('right', ($(window).scrollLeft() + $(window).width() - $(document).width() + original_right) + 'px');
} else if(base.options.fixed == 'left'){
target.css('left', (original_left - $(window).scrollLeft()) + 'px');
}
};

var windowResize = function(){
_fix_position();
};

var windowScroll = function(){
_fix_position();
};

base.init = function(){
base.options = $.extend({}, $.ScrollFixed.defaultOptions, options);
$(window).resize(windowResize);
$(window).scroll(windowScroll);
_fix_position();
/*console.log(base.options.fixed); */
};

base.init();
};

$.ScrollFixed.defaultOptions = {
fixed:'left'
};

$.fn.scrollFixed = function(options){
return this.each(function(){
(new $.ScrollFixed(this, options));
});
};
})(jQuery);


$(document).ready(function() {
    $('.head-nav').scrollFixed({fixed:'left'});


    (function(){
        var oDiv=$(".head-nav");
        for(var i=0;i<$(".head-nav .cn").length;i++){
             var names=$(".head-nav .cn:eq("+i+")").html().split(" ");
             $(".head-nav .cn:eq("+i+")").html(names[0]);
            if(names[1]!=null){
                var newd=document.createElement("span");
                newd.className="en";
                newd.innerHTML=names[1];
                //判断ie9以下就用清除浮动标签
                if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
                    $(".head-nav .cn:eq("+i+")").parent().append("<div class='claer'></div>");
                }
                $(".head-nav .cn:eq("+i+")").parent().append(newd);
            }
        }
        $(".menu-div").addClass("show");
        /*var oDiv  = document.getElementsByClassName("head-nav")[0];
        var filter = {
            acceptNode: function(node) {
            return node.className.toLowerCase() == 'cn'?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
            }
        }//创建NodeFilter实例(该实例实现class='cn'元素的节点迭代器)
        var oIterator = document.createNodeIterator(oDiv,NodeFilter.SHOW_ELEMENT,filter,false);
        var oNode = oIterator.nextNode();
        while(oNode!==null) {
            var names=oNode.innerHTML.trim().split(" ");
            oNode.innerHTML=names[0];
            if(names[1]!=null){
                var newd=document.createElement("span");
                newd.className="en";
                newd.innerHTML=names[1];
                oNode.parentElement.appendChild(newd)
            }
            oNode = oIterator.nextNode();
        }
        document.getElementsByClassName('menu-div')[0].className='menu-div show';*/
    }())


})

$(document).on("click touchend",".menu-span",function(e){
    e.preventDefault();
    if($(this).parent().hasClass("active")){
        $(this).parent().removeClass("active");
        $(this).attr("class","menu-span icon menu-close");

    }else{
        $(this).parent().addClass("active");
        $(this).attr("class","menu-span icon menu-open");
    }
})

$(document).on("click",".menu-div>div>a",function(){
    if($(this).parent().hasClass("touch-status")){
        $(this).parent().removeClass("touch-status");
    }else{
        $(this).parent().addClass("touch-status");
    }
})
