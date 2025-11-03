//📍오똑 기획
// 백그라운드 모션
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#background");

  if (!section) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("in");   // 등장!
        io.unobserve(section);         // 한 번만 실행
      }
    });
  }, {
    root: null,
    threshold: 0.1,                  // 섹션의 12%만 보여도 발동
    rootMargin: "0px 0px -1% 0px"     // 조금 일찍 트리거
  });

  io.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#background");
  if (!section) return;

  const firstWrap = section.querySelector(".bg_first");
  const firstTitle = section.querySelector(".bg_first > .bg_title");
  const firstBottom = section.querySelector(".bg_first .bg_first_bottom");
  const firstBottomLeft  = firstBottom?.querySelector(":scope > img:first-child");
  const firstBottomRight = firstBottom?.querySelector(":scope > img:last-child");

  const secondWrap = section.querySelector(".bg_first2");
  const title2 = section.querySelector(".bg_first2 > .bg_title2");
  const second = section.querySelector(".bg_first2 > .bg_second");

  // 자식들에 fade-seq 적용(초기 숨김)
  [firstTitle, firstBottomLeft, firstBottomRight, title2, second]
    .filter(Boolean)
    .forEach(el => el.classList.add("fade-seq"));

  const ioSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // 섹션 자체 페이드업
      section.classList.add("in");

      // 0) 래퍼 먼저 보이게
      if (firstWrap) firstWrap.classList.add("show");

      // 1) 타이틀 → 2) 왼쪽 → 3) 오른쪽
      if (firstTitle)       setTimeout(() => firstTitle.classList.add("show"), 0);
      if (firstBottomLeft)  setTimeout(() => firstBottomLeft.classList.add("show"), 800);
      if (firstBottomRight) setTimeout(() => firstBottomRight.classList.add("show"), 1600);

      ioSection.unobserve(section);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  ioSection.observe(section);

  // 두 번째 그룹이 보이면: 래퍼 → 타이틀2 → 세컨드
  if (secondWrap) {
    const ioGroup2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        secondWrap.classList.add("show");
        if (title2) setTimeout(() => title2.classList.add("show"), 0);
        if (second) setTimeout(() => second.classList.add("show"), 800);

        ioGroup2.unobserve(secondWrap);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    ioGroup2.observe(secondWrap);
  }
});

// 유저 리서치 모션
window.addEventListener("scroll", () => {
  const section = document.querySelector("#user_research");
  const path = document.querySelector("#userLine path");
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const windowBottom = window.scrollY + window.innerHeight;

  const progress = Math.min(
    Math.max((windowBottom - sectionTop) / sectionHeight, 0),
    1
  );

  const pathLength = path.getTotalLength();
  const drawLength = pathLength * (1 - progress);
  path.style.strokeDashoffset = drawLength;
  if (progress >= 1) {
    path.style.strokeDashoffset = 0;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const users = document.querySelector("#users");
  const cards = Array.from(users.querySelectorAll(":scope > div")); // 자식만 선택

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .map(e => e.target)
      .sort((a, b) => cards.indexOf(a) - cards.indexOf(b));

    visible.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 300);
      io.unobserve(el);
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px" // ✅ 마지막 값에도 단위(px) 추가!
  });

  cards.forEach(el => io.observe(el));
});

//타이핑
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#sv_intro");
  const h1 = document.getElementById("typing-text");
  const text = "이제는 성인 ADHD 일상 개선 서비스\n오똑과 함께해요.";
  let i = 0, started = false;

  function type() {
    if (i < text.length) {
      h1.textContent += text[i]; // pre-wrap이 줄바꿈 처리
      i++;
      setTimeout(type, 80);      // 타이핑 속도
    } else {
      // 끝났을 때 커서 멈추려면 아래 주석 해제
      // h1.style.setProperty('--cursor-on', '0');
      h1.style.setProperty('animation', 'none'); // ::after엔 영향 없음
    }
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        h1.textContent = ""; // 초기화
        type();
        io.unobserve(section);
      }
    });
  }, { threshold: 0.6, rootMargin: "0px 0px -10% 0px" });

  io.observe(section);
});

//서비스 설계
// 스크롤 시 해당 이미지가 보이면 show 클래스 추가
// (기존 전역 옵저버가 있다면 먼저 끊기)
window.structureObserver?.disconnect();

document.addEventListener('DOMContentLoaded', () => {
  const imgs = [...document.querySelectorAll('#structure img')]
    // struct3_under 안에 있는 이미지는 제외
    .filter(img => !img.closest('.struct3_under'));

  const structureObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  imgs.forEach(img => structureObserver.observe(img));
  window.structureObserver = structureObserver; // 재정의/재사용 대비
});
//--
// 전역 #structure img 옵저버가 있다면: struct3는 제외
document.addEventListener('DOMContentLoaded', () => {
  const struct3 = document.querySelector('.struct3_under');
  if (!struct3) return;

  const unfoldObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;

    struct3.classList.add('show2');     // ← 이 줄이 실행되어야 CSS가 발동
    unfoldObserver.unobserve(struct3);  // 1회만
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  unfoldObserver.observe(struct3);
});
document.getElementById("openPdf").addEventListener("click", (e) => {
  e.preventDefault();

  // 1️⃣ 새 탭에서 열기
  window.open("./우수수_스토리보드.pdf", "_blank");

  // 2️⃣ 파일 다운로드도 동시에
  const link = document.createElement("a");
  link.href = "./우수수_스토리보드.pdf";
  link.download = "오똑_스토리보드.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});