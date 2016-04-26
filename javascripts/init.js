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
function initImageLoader() {
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
function initGamesSlider() {
    $('.game-preview').lightSlider({ item: 1 });
};
// enable shariff social-sharing plugin
function initShariff() {
    new Shariff($('.shariff').first(), {
        orientation: "vertical",
        services: ["facebook", "twitter", "googleplus"],
        infoUrl: "http://www.example.com"
    });
};
// register contact-form handler
function initContactForm() {
    var $form = $('#contactform').first();
    if (!$form) return;
    $form.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function(data) {
                $('#success-contact').show();
                $form[0].reset();
            },
            error: function(err) {
                alert(
                    "An error occured. Sorry for the inconvenience. Feel free to contact us at: contact@kazong-games.com"
                );
            }
        });
    });
}
function initGoogleAnalytics() {
    $('a[data-category]').each(function(idx, outbound_link) {
        $link = $(outbound_link);
        $link.click(function(event) {
            ga('send', 'event', {
                eventCategory: $link.data('category'),
                eventAction: 'click',
                eventLabel: $link.attr('href'),
                transport: 'beacon'
            });
        });
    });
}
// init all te thingz
$(document).ready(function() {
    doTheImprintHidingThing();
    initImageLoader();
    initShariff();
    initGamesSlider();
    initContactForm();
    initGoogleAnalytics();
});
