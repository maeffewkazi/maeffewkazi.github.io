const isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
const isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const windowWidth = window.innerWidth;
const mobile = device.mobile();
const tablet = device.tablet();

if (isMacLike) $("body, html").addClass("isMacLike");
if (isSafari) $("body, html").addClass("isSafari");

function hold_all_scroll_page(fix = false) {
    if (fix) {
        window.addEventListener('wheel', holdScroll, { passive: false });
        window.addEventListener('DOMMouseScroll', holdScroll, { passive: false });
        document.addEventListener('touchmove', holdScroll, { passive: false });
    } else {
        window.removeEventListener('wheel', holdScroll, { passive: false });
        window.removeEventListener('DOMMouseScroll', holdScroll, { passive: false });
        document.removeEventListener('touchmove', holdScroll, { passive: false });
    }
}

function holdScroll(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
    return false;
}


function hold_scroll_page(fix = false) {
    if (fix) {
        window.addEventListener('wheel', preventDefault, { passive: false });
        window.addEventListener('DOMMouseScroll', preventDefault, { passive: false });
        document.addEventListener('touchmove', preventDefault, { passive: false });
        // $(document).on("touchmove", preventDefault)
    } else {
        window.removeEventListener('wheel', preventDefault, { passive: false });
        window.removeEventListener('DOMMouseScroll', preventDefault, { passive: false });
        document.removeEventListener('touchmove', preventDefault, { passive: false });
    }
}
var ts;
$(document).on('touchstart', function (e) {
    ts = e.originalEvent.touches[0].clientY;
});

function preventDefault(e) {
    e = e || window.event;
    var area;
    if ($(e.target).closest(".popupContent").length) {
        area = $(e.target).closest(".popupContent");
    } else if ($(e.target).closest(".main-nav").length) {
        area = $(e.target).closest(".main-nav .nav-list");
    }else if ($(e.target).closest(".iziModal").length) {
        area = $(e.target).closest(".iziModal-wrap");
    } else {
        area = $(e.target);
    }
    var parentPopup = $(e.target).closest(".popupContent, .main-nav, .iziModal").length || $(e.target).hasClass('.popupContent');
    if (!parentPopup) {
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
    /*if ($(e.target).closest(".chosen-container").length) {
        e.preventDefault();
        e.returnValue = false;
        return false;
    }*/
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if (e.type == "touchmove") {
        var tob = e.changedTouches[0], // reference first touch point for this event
         offset = parseInt(tob.clientY);
        if (ts < offset - 5) {
            delta = -100;
        } else if (ts > offset + 5) {
            delta = 100;
        }
    }
    if (delta <= 0 && area[0].scrollTop <= 0) {
        e.preventDefault();
    }
    if (delta > 0 && area[0].scrollHeight - area[0].clientHeight - area[0].scrollTop <= 1) {
        e.preventDefault();
    }
}
const mainMass = [];
const thumbsMass = [];
const cardMass = [];

var interleaveOffset = 0.5,
    mainSlider,
    mainThumbs,
    cardSlider;

function marginSlider() {
    $(".main-slider .gallery-wrap").each(function () {
        let slider = $(this),
            width = $(window).innerWidth() - $(".main-slider .thumbs-wrap .container").offset().left + 1;
        if (window.innerWidth > 1439) {
            slider.css({
                width: width
            });
        } else {
            slider.removeAttr("style")
        }
    });
}

$(document).ready(function () {
    if ($(".main-slider .gallery-wrap").length) {
        marginSlider();
        $(window).resize(function () {
            marginSlider()
        });
    }

    $(".main-slider").each(function (index, element) {
        let $this = $(this);
        mainThumbs = new Swiper($this.find('.main-thumbs')[0], {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            autoHeight: true,
            effect: 'fade',
            allowTouchMove: false,
            fadeEffect: {
                crossFade: true
            }
        });
        thumbsMass.push(mainThumbs);

        mainSlider = new Swiper($this.find('.main-gallery')[0], {
            loop: true,
            speed: 1000,
            spaceBetween: 0,
            // grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            // keyboardControl: true,
            lazyLoading: true,
            lazy: {
                preloadImages: true,
                loadPrevNext: true,
                loadPrevNextAmount: 3,
                elementClass: "lazy"
            },
            navigation: {
                nextEl: $this.closest(".main-slider").find(".next-slide")[0],
                prevEl: $this.closest(".main-slider").find(".prev-slide")[0],
                disabledClass: 'disabled'
            },
            thumbs: {
                swiper: thumbsMass[index],
            },
            pagination: {
                el: $this.closest(".main-slider").find(".pagination")[0],
                type: 'fraction',
                currentClass: 'pagination-current',
                totalClass: 'pagination-total',
                renderFraction: function (currentClass, totalClass) {
                    return '<p><span class="' + currentClass + '"></span><span class="pagination-line"></span><span class="' + totalClass + '"></span></p>';
                }
            },
            on: {
                progress: function () {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress;
                        var innerOffset = swiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".slide-wrap").style.transform =
                            "translate3d(" + innerTranslate + "px, 0, 0)";
                    }
                },
                touchStart: function () {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function (speed) {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".slide-wrap").style.transition =
                            speed + "ms";
                    }
                }
            }
        });
        mainMass.push(mainSlider)
    });

    $(".card-slider .swiper-container").each(function (index, element) {
        let $this = $(this);
        cardSlider = new Swiper($this, {
            slidesPerView: 2,
            spaceBetween: 100,
            grabCursor: true,
            loop: true,
            lazyLoading: true,
            lazy: {
                preloadImages: true,
                loadPrevNext: true,
                loadPrevNextAmount: 3,
                elementClass: "lazy"
            },
            navigation: {
                nextEl: $this.closest(".card-slider").find(".next-slide")[0],
                prevEl: $this.closest(".card-slider").find(".prev-slide")[0],
                disabledClass: 'disabled'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                630: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                800: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                993: {
                    slidesPerView: 3,
                    spaceBetween: 80,
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 100,
                },
            }
        });
        cardMass.push(cardSlider)
    });

    /*document.querySelector('[data-toggle]').addEventListener('click', function(){
      if (swiper.realIndex == 0) {
        swiper.slideTo(swiper.slides.length - 1);
      } else {
        swiper.slideTo(0);
      }
    });

    function logIndex () {
      requestAnimationFrame(logIndex);
      console.log(swiper.realIndex);
    }
    logIndex();*/

});
var menuIn = new TimelineLite({paused: true}),
    menuOut = new TimelineLite({paused: true}),
    headerAnim = new TimelineLite({paused:true}),
    logoHeight = new TimelineLite({paused:true}),
    navAnim = true,
    logoParent = document.querySelector(".logo-wrap a"),
    mainLogo = document.querySelector(".logo-wrap a span.main-logo"),
    textLogo = document.querySelector(".logo-wrap a span.text-logo"),
    mainNavIn = document.querySelector(".main-nav span.menuIn"),
    mainNavOut = document.querySelector(".main-nav span.menuOut"),
    journalExtraOne = '<div class="journal-data extra-1"><div class="journal-card"></div></div>',
    journalExtraTwo = '<div class="journal-data extra-2"><div class="journal-card"></div></div>',
    journalExtraThree = '<div class="journal-data extra-3"><div class="journal-card"></div></div>';



// lazy.js
function lazyInit() {
    $('.lazy:not(.lazy-done)').lazy({
        afterLoad: function (element) {
            $(element).css({
                'visibility': 'visible',
            }).fadeTo(250, 1);
            $(element).addClass("lazy-done")
        },
    });
}

// lazy.js

function hasLodash(str) {
    str = str || '';
    return !!str.match(/\_/);
}

const aosFadeArrDone = [
    '.header-toolbar',
    '.main-gallery',
    '.main-thumbs',
    '.thumbs-wrap .slider-control',
    '.quote-wrap blockquote',
    '.intro-wrap .intro-pic',
    '.intro-wrap .text-wrap',
    '.card-slider .slider-title',
    '.card-slider .swiper-container',
    '.discuss-project .title',
    '.discuss-project .link',
    '.company-partners ol li',
    '.footer-nav .nav-items ol li a',
    '.company-social ol li',
    '.page-title',
    '.team-item',
    '.project-process .section-title',
    '.process-item',
    '.projects-filter',
    '.our-projects .project-data',
    '.view-more',
    '.work-info',
    '.journal-info',
    '.work-media',
    '.our-journal .journal-data',
    '.journal-article',
    '.updates-subscribe .title',
    '.updates-subscribe form',
    '.related-journal .sub-title',
    '.related-journal .journal-data',
    '.contact-info .title',
    '.contact-info .text',
    '.contact-info .contacts',
    '.contact-form form',
    '.error-content .title',
    '.error-content .text',
    '.error-content .btn'
];

function setDelayTransform(divs, total_delay = 300) {
    $(divs).each(function (i) {
        $(this).css("transition-delay", total_delay + "ms").attr("data-delay", total_delay);
        total_delay += 100;
    });
    return total_delay;
}

function aos_init() {
    $(".aos").attr("data-aos", "fade-up");
    $(aosFadeArrDone.join(',')).addClass("aos").attr("data-aos", "fade-up");
    setDelayTransform(".company-partners ol li", 0);
    setDelayTransform(".footer-nav .nav-items ol li a", 0);
    setDelayTransform(".company-social ol li", 0);
    setDelayTransform(".team-item", 0);
    setDelayTransform(".process-item", 0);
    setDelayTransform(".our-projects .project-data", 0);
    setDelayTransform(".our-journal .journal-data", 0);
    setDelayTransform(".related-journal .journal-data", 0);

    setTimeout(() => {
        AOS.init({
            duration: 500,
            once: true,
            easing: "ease-out-quad"
        });
    }, 500);
}

function stickyHeader() {
    const element = document.querySelector("header");
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 0) {
        element.classList.add("scrolled");
        headerAnim.play();
    } else {
        element.classList.remove("scrolled");
        headerAnim.reverse();
    }
}

function addElem() {
    $(".journal-list").each(function () {
        let items = $(this).find(".journal-data").length;
        if (items % 3 == 1 && items % 2 == 1) {
            $(this).append(journalExtraTwo + journalExtraThree);
        } else if (items % 2 == 0 && items % 3 == 1) {
            $(this).append(journalExtraThree + journalExtraThree);
        } else if (items % 2 == 0 && items % 3 == 2) {
            $(this).append(journalExtraThree);
        } else if (items % 2 == 1 && items % 3 == 0) {
            $(this).append(journalExtraOne);
        } else if (items % 3 == 2 && items % 2 == 1) {
            $(this).append(journalExtraTwo);
        }
    });
}


function formDone() {
    $(".contact-form form").slideUp();
    $(".contact-form .form-done").slideDown();
}

window.onscroll = function () {
    if (window.innerWidth > 768) {
        stickyHeader()
    }
};




headerAnim.fromTo(mainLogo, 0.2, {autoAlpha: 1, display: "block", ease: Power1.easeIn}, {autoAlpha: 0, display: "none", ease: Power1.easeOut})

    .fromTo(textLogo, 0.2, {autoAlpha: 0, display: "none", ease: Power1.easeIn}, {autoAlpha: 1, display: "block", ease: Power1.easeOut})
    .eventCallback("onComplete", function () {
        // logoHeight.play();
    });

// logoHeight.fromTo(logoParent, 0.2, {height: mainLogo.scrollHeight, ease: Power1.easeIn}, {height: "auto", ease: Power1.easeOut});

menuIn
    .fromTo(mainNavIn, 0.3, {
        "clip-path": "polygon(0% 0, 0 0, 0 100%, 0% 100%)", "-webkit-clip-path": "polygon(0% 0, 0 0, 0 100%, 0% 100%)",
        ease: Power1.easeIn
    }, {
        "clip-path": "polygon(30% 0, 0 0, 0 100%, 20% 100%)",
        "-webkit-clip-path": "polygon(30% 0, 0 0, 0 100%, 20% 100%)",
        ease: Power1.easeIn
    })
    .to(mainNavIn, 0.2, {
        "clip-path": "polygon(75% 0, 0 0, 0 100%, 55% 100%)",
        "-webkit-clip-path": "polygon(75% 0, 0 0, 0 100%, 55% 100%)",
        ease: Linear.easeNone
    })
    .to(mainNavIn, 0.12, {
        "clip-path": "polygon(100% 0, 0 0, 0 100%, 90% 100%)",
        "-webkit-clip-path": "polygon(100% 0, 0 0, 0 100%, 90% 100%)",
        ease: Linear.easeNone
    })
    .to(mainNavIn, 0.1, {
        "clip-path": "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        "-webkit-clip-path": "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        ease: Power1.easeOut
    })
    .eventCallback("onStart", function () {
        $(".main-nav").addClass("shown");
    })
    .eventCallback("onComplete", function () {
        $(".main-nav").addClass("open");
        menuIn.reverse()
    })
    .eventCallback("onReverseComplete", function () {
        navAnim = true;
    });


menuOut
    .fromTo(mainNavOut, 0.3, {
        "clip-path": "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        "-webkit-clip-path": "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        ease: Power1.easeIn
    }, {
        "clip-path": "polygon(90% 0, 0 0, 0 100%, 100% 100%)",
        "-webkit-clip-path": "polygon(90% 0, 0 0, 0 100%, 100% 100%)",
        ease: Power1.easeIn
    })
    .to(mainNavOut, 0.2, {
        "clip-path": "polygon(55% 0, 0 0, 0 100%, 75% 100%)",
        "-webkit-clip-path": "polygon(55% 0, 0 0, 0 100%, 75% 100%)",
        ease: Linear.easeNone
    })
    .to(mainNavOut, 0.12, {
        "clip-path": "polygon(20% 0, 0 0, 0 100%, 30% 100%)",
        "-webkit-clip-path": "polygon(20% 0, 0 0, 0 100%, 30% 100%)",
        ease: Linear.easeNone
    })
    .to(mainNavOut, 0.1, {
        "clip-path": "polygon(0% 0, 0 0, 0 100%, 0% 100%)",
        "-webkit-clip-path": "polygon(0% 0, 0 0, 0 100%, 0% 100%)",
        ease: Power1.easeOut
    })
    .eventCallback("onComplete", function () {
        $(".main-nav").removeClass("shown open");
        menuOut.reverse()
    })
    .eventCallback("onReverseComplete", function () {
        navAnim = true;
    });

// if ($(".input-effect").length) {
//     $(window).unload(function () {
//         $(".input-effect").each(function () {
//             $(this).val("");
//         });
//     });
// }

$(document).ready(function () {
    if ($('.not-found').length) {
        $("body").addClass("error-page")
    }
    if ($('.journal-list').length) {
        addElem();
    }
    lazyInit();
    aos_init();

    /*input-effect*/
    $(".input-effect").val("");
    $("input[type=tel]").mask("+999999999999999");
    $("input[name=start]").mask('00/00/0000');
    $(".input-effect").focusout(function () {
        // if ($(this).attr("type") == "tel" && $(this).val()[$(this).val().length - 1] == "_") {
        if ($(this).attr("type") == "tel" && hasLodash($(this).val())) {
            $(this).val("");
        }
        if ($(this).val() != "") {
            $(this).addClass("has-content");
        } else {
            $(this).removeClass("has-content");
        }
    });

    $('.input-effect').keyup(function () {
        if ($(this).parent().hasClass("error")) {
            $(this).parent().removeClass("error")
        }
    });
    /*input-effect*/

    $('.project-card a').on("click", function (e) {
        if (window.innerWidth < 769) {
            e.preventDefault();
            var this_href = $(this).attr('href');
            $(this).closest(".project-card").addClass("hover");

            setTimeout(function () {
                window.location.href = this_href;
            }, 550);
        }
    });

    $('.upload-file label input[type="file"]').change(function () {
        let fileWrap = $(this).closest(".upload-file");
        fileWrap.addClass("uploaded");
        fileWrap.find("label").after("<div class='file-name'><p>" + $(this)[0].files[0].name + "<span class='icon-close'></span></p></div>")
    });

    $(document).on("click", ".file-name .icon-close", function () {
        let input = $(this).closest(".upload-file").find("input[type='file']"),
            inputWrap = $(this).closest(".upload-file");
        input.replaceWith(input.val('').clone(true));
        inputWrap.removeClass("uploaded");
        inputWrap.find(".file-name").remove();

    });




    $(document).on("click", ".open-menu", function () {
        if (!navAnim) return;
        // let btn = $(this).find(".menu-btn"),
        let btn = $(this),
            mainNav = $(this).closest(".header-wrap"),
            menu = $(this).closest(".header-wrap").find(".main-nav");
        navAnim = false;
        if (btn.hasClass("active")) {
            hold_scroll_page(false);
            btn.removeClass("active");
            menuOut.play();
            setTimeout(function () {
                $(".nav-list").removeClass("shown");
                mainNav.removeClass("open-nav");
            }, 200)
        } else {
            hold_scroll_page(true);
            btn.addClass("active");
            menuIn.play();
            setTimeout(function () {
                $(".nav-list").addClass("shown");
                mainNav.addClass("open-nav");
            }, 200);
        }

    });

    var curHeight;
    if ($(".info-text").length) {
        $(".info-text").each(function () {
            let textBtn = $(this).closest(".team-info").find(".more-info"),
                textMax = $(this).innerHeight(),
                textHeight = $(this).find(".info-height")[0].scrollHeight;
            if (textMax >= textHeight) {
                textBtn.hide()
            } else {
                textBtn.show()
            }
        });
        $(window).resize(function () {
            $(".info-text").each(function () {
                let textBtn = $(this).closest(".team-info").find(".more-info"),
                    moreBtn = $(this).closest(".team-info").find(".more-info"),
                    textMax = $(this).innerHeight(),
                    textHeight = $(this).find(".info-height")[0].scrollHeight;
                if (textMax >= textHeight && !moreBtn.hasClass("open")) {
                    textBtn.hide()
                } else {
                    textBtn.show()
                }
            });
        })
    }


    $(".more-info p").click(function () {
        let itemWrap = $(this).closest(".team-info"),
            textWrap = itemWrap.find(".info-text"),
            moreBtn = $(this).closest(".more-info"),
            curH = $(this).closest(".team-info").find(".info-height")[0].scrollHeight;
        if (moreBtn.hasClass("open")) {

            TweenMax.fromTo(textWrap, 0.3, {'max-height': curH + 'px',}, {
                'max-height': curHeight + 'px', ease: Power1.easeOut, onComplete: () => {
                    moreBtn.removeClass("open");
                    itemWrap.removeClass("show");
                },
            });
        } else {
            curHeight = textWrap.innerHeight();
            TweenMax.fromTo(textWrap, 0.3, {'max-height': curHeight + 'px',}, {
                'max-height': curH + 'px', ease: Power1.easeOut, onStart: () => {
                    itemWrap.addClass("show");
                },
                onComplete: () => {
                    textWrap.css('max-height', '100%');
                    moreBtn.addClass("open");
                },
            });
        }
    });


    $(document).on("click", ".process-title", function () {
        $(this).closest(".process-item").toggleClass("open");
        $(this).closest(".process-item").find(".process-text").slideToggle();
    });

    $(document).on("click", ".play-video button", function () {
        var src = $(this).parent(".play-video").data('src');
        $(".play-video").closest(".media-wrap iframe").remove();
        $(this).closest(".media-wrap").append('<iframe src="' + src + '?;autoplay=1&mute=1&enablejsapi=1&loop=1&showinfo=0&rel=0" frameborder="0" allowfullscreen></iframe>');
    });



    var move_access = false;
    var scrollLeft;
    if (window.innerWidth > 768) {
        $(".touch-scroll").on("mousedown touchstart", function (event) {
            move_access = true;
            if (event.type == "touchstart") {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var offset = touch.clientX;
            } else {
                //если нажата кнопка мышки:
                var offset = event.clientX;
            }
            touchstart = offset;
            scrollLeft = $(this).find(".scroll-wrap").scrollLeft();
        });
        $(document).on("mouseup touchend", function (event) {
            move_access = false;
            if (event.type == "touchend") {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var offset = touch.clientX;
            } else {
                //если нажата кнопка мышки:
                var offset = event.clientX;
            }
            touchstart = offset;
        });
        $(".touch-scroll").on("mousemove touchmove", function (event) {
            if (move_access) {
                if (event.type == "touchmove") {
                    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    var offset = touch.clientX;
                } else {
                    //если нажата кнопка мышки:
                    var offset = event.clientX;
                }
                $(this).find(".scroll-wrap").scrollLeft(scrollLeft + (touchstart - offset)); //отменяем "всплытие сообщений", чтобы не вызывался клик на тач-устройствах.
                event.stopPropagation();
                event.preventDefault();
            }
        });
    }

});
//# sourceMappingURL=maps/common.js.map
