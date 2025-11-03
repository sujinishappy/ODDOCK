(function () {
const container = document.getElementById('design_main');
if (!container) return;

const stickers = Array.from(container.querySelectorAll('img'));
let zTop = 10;

// ✅ 스티커 드래그 로직
stickers.forEach((img) => {
    let dragging = false;
    let grabDX = 0, grabDY = 0;

    const onDown = (e) => {
    e.preventDefault();
    img.classList.add('is-dragging');
    img.style.zIndex = ++zTop;

    const rect = img.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

    // 포인터가 이미지 안에서 어디를 잡았는지 저장
    grabDX = clientX - rect.left;
    grabDY = clientY - rect.top;

    if (img.setPointerCapture && e.pointerId !== undefined) {
        try { img.setPointerCapture(e.pointerId); } catch {}
    }

    dragging = true;
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp, { passive: true });
    };

    const onMove = (e) => {
    if (!dragging) return;
    e.preventDefault();

    const cRect = container.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    let nextL = (clientX - cRect.left) - grabDX;
    let nextT = (clientY - cRect.top) - grabDY;

    const maxL = cRect.width - img.offsetWidth;
    const maxT = cRect.height - img.offsetHeight;
    nextL = Math.max(0, Math.min(nextL, maxL));
    nextT = Math.max(0, Math.min(nextT, maxT));

    img.style.left = nextL + 'px';
    img.style.top = nextT + 'px';
    };

    const onUp = () => {
    dragging = false;
    img.classList.remove('is-dragging');
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    };

    img.addEventListener('pointerdown', onDown);
});

console.log('sticker drag initialized', stickers.length);
})();

//심볼 네이밍 타이틀 오똑부분
document.addEventListener('DOMContentLoaded', () => {
const section = document.getElementById('naming');
const o = section?.querySelector('.mark-o');
const t = section?.querySelector('.mark-ttok');
if (!section || !o || !t) return;

// "완전히 진입"에 가깝게: 90% 이상 보이면 트리거 (1.0은 환경 따라 미발동될 수 있어 0.9 권장)
const io = new IntersectionObserver((entries, obs) => {
    const e = entries[0];
    if (e.isIntersecting && e.intersectionRatio >= 0.5) {
    // 순서대로 실행: 오 -> (지연) -> 똑
    o.classList.add('play');
    setTimeout(() => t.classList.add('play'), 350); // ‘똥-똥’ 간격
    obs.unobserve(section); // 한 번만 실행
    }
}, { threshold: [0, 0.5, 0.9, 1] });

io.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('symbol');
  if (!section) return;

  const lf = section.querySelector('.symbol_lf');
  const rg = section.querySelector('.symbol_rg');

  const io = new IntersectionObserver((entries, obs) => {
    const e = entries[0];
    if (!e.isIntersecting) return;

    // 1) 왼쪽 카드 모션 먼저
    lf.classList.add('play');

    // 2) 약간의 지연 뒤 오른쪽 카드 모션
    setTimeout(() => rg.classList.add('play'), 1500);

    obs.unobserve(section); // 한 번만 실행하고 해제 (원하면 제거)
  }, { threshold: 0.9 }); // 섹션이 충분히 보일 때 트리거

  io.observe(section);
});
//--------//
(function(){
  const GROUPS = 4;

  const leftSrcs = [
    './img3/left_1.png',
    './img3/left_2.png',
    './img3/left_3.png',
    './img3/left_4.png'
  ];
  const rightSrcs = [
    './img3/right_1.png',
    './img3/right_2.png',
    './img3/right_3.png',
    './img3/right_4.png'
  ];

  const section = document.querySelector('#guide');
  const leftStack  = document.querySelector('.contnet_left');
  const rightStack = document.querySelector('.contnet_right');

  if(!section || !leftStack || !rightStack){
    console.warn('필수 요소를 찾지 못했습니다.');
    return;
  }

  // 스택 안에 레일 생성 후 이미지 아이템을 세로로 쌓기
  function buildRail(stackEl, srcList){
    // rail 만들기
    const rail = document.createElement('div');
    rail.className = 'rail';
    // 이미지 아이템 채우기
    srcList.forEach((src, i)=>{
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `<img src="${src}" alt="slide ${i+1}" decoding="async">`;
      rail.appendChild(item);
    });
    // 기존 자식 제거 후 rail만 넣기
    stackEl.innerHTML = '';
    stackEl.appendChild(rail);
    return rail;
  }

  const leftRail  = buildRail(leftStack,  leftSrcs);
  const rightRail = buildRail(rightStack, rightSrcs);

  // 현재 인덱스
  let index = 0;

  function snapTo(i){
    index = Math.max(0, Math.min(GROUPS - 1, i));
    const t = `translateY(${index * -100}%)`;
    leftRail.style.transform  = t;
    rightRail.style.transform = t;
  }

  // 진행도 → 인덱스 (스텝형, 뻑뻑하게)
  function getProgress(){
    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const total = rect.height - viewH;
    if(total <= 0) return 0;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    return scrolled / total; // 0..1
  }

  function progressToIndex(p){
    const seg = 1 / GROUPS;
    return Math.min(GROUPS - 1, Math.floor(p / seg + 0.00001));
  }

  let ticking = false;
  window.addEventListener('scroll', ()=>{
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      const p = getProgress();
      const target = progressToIndex(p);
      if(target !== index) snapTo(target);
      ticking = false;
    });
  }, {passive:true});

  window.addEventListener('resize', ()=>{
    const p = getProgress();
    snapTo(progressToIndex(p));
  });

  // 초기 위치
  snapTo(0);
})();

document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#system");
  const img2 = document.querySelector(".system_img.second");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img2.classList.add("active");
      } else {
        img2.classList.remove("active");
      }
    });
  }, { threshold: 0.3 }); // 30% 보일 때 트리거

  observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
  const stick = document.getElementById("cursorStick");
  const section = document.getElementById("design_main");
  const imgs = section.querySelectorAll("img:not(#cursorStick)");

  let isActive = true;

  // 마우스 움직임 감지
  document.addEventListener("mousemove", (e) => {
    if (!isActive) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // 커서가 #design_main 안에 있을 때만 보이게
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      stick.style.opacity = "1";
      stick.style.left = e.pageX + "px";
      stick.style.top = e.pageY + "px";
    } else {
      stick.style.opacity = "0";
    }
  });

  // 이미지 클릭 시 stick 사라지기
  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (!isActive) return;
      isActive = false;
      stick.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      stick.style.opacity = "0";
      stick.style.transform = "scale(0.9)";
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#color');
    const cols = Array.from(section.querySelectorAll('.col'));

    const STAGGER = 160; // 열 등장 간격(ms)

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          // 한 번만 재생하려면 다음 줄 주석 해제
          io.unobserve(section);

          cols.forEach((col, i) => {
            setTimeout(() => {
              col.classList.add('show');
            }, i * STAGGER);
          });
        } else {
          // 벗어나면 되감기 원하면 reset
          cols.forEach(col => col.classList.remove('show'));
        }
      });
    }, { threshold: 0.9 });

    io.observe(section);
  });