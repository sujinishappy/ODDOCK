document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#onboarding");
const img2 = document.querySelector(".onboarding_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.2}); // 30% 보일 때 트리거

observer.observe(target);
});

//온보딩
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".ob_up");
const lineWrap = document.querySelector(".ob-line-wrap");
const items = document.querySelectorAll(".ob-item");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        // 1) svg 영역 왼→오로 열기
        lineWrap.classList.add("show");

        // 2) svg가 다 열리고 난 다음 이미지 등장
        setTimeout(() => {
        showImagesStepByStep();
        }, 1100); // CSS에서 1s 걸었으니까 1.1s 뒤에

        io.unobserve(target);
    }
    });
}, { threshold: 0.4});

io.observe(target);

function showImagesStepByStep() {
    items.forEach((img, idx) => {
    setTimeout(() => {
        img.classList.add("show");
    }, idx * 350);
    });
}
});
//
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".ob_down");
const lineWrap = document.querySelector(".ob-line2-wrap");
const items = document.querySelectorAll(".ob-item2");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        // 1) svg 영역 왼→오로 열기
        lineWrap.classList.add("show");

        // 2) svg가 다 열리고 난 다음 이미지 등장
        setTimeout(() => {
        showImagesStepByStep();
        }, 1100); // CSS에서 1s 걸었으니까 1.1s 뒤에

        io.unobserve(target);
    }
    });
}, { threshold: 0.4});

io.observe(target);

function showImagesStepByStep() {
    items.forEach((img, idx) => {
    setTimeout(() => {
        img.classList.add("show");
    }, idx * 350);
    });
}
});
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#check");
const img2 = document.querySelector(".check_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    } 
    });
}, { threshold: 0.3}); // 30% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
const section = document.querySelector(".check01");
const img1 = document.querySelector(".chk-1");
const img2 = document.querySelector(".chk-2");
const img3 = document.querySelector(".chk-3"); // 이건 나중에 다른 observer로 컨트롤

const io1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        img1.classList.add("show");
        setTimeout(() => img2.classList.add("show"), 300);
        // img3는 여기선 안 불러 — #checked 영역에서 등장
        io1.unobserve(section);
    }
    });
}, { threshold: 0.7});
io1.observe(section);
const checked = document.querySelector("#checked");

if (checked && img3) {
    const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        img3.classList.add("show");
        io2.unobserve(checked);
        }
    });
    }, { threshold: 0.3 });
    io2.observe(checked);
}
});

document.addEventListener("DOMContentLoaded", () => {
const checkedSec = document.querySelector("#checked");
const mainImg = document.querySelector(".chked");
const imgs = document.querySelectorAll(".checked_group > img"); // chked-1,2,3

if (!checkedSec) return;

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        if (mainImg) {
        mainImg.classList.add("show");
        }

        imgs.forEach((img, idx) => {
        setTimeout(() => {
            img.classList.add("show");
        }, 1000 + idx * 300); 
        });

        io.unobserve(checkedSec);
    }
    });
}, {
    threshold: 0.6
});

io.observe(checkedSec);
});

document.addEventListener("DOMContentLoaded", () => {
const states = {
    "chked-1": {
    normal: "./img4/checked_1.png",
    hover: "./img4/checked_1_hover.png",
    active: "./img4/checked_1_after.png"
    },
    "chked-2": {
    normal: "./img4/checked_2.png",
    hover: "./img4/checked_2_hover.png",
    active: "./img4/checked_2_after.png"
    },
    "chked-3": {
    normal: "./img4/checked_3.png",
    hover: "./img4/checked_3_hover.png",
    active: "./img4/checked_3_after.png"
    }
};

const imgs = document.querySelectorAll(".checked_group > img");

imgs.forEach(img => {
    const cls = Array.from(img.classList).find(c => c.startsWith("chked-"));
    const state = states[cls];
    let clicked = false;

    // hover
    img.addEventListener("mouseenter", () => {
    if (!clicked) img.src = state.hover;
    });
    img.addEventListener("mouseleave", () => {
    if (!clicked) img.src = state.normal;
    });

    // click
    img.addEventListener("click", () => {
    clicked = !clicked;
    img.src = clicked ? state.active : state.normal;

    // ✨ 클릭 순간 효과 (눌림 후 복원)
    img.classList.add("clicked");
    setTimeout(() => img.classList.remove("clicked"), 150);
    });
});
});

document.addEventListener("DOMContentLoaded", () => {
const meno = document.querySelector("#meno");
const line = document.querySelector(".checked_line");

if (meno && line) {
    const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        line.classList.add("show");
        io.unobserve(meno); // 한 번만 실행
        }
    });
    }, { threshold: 0.1 });

    io.observe(meno);
}
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#meno");
const img2 = document.querySelector(".meno_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.3}); // 30% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#meno");
const items = document.querySelectorAll(".meno-item2");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        setTimeout(() => {
        showImagesStepByStep();
        }, 1100);

        io.unobserve(target);
    }
    });
}, { threshold: 0.2});

io.observe(target);

function showImagesStepByStep() {
    items.forEach((img, idx) => {
    setTimeout(() => {
        img.classList.add("show");
    }, idx * 350);
    });
}
});
//스케줄
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".schedule");
const img2 = document.querySelector(".schedule_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    } 
    });
}, { threshold: 0.2}); // 30% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".schedule");
const items = document.querySelectorAll(".schedule-item2");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        setTimeout(() => {
        showImagesStepByStep();
        }, 1100);

        io.unobserve(target);
    }
    });
}, { threshold: 0.3});

io.observe(target);

function showImagesStepByStep() {
    items.forEach((img, idx) => {
    setTimeout(() => {
        img.classList.add("show");
    }, idx * 250);
    });
}
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".schedule"); // #schedule 섹션
const line = document.querySelector(".schedule_line");

if (!target || !line) return;

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        line.classList.add("show");
        io.unobserve(target); // 한 번만 실행
    }
    });
}, { threshold: 0.3 });

io.observe(target);
});
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".sch_2");
const items = document.querySelectorAll(".sch_2-item2");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        setTimeout(() => {
        showImagesStepByStep();
        }, 1100);

        io.unobserve(target);
    }
    });
}, { threshold: 0.2});

io.observe(target);

function showImagesStepByStep() {
    items.forEach((img, idx) => {
    setTimeout(() => {
        img.classList.add("show");
    }, idx * 350);
    });
}
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".sch_2");
const img2 = document.querySelector(".sch_2_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    } 
    });
}, { threshold: 0.2}); // 30% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector(".diary");
const img2 = document.querySelector(".diary_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.2 }); // 20% 보일 때 트리거

observer.observe(target);
});

//게임
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#game");
const img2 = document.querySelector(".game_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.1}); // 20% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
// 각 섹션을 전부 선택
const sections = document.querySelectorAll(".game-01, .game-02, .game-03");

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const imgs = entry.target.querySelectorAll("img");
        imgs.forEach((img, idx) => {
        setTimeout(() => {
            img.classList.add("show");
        }, idx * 300); // 이미지 간격 (0.3초씩)
        });

        io.unobserve(entry.target); // 한 번만 작동
    }
    });
}, { threshold: 0.3 });

sections.forEach(sec => io.observe(sec));
});

//오톡
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#otalk");
const img2 = document.querySelector(".otalk_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.3}); // 20% 보일 때 트리거

observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
const otalk = document.querySelector("#otalk");
const items = document.querySelectorAll(".otalk_content img"); 
// => .otalks_01, .otalks_02, .otalks_03 전부 들어옴

if (!otalk || !items.length) return;

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {

        // 순서대로 등장
        items.forEach((img, idx) => {
        setTimeout(() => {
            img.classList.add("show");
        }, idx * 900);   // 0.32초 간격
        });

        io.unobserve(otalk); // 한 번만
    }
    });
}, {
    threshold: 0.25  // 섹션 1/4쯤 보이면 실행
});

io.observe(otalk);
});

//마이페이지
document.addEventListener("DOMContentLoaded", () => {
const target = document.querySelector("#mypage");
const img2 = document.querySelector(".mypage_title");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        img2.classList.add("active");
    }
    });
}, { threshold: 0.3}); // 20% 보일 때 트리거

observer.observe(target);
});


document.addEventListener("DOMContentLoaded", () => {
const section = document.querySelector("#mypage");
const items = document.querySelectorAll(".mypage_content img");

if (!section || !items.length) return;

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {

        // 순차적으로 등장
        items.forEach((img, idx) => {
        setTimeout(() => {
            img.classList.add("show");
        }, idx * 400); // 0.35초 간격
        });

        io.unobserve(section); // 한 번만 실행
    }
    });
}, { threshold: 0.4 }); // 섹션 30% 보이면 실행

io.observe(section);
});

//라스트
document.addEventListener("DOMContentLoaded", () => {
const lastSec = document.querySelector("#last");
const textEl = lastSec.querySelector("h1");
const fullText = textEl.innerText.trim(); // 원문 텍스트
textEl.innerText = ""; // 초기화

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        typeText(); // 타이핑 시작
        io.unobserve(lastSec);
    }
    });
}, { threshold: 0.6 });

io.observe(lastSec);

function typeText() {
    textEl.classList.add("show");
    let idx = 0;

    const typing = setInterval(() => {
    textEl.innerText = fullText.slice(0, idx);
    idx++;

    if (idx > fullText.length) {
        clearInterval(typing);
        textEl.style.borderRight = "none"; // 커서 제거
    }
    }, 100); // 한 글자당 0.08초 속도 (자연스럽게)
}
});

//gif
document.addEventListener("DOMContentLoaded", () => {
const section = document.querySelector("#diary");
const video = document.querySelector(".timer");
if (!section || !video) return;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        // 섹션 보이면 재생
        video.currentTime = 0; // 처음부터 시작
        video.play();
    } else {
        // 벗어나면 정지
        video.pause();
        video.currentTime = 0;
    }
    });
}, { threshold: 0.3 }); // 화면의 50% 이상 보이면 트리거

observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
const section = document.getElementById("otalk");
const gif = section?.querySelector(".otalk_video");
if (!section || !gif) return;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        // 섹션이 보이면 GIF 다시 재생
        const src = gif.getAttribute("src");
        gif.setAttribute("src", src); // src 재설정으로 새로 로드 → 다시 재생
    }
    });
}, { threshold: 0.5 }); // 화면의 절반 이상 보일 때 트리거

observer.observe(section);
});
