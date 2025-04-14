// アジフライ
document.addEventListener('DOMContentLoaded', function () {
// ===== 画像プリロード =====
function preloadImages() {
for (let i = 1; i <= 29; i++) {
  const img = new Image();
  img.src = 'assets/img/top/aji' + i + '.png';
}
}
preloadImages();

// ===== スクロールで画像切り替え =====
function throttle(fn, wait) {
let lastTime = 0;
return function () {
  const now = Date.now();
  if (now - lastTime >= wait) {
    fn();
    lastTime = now;
  }
};
}

const changeImageOnScroll = throttle(function () {
const scrollTop = window.scrollY;
const imageNumber = scrollTop >= 300
  ? 29
  : Math.max(1, Math.ceil((scrollTop / 300) * 29));

const imageElement = document.getElementById('change-image');
if (imageElement) {
  imageElement.src = 'assets/img/top/aji' + imageNumber + '.png';
}
}, 100); // 100msごとに実行

window.addEventListener('scroll', changeImageOnScroll);

// ===== カルーセル実装 =====
const carousel = document.querySelector('.carousel-js');

if (carousel) {
const updateCarousel = () => {
  const slidesToShow = window.innerWidth <= 750 ? 2 : 4;
  const slideWidth = carousel.offsetWidth / slidesToShow;

  // スライド複製 (初回のみ)
  if (!carousel.dataset.cloned) {
    const slides = Array.from(carousel.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      carousel.appendChild(clone);
    });
    carousel.dataset.cloned = 'true';
  }

  let position = 0;

  function animate() {
    position -= 1;
    const totalWidth = carousel.scrollWidth / 2; // 元の長さ分でループ
    if (Math.abs(position) >= totalWidth) {
      position = 0;
    }
    carousel.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
};

// 初回実行
updateCarousel();

// 画面リサイズ時も対応
window.addEventListener('resize', updateCarousel);
}
});


$(function () {

  $("#js-hamburger-menu, .navigation__link").click(function () {
    $(".header-sp,.black-bg,.header").toggleClass("active"); //ボタン自身に activeクラスを付与し
  });
  $(".header-sp").click(function () {
    $(".header-sp,.black-bg,.header").toggleClass("active");
    $('.hamburger-menu').toggleClass('hamburger-menu--open');
  });

  // ハンバーガーメニュー
  $(function () {
    $('#js-hamburger-menu, .navigation__link').on('click', function () {
      $('.navigation').slideToggle(500);
      $('.hamburger-menu').toggleClass('hamburger-menu--open')
    });
  });

  // ヘッダー隠れる動き

  let startPos = 0;
  let winScrollTop = 0;
  const Header = $('.header');
  $(window).on('scroll', function () {
    winScrollTop = $(this).scrollTop();
    if (winScrollTop >= startPos && winScrollTop > 100) { // ここにコードを追加
      $(Header).addClass('is-hide');
    } else {
      $(Header).removeClass('is-hide');
    }
    startPos = winScrollTop;
  });


  // ローディング
  $(function () {
    $(window).on('load', function () {
      $(".loading-anime-wrap").delay(800).fadeOut('slow');
    });

    function loaderClose() {
      $(".loading-anime-wrap").fadeOut('slow');
    }
    setTimeout(loaderClose, 10000);
  });


  $(".top-to-js").click(function () {
    $("body,html").animate({
        scrollTop: 0 //ページトップまでスクロール
      },
      500
    ); //ページトップスクロールの速さ。
    return false; //親要素へのイベント伝播を止める
  });



  //フェードイン
  $(window).scroll(function () {
    $('.fadein-anime,.fadein-anime02,.fadein-anime03,.fadein-anime04').each(function () {
      var pos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var wHeight = $(window).height();
      if (scroll > pos - wHeight + wHeight / 100) {
        $(this).addClass('active');
      }
    });
  });


  $(window).scroll(function () {
    $('.fadein-anime03,.fadein-anime04').each(function () {
      var pos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var wHeight = $(window).height();
      if (scroll > pos - wHeight + wHeight / 200) {
        $(this).addClass('active');
      }
    });
  });


  $(window).scroll(function () {
    // 要素の位置を取得
    var targetTop = $(".follow-btn-js").offset().top;
    // 要素の上端が画面上端から 200px 以上離れているかどうかを確認
    if (targetTop >= 800) {
      // 要素にクラスを付与
      $(".follow-btn-js").addClass("active");
    } else {
      // 要素からクラスを削除
      $(".follow-btn-js").removeClass("active");
    }
  });


  $(function () {
    var headerHeight = 40; // ヘッダーの高さ
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHeight;
      $("html, body").animate({
        scrollTop: position
      }, speed, "swing");
      return false;
    });
  });



  // アバウトスライダー

  $(function () {
    const $slider = $('.about-slider-js');
  
    // 初期化
    $slider.slick({
      centerMode: true,
      centerPadding: '25%',
      slidesToShow: 1,
      infinite: true,
      speed: 7000, // 流れる速さ（急停止するので適度に速く）
      autoplay: true,
      autoplaySpeed: 0, // 自動再生の間隔なし
      arrows: false,
      dots: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      cssEase: 'linear', // 一定速度で流す
    });
  
    // 初回スタート
    let isPaused = false;
  
    // スライド移動後イベント
    $slider.on('afterChange', function () {
      if (!isPaused) {
        isPaused = true;
        $slider.slick('slickPause'); // ピタッと停止
        setTimeout(function () {
          $slider.slick('slickPlay'); // 再開
          isPaused = false;
        }, 3000); // 3秒停止
      }
    });
  });





})

