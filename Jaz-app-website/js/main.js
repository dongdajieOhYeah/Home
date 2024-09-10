$(document).ready(function() {
    new Swiper("#certify .swiper-container", {
        watchSlidesProgress: !0,
        slidesPerView: "auto",
        centeredSlides: !0,
        loop: !0,
        autoplay: !0,
        loopedSlides: 5,
        autoplay: !0,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        pagination: { el: ".swiper-pagination", clickable: !0 },
        on: {
            progress: function(e) {
                for (i = 0; i < this.slides.length; i++) {
                    var s = this.slides.eq(i),
                        t = this.slides[i].progress;
                    modify = 1, Math.abs(t) > 1 && (modify = .3 * (Math.abs(t) - 1) + 1), translate = t * modify * 260 + "px", scale = 1 - Math.abs(t) / 5, zIndex = 999 - Math.abs(Math.round(10 * t)), s.transform("translateX(" + translate + ") scale(" + scale + ")"), s.css("zIndex", zIndex), s.css("opacity", 1), Math.abs(t) > 3 && s.css("opacity", 0)
                }
            },
            setTransition: function(e) { for (var s = 0; s < this.slides.length; s++) { this.slides.eq(s).transition(e) } }
        }
    });

    $(window).scroll(function() { $(document).scrollTop() > 2e3 && ($(".value1").numberRock({ speed: 8, count: 134e3 }), $(".value2").numberRock({ speed: 8, count: 18e3 }), $(".value3").numberRock({ speed: 8, count: 6e6 }), $(".value4").numberRock({ speed: 8, count: 15e4 })) }), $("#myModal").modal(options)
});