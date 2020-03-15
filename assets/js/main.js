$(function() {
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('#preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');    

        var scroll = $(window).scrollTop();
        if (scroll < 15) {
            if ( $(this).hasClass('active') ) {
                $(".navgition").addClass("sticky");
            } else {
                $(".navgition").removeClass("sticky");
            }
        }
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");

        var scroll = $(window).scrollTop();
        if (scroll < 15) {
            $(".navgition").removeClass("sticky");
        }
    });
    
    
    //===== Sticky
    
    $(window).on('scroll',function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 15) {
            $(".navgition").removeClass("sticky");
        }else{
            $(".navgition").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active
    
    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 90;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });
    
    
    //====== Magnific Popup
    
    $('.video-popup').magnificPopup({
        type: 'iframe'
        // other options
    });
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    
    
    //===== 
    jQuery.expr[':'].icontains = function(a, i, m) {
        return jQuery(a).text().toLocaleUpperCase()
            .indexOf(m[3].toLocaleUpperCase()) >= 0;
    };
    
    // Fetch Events
    function fetchEvents(sira) {
        var eventTemplate = `
            <div class="col-lg-4 col-md-7 col-sm-9">
                <div class="single-pricing mt-40">
                    <div class="d-block">
                        <img src="" alt="" />
                    </div>
                    <div class="pricing-header text-center">
                        <h5 class="sub-title"></h5>
                        <span class="price"></span>
                        <p class="year">Konferans</p>
                    </div>
                    <div class="pricing-list text-center mb-70">

                    </div>
                    <div class="buttom-shape">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35"><defs><style>.color-1{fill:#58BBB3;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}</style></defs><title>bottom-part1</title><g id="bottom-part"><g id="Group_747" data-name="Group 747"><path id="Path_294" data-name="Path 294" class="cls-1 color-1" d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z" transform="translate(0 0)"/><path id="Path_297" data-name="Path 297" class="cls-2 color-1" d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z" transform="translate(0 0)"/><path id="Path_296" data-name="Path 296" class="cls-3 color-1" d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z" transform="translate(0 0)"/><path id="Path_295" data-name="Path 295" class="cls-4 color-1" d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z" transform="translate(0 0)"/></g></g></svg>
                    </div>
                </div> <!-- single pricing -->
            </div>
        `
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://kokludegisim.net/api.php",
            type: "POST",
            data: {
                'token': '123',
                'type': 'yeniFaaliyet',
                'siraNo': sira
            },
            success: function (res) {
                var events = $(res).find('.item a:icontains(aile), .item a:icontains(AİLE)').parents('.news');
                events.each(function(index) {
                    var template = $(eventTemplate);
                    template.find('img').attr('src', 'https://kokludegisim.net/' + $(this).find('img').attr('src'))
                    template.find('img').attr('alt', $(this).find('.title-left h3').text());
                    template.find('.price').text($(this).find('.title-left h3').text());
                    const date = new Date($(this).find('.schedule-hour').text())
                    const formatted = new Intl.DateTimeFormat('tr', { year: 'numeric', month: 'long', day: '2-digit' }) 
                    const [{ value: month },,{ value: day },,{ value: year }] = formatted.formatToParts(date) 
                    template.find('.sub-title').text(`${day} ${month} ${year}`);
                    template.find('.pricing-list').text($(this).find('p').text());
                    template.find('.stretched-link').attr('href', 'https://kokludegisim.net/' + $(this).find('.title-left h3 a').attr('href'));
                    $('.events-ajax').append(template);
                })
                $('.events-ajax').html(
                    $('.events-ajax .col-lg-4').sort(function(a, b) {
                        var aId = new Date($(a).find('.sub-title').text());
                        var bId = new Date($(b).find('.sub-title').text());
                        return bId - aId;
                    })
                );
            }
        });
    }
    $('.events-ajax').html('');
    fetchEvents(0);
    fetchEvents(24);
    
    // Fetch Articles
    function fetchArticles(sira) {
        var articleTemplate = `
            <div class="col-md-4">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
                    <div class="d-block">
                        <img src="" alt="" />
                    </div>
                    <div class="col p-4 d-flex flex-column position-static bg-white">
                        <h4 class="mb-1"></h4>
                        <div class="mb-1 text-muted"></div>
                        <p class="card-text mb-1"></p>
                        <a href="" target="_blank" class="stretched-link" style="color: #a9a9a9">Devamını oku</a>
                    </div>
                </div>
            </div>
        `
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://kokludegisim.net/api.php",
            type: "POST",
            data: {
                'token': '123',
                'type': 'yeniMakale',
                'siraNo': sira
            },
            success: function (res) {
                var articles = $(res).find(`
                    .entry-block-small a:icontains(aile),
                    .entry-block-small a:icontains(istanbul),
                    .entry-block-small a:icontains(evli)
                `).parents('.entry-block-small');
                articles.each(function(index) {
                    var template = $(articleTemplate);
                    template.find('img').attr('src', 'https://kokludegisim.net/' + $(this).find('img').attr('src'))
                    template.find('img').attr('alt', $(this).find('h3').text());
                    template.find('h4').text($(this).find('h3').text());
                    template.find('.text-muted').text($(this).find('.content p:eq(0)').text());
                    template.find('.card-text').text($(this).find('.content p:eq(1)').text());
                    template.find('.stretched-link').attr('href', 'https://kokludegisim.net/' + $(this).find('h3 a').attr('href'));
                    $('.articles-ajax').append(template);
                })
                $('.articles-ajax').html(
                    $('.articles-ajax .col-md-4').sort(function(a, b) {
                        var aId = new Date($(a).find('.text-muted').text());
                        var bId = new Date($(b).find('.text-muted').text());
                        return bId - aId;
                    })
                );
            }
        });
    }
    $('.articles-ajax').html('');
    fetchArticles(0);
    fetchArticles(24);
    
    // Fetch News
    function fetchNews(sira) {
        var newsTemplate = `
            <div class="col-md-4">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
                    <div class="d-block">
                        <img src="" alt="" />
                    </div>
                    <div class="col p-4 d-flex flex-column position-static bg-white">
                        <h4 class="mb-1"></h4>
                        <div class="mb-1 text-muted"></div>
                        <p class="card-text mb-1"></p>
                        <a href="" target="_blank" class="stretched-link" style="color: #a9a9a9">Devamını oku</a>
                    </div>
                </div>
            </div>
        `
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://kokludegisim.net/api.php",
            type: "POST",
            data: {
                'token': '123',
                'type': 'yeniHaber',
                'siraNo': sira
            },
            success: function (res) {
                var news = $(res).find('.item-content a:icontains(aile)').parents('.item');
                news.each(function(index) {
                    if ( $(this).find('.item-image-1 span a').text().trim().toLowerCase() === 'özel haberler' ) {
                        var template = $(newsTemplate);
                        template.find('img').attr('src', 'https://kokludegisim.net/' + $(this).find('img').attr('src'))
                        template.find('img').attr('alt', $(this).find('h3').text());
                        template.find('h4').text($(this).find('h3').text());
                        template.find('.text-muted').text($(this).find('.item-content p:last-child').text());
                        template.find('.card-text').text($(this).find('.item-content p:eq(0)').text());
                        template.find('.stretched-link').attr('href', 'https://kokludegisim.net/' + $(this).find('h3 a').attr('href'));
                        $('.news-ajax').append(template);
                        $('.news-ajax').html(
                            $('.news-ajax .col-md-4').sort(function(a, b) {
                                var aId = $(a).find('img').attr('src').match(/\d+/g);
                                var bId = $(b).find('img').attr('src').match(/\d+/g);
                                return +aId < +bId ? 1 : -1;
                            })
                        );
                    }
                })
            }
        });
    }
    $('.news-ajax').html('');
    fetchNews(0);
    fetchNews(24);
    fetchNews(48);
    
    // Fetch Videos
    function fetchVideos(sira) {
        var videosTemplate = `
            <div class="col-md-4">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-white">
                    <div class="d-block">
                        <img src="" alt="" />
                    </div>
                    <div class="col p-4 d-flex flex-column position-static text-center bg-white">
                        <p class="card-text mb-1"></p>
                        <a href="" target="_blank" class="stretched-link" style="color: #a9a9a9"></a>
                    </div>
                </div>
            </div>
        `
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://kokludegisim.net/videolar/video-9",
            type: "GET",
            success: function (res) {
                var videos = $(res).find('.entry-block-small h3 a:icontains(aile), .entry-block-small h3 a:icontains(AİLE)').parents('.entry-block-small');
                videos.each(function(index) {
                    var template = $(videosTemplate);
                    template.find('img').attr('src', 'https://kokludegisim.net/' + $(this).find('img').attr('src'))
                    template.find('img').attr('alt', $(this).find('h3').text());
                    template.find('.card-text').text($(this).find('h3').text());
                    template.find('.stretched-link').attr('href', 'https://kokludegisim.net/' + $(this).find('h3 a').attr('href'));
                    $('.videos-ajax').append(template);
                    $('.videos-ajax').html(
                        $('.videos-ajax .col-md-4').sort(function(a, b) {
                            var aId = $(a).find('img').attr('src').match(/\d+/g);
                            var bId = $(b).find('img').attr('src').match(/\d+/g);
                            return +aId < +bId ? 1 : -1;
                        })
                    );
                })
            }
        });
    }
    $('.videos-ajax').html('');
    fetchVideos(0);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});