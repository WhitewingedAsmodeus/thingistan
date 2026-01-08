(function () {
  'use strict';

  const part1 = setInterval(() => {
    if (typeof ig !== 'undefined' && ig.game && ig.game.O5492 && ig.game.O5492.pos) {
      clearInterval(part1);
      part2();
    }
  }, 100);

  function part2() {
    if (document.getElementById('p1')) return;

    const p1 = document.createElement('div');
    p1.id = 'p1';
    p1.style.cssText =
      'position:fixed;top:20px;right:20px;width:180px;padding:5px;' +
      'background:rgba(191,188,184,.85);border-top:2px solid #efeeec;' +
      'border-left:2px solid #efeeec;border-bottom:2px solid #6f6d69;' +
      'border-right:2px solid #6f6d69;font-family:sans-serif;font-size:12px;' +
      'color:#000;z-index:9999;cursor:grab;box-sizing:border-box;';
    document.body.appendChild(p1);

    if (window.DragManager) DragManager.makeDraggable('p1');

    const p2 = document.createElement('div');
    p2.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:5px;';
    p1.appendChild(p2);

    const p3 = document.createElement('div');
    p3.textContent = 'TP';
    p3.style.fontWeight = 'bold';
    p2.appendChild(p3);

    const p4 = document.createElement('div');
    p4.textContent = 'x';
    p4.style.cssText = 'cursor:pointer;font-weight:bold;';
    p4.onclick = () => p1.remove();
    p2.appendChild(p4);

    const p5 = document.createElement('input');
    p5.placeholder = 'x,y';
    p5.style.cssText =
      'width:100%;padding:2px;margin-bottom:3px;font-size:11px;' +
      'border:1px solid #6f6d69;box-sizing:border-box;';
    p1.appendChild(p5);

    const p6 = document.createElement('button');
    p6.textContent = 'go';
    p6.style.cssText =
      'width:100%;padding:2px 0;margin-top:3px;' +
      'background:rgba(198,195,191,.85);border-top:2px solid #efeeec;' +
      'border-left:2px solid #efeeec;border-bottom:2px solid #6f6d69;' +
      'border-right:2px solid #6f6d69;cursor:pointer;';
    p1.appendChild(p6);

    const p7 = document.createElement('button');
    p7.textContent = '0,0';
    p7.style.cssText = p6.style.cssText;
    p1.appendChild(p7);

    const p8 = location.pathname;
    let p9 = {};

    try {
      p9 = JSON.parse(localStorage.getItem('tcal') || '{}');
    } catch {}

    function part3() {
      return p9[p8] || { x: 0, y: 0 };
    }

    function part4() {
      const p = ig.game.O5492;
      if (!p) return;
      p9[p8] = { x: p.pos.x, y: p.pos.y };
      localStorage.setItem('tcal', JSON.stringify(p9));
    }

    function part5() {
      const v = p5.value.trim();
      if (!v) return;

      const a = v.split(',').map(n => parseFloat(n));
      if (a.length < 2 || isNaN(a[0]) || isNaN(a[1])) return;

      const p = ig.game.O5492;
      if (!p) return;

      const r = part3();
      p.pos.x = a[0] * 19 + r.x;
      p.pos.y = a[1] * 19 + r.y;
    }

    p6.onclick = part5;
    p7.onclick = part4;
    p5.addEventListener('keydown', e => e.key === 'Enter' && part5());
  }
})();
