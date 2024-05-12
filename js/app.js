// const header = document.querySelector("[data-js-header]");
// const headerScrolledClass =
//   header.getAttribute("data-js-header-scrolled") || "";
// const headerOpenedClass = header.getAttribute("data-js-header-opened") || "";
// const headerToggle = document.querySelector("[data-js-header-toggle]");
// const headerToggleActiveClass =
//   headerToggle.getAttribute("data-js-header-toggle-active") || "";

// function animationHeader(item, currentPosition) {
//   if (!item) {
//     return;
//   }
//   currentPosition > 96
//     ? item.classList.add(headerScrolledClass)
//     : item.classList.remove(headerScrolledClass);
// }

// animationHeader(
//   header,
//   window.pageYOffset || document.documentElement.scrollTop
// );

// window.addEventListener("scroll", function () {
//   const scrolled = window.pageYOffset || document.documentElement.scrollTop;
//   animationHeader(header, scrolled);
// });

// headerToggle &&
//   header &&
//   (headerToggle.onclick = (e) => {
//     header.classList.toggle(headerOpenedClass);
//     e.target.classList.toggle(headerToggleActiveClass);
//   });

// var headerLinks = document.querySelectorAll(".c-header__menu-link");
// headerLinks.forEach(function (headerLink) {
//   headerLink.addEventListener("click", function () {
//     header.classList.remove("c-header--opened");
//     headerToggle.classList.remove("c-header__burger--active");
//   });
// });

// scroll up

var scrollToTopBtn = document.querySelector(".scroll-up");
var rootElement = document.documentElement;

function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.8) {
    scrollToTopBtn.classList.add("scroll-up--show");
  } else {
    scrollToTopBtn.classList.remove("scroll-up--show");
  }
}

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

let needToPlayAnimation = true;
let i = 1;
let timeout = 700;
$(window).scroll(function () {
  var howWorkTop = $("#how-work").position().top;
  if ($(window).scrollTop() >= howWorkTop - 300) {
    if (needToPlayAnimation) {
      $(".c-steps-work__list-item-number").each(function () {
        setTimeout(function () {
          $(
            ".c-steps-work__list-item:nth-of-type(" +
              i +
              ") .c-steps-work__list-item-number"
          ).addClass("c-steps-work__list-item-number--highlighted");
          i += 1;
        }, timeout);
        timeout += 700;
      });
      needToPlayAnimation = false;
    }
  }
});

AOS.init();

popups

$(document).on("click", ".show-sontact-us", function () {
  let service = $(this).data("service");
  $(".popup__select").val(service);
});

$(".show-sontact-us").magnificPopup({
  items: {
    src: ".popup--contact-us",
  },
  type: "inline",
  mainClass: "my-mfp-slide-bottom",
  fixedContentPos: true,
});

$(".show-thank-you").magnificPopup({
  items: {
    src: ".popup--thank-you",
  },
  type: "inline",
  mainClass: "my-mfp-slide-bottom",
  fixedContentPos: true,
});

// send message on email Ajax
$("#main-form").submit(function () {
  $.ajax({
    type: "POST",
    url: "mail.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");

    $.magnificPopup.open({
      items: {
        src: "#thankyou",
      },
      mainClass: "mfp-letter",
    });
  });
  return false;
});
