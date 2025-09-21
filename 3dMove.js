const box = document.getElementById('fornalha');

    let dragging = false;
    let lastX = 0, lastY = 0;
    let rotX = -10, rotY = 10;
    let velX = 0, velY = 0; // velocidade (para inércia)

    // clamp para limitar o X
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // normalizar ângulos
    const normalize = (deg) => ((deg % 360) + 360) % 360;

    // loop de animação
    function animate() {
      if (!dragging) {
        // aplica atrito na inércia
        velX *= 0.95;
        velY *= 0.95;
        rotX += velY;
        rotY += velX;
        if (Math.abs(velX) < 0.01) velX = 0;
        if (Math.abs(velY) < 0.01) velY = 0;
      }
      // limitar X e normalizar Y
      rotX = clamp(rotX, -90, 90);
      rotY = normalize(rotY);

      box.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      requestAnimationFrame(animate);
    }

    // eventos de mouse
    document.addEventListener('mousedown', (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      dragging = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.3;
      rotX -= dy * 0.3;
      velX = dx * 0.05; // quanto maior o movimento, mais inércia
      velY = -dy * 0.05;
    });

    // eventos de touch (mobile)
    document.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      dragging = true;
      lastX = t.clientX;
      lastY = t.clientY;
    }, { passive: true });

    document.addEventListener('touchend', () => {
      dragging = false;
    });

    document.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - lastX;
      const dy = t.clientY - lastY;
      lastX = t.clientX;
      lastY = t.clientY;
      rotY += dx * 0.3;
      rotX -= dy * 0.3;
      velX = dx * 0.05;
      velY = -dy * 0.05;
    }, { passive: true });

    // inicia animação
    animate();