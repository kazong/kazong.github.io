!function(t){return t?(t.Unslider=function(n,e){var i=this;return i._="unslider",i.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+i._+'-arrow prev">Prev</a>',next:'<a class="'+i._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:i._+"-active",swipe:!0,swipeThreshold:.2},i.$context=n,i.options={},i.$parent=null,i.$container=null,i.$slides=null,i.$nav=null,i.$arrows=[],i.total=0,i.current=0,i.prefix=i._+"-",i.eventSuffix="."+i.prefix+~~(2e3*Math.random()),i.interval=null,i.init=function(n){return i.options=t.extend({},i.defaults,n),i.$container=i.$context.find(i.options.selectors.container).addClass(i.prefix+"wrap"),i.$slides=i.$container.children(i.options.selectors.slides),i.setup(),t.each(["nav","arrows","keys","infinite"],function(n,e){i.options[e]&&i["init"+t._ucfirst(e)]()}),jQuery.event.special.swipe&&i.options.swipe&&i.initSwipe(),i.options.autoplay&&i.start(),i.calculateSlides(),i.$context.trigger(i._+".ready"),i.animate(i.options.index||i.current,"init")},i.setup=function(){i.$context.addClass(i.prefix+i.options.animation).wrap('<div class="'+i._+'" />'),i.$parent=i.$context.parent("."+i._);var t=i.$context.css("position");"static"===t&&i.$context.css("position","relative"),i.$context.css("overflow","hidden")},i.calculateSlides=function(){if(i.total=i.$slides.length,"fade"!==i.options.animation){var t="width";"vertical"===i.options.animation&&(t="height"),i.$container.css(t,100*i.total+"%").addClass(i.prefix+"carousel"),i.$slides.css(t,100/i.total+"%")}},i.start=function(){return i.interval=setTimeout(function(){i.next()},i.options.delay),i},i.stop=function(){return clearTimeout(i.interval),i},i.initNav=function(){var n=t('<nav class="'+i.prefix+'nav"><ol /></nav>');i.$slides.each(function(e){var o=this.getAttribute("data-nav")||e+1;t.isFunction(i.options.nav)&&(o=i.options.nav.call(i.$slides.eq(e),e,o)),n.children("ol").append('<li data-slide="'+e+'">'+o+"</li>")}),i.$nav=n.insertAfter(i.$context),i.$nav.find("li").on("click"+i.eventSuffix,function(){var n=t(this).addClass(i.options.activeClass);n.siblings().removeClass(i.options.activeClass),i.animate(n.attr("data-slide"))})},i.initArrows=function(){i.options.arrows===!0&&(i.options.arrows=i.defaults.arrows),t.each(i.options.arrows,function(n,e){i.$arrows.push(t(e).insertAfter(i.$context).on("click"+i.eventSuffix,i[n]))})},i.initKeys=function(){i.options.keys===!0&&(i.options.keys=i.defaults.keys),t(document).on("keyup"+i.eventSuffix,function(n){t.each(i.options.keys,function(e,o){n.which===o&&t.isFunction(i[e])&&i[e].call(i)})})},i.initSwipe=function(){var t=i.$slides.width();"fade"!==i.options.animation&&i.$container.on({movestart:function(t){return t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY?!!t.preventDefault():void i.$container.css("position","relative")},move:function(n){i.$container.css("left",-(100*i.current)+100*n.distX/t+"%")},moveend:function(n){Math.abs(n.distX)/t>i.options.swipeThreshold?i[n.distX<0?"next":"prev"]():i.$container.animate({left:-(100*i.current)+"%"},i.options.speed/2)}})},i.initInfinite=function(){var n=["first","last"];t.each(n,function(t,e){i.$slides.push.apply(i.$slides,i.$slides.filter(':not(".'+i._+'-clone")')[e]().clone().addClass(i._+"-clone")["insert"+(0===t?"After":"Before")](i.$slides[n[~~!t]]()))})},i.destroyArrows=function(){t.each(i.$arrows,function(t,n){n.remove()})},i.destroySwipe=function(){i.$container.off("movestart move moveend")},i.destroyKeys=function(){t(document).off("keyup"+i.eventSuffix)},i.setIndex=function(t){return 0>t&&(t=i.total-1),i.current=Math.min(Math.max(0,t),i.total-1),i.options.nav&&i.$nav.find('[data-slide="'+i.current+'"]')._active(i.options.activeClass),i.$slides.eq(i.current)._active(i.options.activeClass),i},i.animate=function(n,e){if("first"===n&&(n=0),"last"===n&&(n=i.total),isNaN(n))return i;i.options.autoplay&&i.stop().start(),i.setIndex(n),i.$context.trigger(i._+".change",[n,i.$slides.eq(n)]);var o="animate"+t._ucfirst(i.options.animation);return t.isFunction(i[o])&&i[o](i.current,e),i},i.next=function(){var t=i.current+1;return t>=i.total&&(t=0),i.animate(t,"next")},i.prev=function(){return i.animate(i.current-1,"prev")},i.animateHorizontal=function(t){var n="left";return"rtl"===i.$context.attr("dir")&&(n="right"),i.options.infinite&&i.$container.css("margin-"+n,"-100%"),i.slide(n,t)},i.animateVertical=function(t){return i.options.animateHeight=!0,i.options.infinite&&i.$container.css("margin-top",-i.$slides.outerHeight()),i.slide("top",t)},i.slide=function(t,n){if(i.options.animateHeight&&i._move(i.$context,{height:i.$slides.eq(n).outerHeight()},!1),i.options.infinite){var e;n===i.total-1&&(e=i.total-3,n=-1),n===i.total-2&&(e=0,n=i.total-2),"number"==typeof e&&(i.setIndex(e),i.$context.on(i._+".moved",function(){i.current===e&&i.$container.css(t,-(100*e)+"%").off(i._+".moved")}))}var o={};return o[t]=-(100*n)+"%",i._move(i.$container,o)},i.animateFade=function(t){var n=i.$slides.eq(t).addClass(i.options.activeClass);i._move(n.siblings().removeClass(i.options.activeClass),{opacity:0}),i._move(n,{opacity:1},!1)},i._move=function(t,n,e,o){return e!==!1&&(e=function(){i.$context.trigger(i._+".moved")}),t._move(n,o||i.options.speed,i.options.easing,e)},i.init(e)},t.fn._active=function(t){return this.addClass(t).siblings().removeClass(t)},t._ucfirst=function(t){return(t+"").toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},t.fn._move=function(){return this.stop(!0,!0),t.fn[t.fn.velocity?"velocity":"animate"].apply(this,arguments)},void(t.fn.unslider=function(n){return this.each(function(){var e=t(this);if("string"==typeof n&&e.data("unslider")){n=n.split(":");var i=e.data("unslider")[n[0]];if(t.isFunction(i))return i.apply(e,n[1]?n[1].split(","):null)}return e.data("unslider",new t.Unslider(e,n))})})):console.warn("Unslider needs jQuery")}(window.jQuery);