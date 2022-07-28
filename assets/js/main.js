$(function () {

  $(document).ready(function () {
    initDOM();
    bindingEvent();
  });

  /*----------------------------함수선언부----------------------------*/

  //DOM 초기화
  function initDOM() {
    let speed;
  }

  //이벤트 바인딩
  function bindingEvent() {
    slide();
    goTop();
    htmlInclude();
    subPanel()
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
  function slide() {

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
  
      if(!sitePanelValue){
        active($this);
      }else{
        thisClick($this);
      }
  
      function active($this) {
        $this.addClass("is-active");
        $this.find(".site_panel").stop(true,true).slideDown(400);
      }
  
      function thisClick($this) {
        $this.removeClass("is-active");
        $this.find(".site_panel").stop(true,true).slideUp(400);
      }
  
    });
  }


});
