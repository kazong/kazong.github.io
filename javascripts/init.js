// helper method for hiding the imprint
function doTheImprintHidingThing() {
    $('.imprint-unfold').hide();
    $('.fold-imprint').click(function() {
        $('.imprint-unfold').toggle(500, function() {
            $('html, body').animate({
                scrollTop: $('.imprint-unfold').offset().top
            }, 1000);
        })
    });
};
// helper method for shipping higher-res images based on given data-uri low-res ones
function registerHighResImageLoading() {
    var loaded_images = {};
    var $win = $(window);
    var getViewPortBounds = function() {
        return {
            'top': $win.scrollTop(),
            'bottom': $win.scrollTop() + $win.height(),
            'left': 0,
            'right': $win.width()
        };
    };
    var loadImages = function(bounds_builder) {
        var bounds = bounds_builder();
        $("img.lazy").each(function(idx, img) {
            var $img = $(img);
            var dims = $img.offset();
            var vert_max = dims.top + $img.width();
            var img_src = $img.attr('data-original');
            if (!loaded_images[img_src] && vert_max > bounds.top && dims.top < bounds.bottom) {
                loaded_images[img_src] = "loading";
                $img.on('load', function() {
                    $img.parent('.lazy__container').addClass('lazy__loaded');
                    loaded_images[img_src] = "loaded";
                });
                img.src = img_src;
            }
        });
    };
    $(document).scroll(function() {
        loadImages(getViewPortBounds);
    });
    loadImages(getViewPortBounds);
};
// helper method for creating the slider for previewing games
function createGamesPreviewSlider() {
    $('.game-preview').lightSlider({ item: 1 });
};
// enable shariff social-sharing plugin
function initShariff() {


};
$(document).ready(function() {
    doTheImprintHidingThing();
    registerHighResImageLoading();
    createGamesPreviewSlider();
});
