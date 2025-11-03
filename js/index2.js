document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('video_main');
  if (!section) { console.warn('[eyes] #video_main 없음'); return; }

  const eyes = section.querySelectorAll('.eye');
  if (!eyes.length) { console.warn('[eyes] .eye 없음'); return; }

  let mouseX = 0, mouseY = 0, rafId = null;

  // 섹션의 가운데를 기본 목표로 설정
  const setCenterAsTarget = () => {
    const r = section.getBoundingClientRect();
    mouseX = r.width / 2;
    mouseY = r.height / 2;
    if (!rafId) rafId = requestAnimationFrame(tick);
  };
  setCenterAsTarget();

  // 윈도우 기준 좌표를 섹션 로컬 좌표로 변환
  const updateMouse = (clientX, clientY) => {
    const rect = section.getBoundingClientRect();
    mouseX = clientX - rect.left;
    mouseY = clientY - rect.top;
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  // 이벤트: 윈도우에 걸어서 오버레이/덮개 있어도 동작
  const onMove = e => updateMouse(e.clientX, e.clientY);
  const onTouch = e => {
    const t = e.touches[0];
    if (t) updateMouse(t.clientX, t.clientY);
  };
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });

  // 파라미터(필요시 조절)
  const followRatio = 0.20; // 커서쪽으로 이동 비율
  const damping = 0.15;     // 부드러움

  const state = [...eyes].map(eye => {
    const pupil = eye.querySelector('.pupil');
    return { eye, pupil, tx: 0, ty: 0 };
  });

  function tick() {
    const sectionRect = section.getBoundingClientRect();

    state.forEach(s => {
      if (!s.pupil) return;
      const eyeRect = s.eye.getBoundingClientRect();

      // 눈 중심(섹션 좌표)
      const cx = eyeRect.left - sectionRect.left + eyeRect.width / 2;
      const cy = eyeRect.top  - sectionRect.top  + eyeRect.height / 2;

      // 커서까지 벡터
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist, uy = dy / dist;

      // 동공 이동 한계 계산
      const eyeR = eyeRect.width / 2;
      const pupilStyle = getComputedStyle(s.pupil);
      const pupilW = parseFloat(pupilStyle.width);
      const pupilR = pupilW / 2;
      const padding = eyeRect.width * 0.08;  // 가장자리 여유
      const maxOffset = Math.max(2, eyeR - pupilR - padding);

      // 목표 위치(살짝만)
      const desiredX = ux * Math.min(dist * followRatio, maxOffset);
      const desiredY = uy * Math.min(dist * followRatio, maxOffset);

      // 보간
      s.tx += (desiredX - s.tx) * damping;
      s.ty += (desiredY - s.ty) * damping;

      s.pupil.style.transform =
        `translate(calc(-50% + ${s.tx}px), calc(-50% + ${s.ty}px))`;
    });

    rafId = requestAnimationFrame(tick);
  }

  // 리사이즈 시 기준 재계산
  window.addEventListener('resize', () => {
    setCenterAsTarget();
  });
});