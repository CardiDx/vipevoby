const header = document.querySelector("[data-js-header]");
const headerScrolledClass =
  header.getAttribute("data-js-header-scrolled") || "";
const headerOpenedClass = header.getAttribute("data-js-header-opened") || "";
const headerToggle = document.querySelector("[data-js-header-toggle]");
const headerToggleActiveClass =
  headerToggle.getAttribute("data-js-header-toggle-active") || "";

function animationHeader(item, currentPosition) {
  if (!item) {
    return;
  }
  currentPosition > 96
    ? item.classList.add(headerScrolledClass)
    : item.classList.remove(headerScrolledClass);
}

animationHeader(
  header,
  window.pageYOffset || document.documentElement.scrollTop
);

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  animationHeader(header, scrolled);
});

headerToggle &&
  header &&
  (headerToggle.onclick = (e) => {
    header.classList.toggle(headerOpenedClass);
    e.target.classList.toggle(headerToggleActiveClass);
  });

var headerLinks = document.querySelectorAll(".c-header__menu-link");
headerLinks.forEach(function (headerLink) {
  headerLink.addEventListener("click", function () {
    header.classList.remove("c-header--opened");
    headerToggle.classList.remove("c-header__burger--active");
  });
});

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

// function scrollToTop() {
//   // Scroll to top logic
//   rootElement.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }
// scrollToTopBtn.addEventListener("click", scrollToTop);
// document.addEventListener("scroll", handleScroll);

//Gallery
// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to key elements in the document
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeButton = document.getElementById('close');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  let currentIndex = 0;  // Track the current image index
  let captionEnabled = true;  // Toggle for showing/hiding captions

  // Add click event listener to the gallery
  gallery.addEventListener('click', e => {
      // Check if the clicked element is an image
      if (e.target.tagName === 'IMG') { 
          const imageSrc = e.target.dataset.image || e.target.src;  // Get image source
          const caption = e.target.dataset.caption || e.target.alt;  // Get image caption
          currentIndex = Array.from(gallery.children).indexOf(e.target);  // Update the current index
          updateImage(imageSrc, caption);  // Update the lightbox image and caption
          lightbox.style.display = 'flex';  // Show the lightbox
          fadeIn(lightbox, 500);  // Fade in the lightbox
          document.body.style.overflow = 'hidden';  // Disable page scrolling
      }
  });

  // Add click event listener to the close button
  closeButton.addEventListener('click', () => {
      fadeOut(lightbox, 500, () => {  // Fade out the lightbox
          lightbox.style.display = 'none';  // Hide the lightbox
          document.body.style.overflow = 'auto';  // Enable page scrolling
      });
  });

  // Add click event listener to the lightbox for closing when clicking outside the image
  lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
          fadeOut(lightbox, 500, () => {  // Fade out the lightbox
              lightbox.style.display = 'none';  // Hide the lightbox
              document.body.style.overflow = 'auto';  // Enable page scrolling
          });
      }
  });

  // Add click event listener to the next button for showing the next image
  nextButton.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % gallery.children.length;  // Calculate the next index
      const nextImage = gallery.children[nextIndex].dataset.image || gallery.children[nextIndex].src;  // Get the next image source
      const nextCaption = gallery.children[nextIndex].dataset.caption || gallery.children[nextIndex].alt;  // Get the next image caption
      fadeOut(lightboxImage, 500, () => {  // Fade out the current image
          updateImage(nextImage, nextCaption);  // Update to the next image and caption
          currentIndex = nextIndex;  // Update the current index
      });
  });

  // Add click event listener to the previous button for showing the previous image
  prevButton.addEventListener('click', () => {
      const prevIndex = (currentIndex - 1 + gallery.children.length) % gallery.children.length;  // Calculate the previous index
      const prevImage = gallery.children[prevIndex].dataset.image || gallery.children[prevIndex].src;  // Get the previous image source
      const prevCaption = gallery.children[prevIndex].dataset.caption || gallery.children[prevIndex].alt;  // Get the previous image caption
      fadeOut(lightboxImage, 500, () => {  // Fade out the current image
          updateImage(prevImage, prevCaption);  // Update to the previous image and caption
          currentIndex = prevIndex;  // Update the current index
      });
  });

  // Function to fade in an element
  function fadeIn(element, duration) {
      element.style.opacity = '0';  // Start with opacity 0
      element.style.transition = `opacity ${duration / 1000}s`;  // Set transition duration
      setTimeout(() => {
          element.style.opacity = '1';  // Change opacity to 1 to fade in
      }, 50);  // Delay to ensure the transition is applied
  }

  // Function to fade out an element
  function fadeOut(element, duration, onComplete) {
      element.style.opacity = '1';  // Start with opacity 1
      element.style.transition = `opacity ${duration / 1000}s`;  // Set transition duration
      setTimeout(() => {
          element.style.opacity = '0';  // Change opacity to 0 to fade out
          setTimeout(onComplete, duration);  // Execute callback after the duration
      }, 50);  // Delay to ensure the transition is applied
  }

  // Function to update the caption
  function updateCaption(caption) {
      if (captionEnabled) {
          lightboxCaption.innerHTML = caption;  // Set caption if enabled
      } else {
          lightboxCaption.innerHTML = '';  // Clear caption if disabled
      }
  }

  // Function to update the image and its caption
  function updateImage(src, caption) {
      lightboxImage.src = src;  // Update the image source
      updateCaption(caption);  // Update the caption
      fadeIn(lightboxImage, 500);  // Fade in the new image
  }
});



// let needToPlayAnimation = true;
// let i = 1;
// let timeout = 700;
// $(window).scroll(function () {
//   var howWorkTop = $("#how-work").position().top;
//   if ($(window).scrollTop() >= howWorkTop - 300) {
//     if (needToPlayAnimation) {
//       $(".c-steps-work__list-item-number").each(function () {
//         setTimeout(function () {
//           $(
//             ".c-steps-work__list-item:nth-of-type(" +
//               i +
//               ") .c-steps-work__list-item-number"
//           ).addClass("c-steps-work__list-item-number--highlighted");
//           i += 1;
//         }, timeout);
//         timeout += 700;
//       });
//       needToPlayAnimation = false;
//     }
//   }
// });

// AOS.init();

// popups

// $(document).on("click", ".show-sontact-us", function () {
//   let service = $(this).data("service");
//   $(".popup__select").val(service);
// });

// $(".show-sontact-us").magnificPopup({
//   items: {
//     src: ".popup--contact-us",
//   },
//   type: "inline",
//   mainClass: "my-mfp-slide-bottom",
//   fixedContentPos: true,
// });

// $(".show-thank-you").magnificPopup({
//   items: {
//     src: ".popup--thank-you",
//   },
//   type: "inline",
//   mainClass: "my-mfp-slide-bottom",
//   fixedContentPos: true,
// });

// // send message on email Ajax
// $("#main-form").submit(function () {
//   $.ajax({
//     type: "POST",
//     url: "mail.php",
//     data: $(this).serialize(),
//   }).done(function () {
//     $(this).find("input").val("");

//     $.magnificPopup.open({
//       items: {
//         src: "#thankyou",
//       },
//       mainClass: "mfp-letter",
//     });
//   });
//   return false;
// });
