// $(function () {
// "use strict";

// var lastScrollTop = 0;
// var header = $("header");
// var headerHeight = header.outerHeight();

// $(window).on("scroll", function () {
//     var st = $(this).scrollTop();

//     if (st > lastScrollTop) {
//     // 스크롤을 아래로 내릴 때
//     header.css("top", -headerHeight + "px");
//     } else {
//     // 스크롤을 위로 올릴 때
//     header.css("top", "0");
//     }
//     lastScrollTop = st;
// });
// });

// var controller = new ScrollMagic.Controller();

// var ani04_1 = gsap.timeline();
// ani04_1.from("#main header", 1, {
// opacity: 0, // 시작값 0
// delay: 0,
// y: "-80vh", // 오른쪽으로 이동 (값은 원하는 만큼 조절)
// });

// var scene1 = new ScrollMagic.Scene({
// triggerElement: "#main",
// triggerHook: 0,
// })
// .setTween(ani04_1)
// .addTo(controller);

document.addEventListener("DOMContentLoaded", () => {
  const pointer = document.querySelector(".pointer");
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  // 마우스 위치 저장
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    pointer.style.opacity = "1";
  });

  // 부드럽게 따라오게
  function animate() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    pointer.style.left = currentX + "px";
    pointer.style.top = currentY + "px";
    requestAnimationFrame(animate);
  }
  animate();

  // 클릭 시 작게 반응
  document.addEventListener("mousedown", () => {
    pointer.classList.add("active");
  });
  document.addEventListener("mouseup", () => {
    pointer.classList.remove("active");
  });
});


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}