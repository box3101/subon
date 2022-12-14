$(function () {
  $(document).ready(function () {
    initDOM();
    bindingEvent();
  });

  /*----------------------------함수선언부----------------------------*/

  //DOM 초기화
  function initDOM() {
  }

  //이벤트 바인딩
  function bindingEvent() {
    wow();
    htmlInclude();
    goTop();
    slides();
    subPanel();
    cdPopup();
    comTab();
    faq();
  }


  // wow.js
  function wow() {
    new WOW().init();
  }


  //html include
  function htmlInclude() {
    window.addEventListener('load', function () {
      var allElements = document.getElementsByTagName('*');
      Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              el.outerHTML = this.responseText;
            }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
        }
      });
    });
  }

  //GO TOP
  function goTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('.go-top').addClass("is-show");
      } else {
        $('.go-top').removeClass("is-show");
      }
    });
    $('.go-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 400);
      return false;
    });
  }

  //EX
  function slides() {

    speed = 1500;
    // visualSlider
    $(function () {

      const visualImgSlide = $("#visual-slide .swiper-slide");
      const visualNum = $(".num");
      const visualPlay = $(".visual-start");
      const visualStop = $(".visual-stop");
      let visualImgSlideNum = visualImgSlide.length;

      // visual-slide
      const visualSlide = new Swiper("#visual-slide", {
        effect: "fade",
        // loop: true,
        speed: speed,
        autoplay: {
          delay: 2000,
        },
        on: {
          slideChangeTransitionStart: function () {
            $(".num-current").html(this.realIndex + 1);
          },
        },
        pagination: {
          el: ".progressbar",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: ".visual-next",
          prevEl: ".visual-prev"
        },
      });

      // visual-txt
      const visualSlideTxt = new Swiper("#visual-txt", {
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        observer: true, observeParents: true,

      });

      visualSlide.controller.control = visualSlideTxt;
      visualSlideTxt.controller.control = visualSlide;

      visualNum.html(visualImgSlideNum);

      visualStop.on("click", function () {
        visualSlide.autoplay.stop();
        visualPlay.css({ "display": "inline-block" });
        visualStop.hide();
      });

      visualPlay.on("click", function () {
        visualSlide.autoplay.start();
        visualPlay.hide();
        visualStop.show();
      });

    });


  }

  //sub panel
  function subPanel() {
    $(".location > .inner > ul > li").on("click", function () {

      const $this = $(this);
      const sitePanel = $(".site_panel");
      const sitePanelValue = $(this).hasClass("is-active");

      if (!sitePanelValue) {
        active($this);
      } else {
        thisClick($this);
      }

      function active($this) {
        $this.addClass("is-active");
        $this.find(".site_panel").stop(true, true).slideDown(200);
      }

      function thisClick($this) {
        $this.removeClass("is-active");
        $this.find(".site_panel").stop(true, true).slideUp(200);
      }

    });
  }

  // cd-popup
  function cdPopup() {
    jQuery(document).ready(function ($) {
      //open popup
      $('.cd-popup-trigger').on('click', function (event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
      });

      //close popup
      $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.cd-close')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function (event) {
        if (event.which == '27') {
          $('.cd-popup').removeClass('is-visible');
        }
      });
    });
  }

  //com-tab
  function comTab() {
    const tabLi = $(".com-tab li");
    const tabBox = $(".tab-box");

    tabLi.on("click", function (e) {
      e.preventDefault();

      const target = $(this).find('a').attr("href");

      // tabmenu 클릭
      tabLi.removeClass("on");
      $(this).addClass('on');

      // tab content 변경
      tabBox.removeClass("on");
      $(target).addClass("on");

    });
  }

  //faq
  function faq() {
    /* faq 220726 */
    var faqDl = $(".faq-section");
    var faqDt = $(".faq-section dt");
    var faqDd = $(".faq-section dd");

    // 첫번째 활성화
    // faqDl.eq(0).children("dd").slideDown(500);
    // faqDl.eq(0).addClass("is-active");

    // 활성화 되었을때 클릭
    function dlCheck($this) {
      $this.parent("dl").removeClass("is-active");
      $this.siblings("dd").slideUp(500);
    }

    // 활성화 안되었을때 클릭
    function dlCheckOff($this) {
      faqDl.children("dd").slideUp(500);
      faqDl.removeClass("is-active");
      $this.siblings("dd").slideDown(500);
      $this.parent("dl").addClass("is-active");
    }

    faqDt.on("click", function () {

      var $this = $(this);
      var checkOn = $this.parent("dl").hasClass("is-active");


      if (checkOn) {
        dlCheck($this);
      } else {
        dlCheckOff($this);
      }

    });
    /*// faq 220726  */
  }


});
