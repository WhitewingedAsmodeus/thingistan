const cocaineSpasm = () => {
    if (!ig?.game?.O5492) return setTimeout(cocaineSpasm, 500);
    const p = ig.game.O5492;
    const oldKill = p.kill.bind(p);
    const oldUpdate = p.update.bind(p);

    p.kill = function() {};

    let spasmActive = true;
    setInterval(() => { spasmActive = !spasmActive; }, 30000);

    if (p && p.anims) {
        const origDraw = p.draw;
        p.spasmTime = 0;
        p.draw = function() {
            this.spasmTime++;
            const shakeX = Math.sin(this.spasmTime * 1.5) * 3;
            const shakeY = Math.cos(this.spasmTime * 2) * 3;
            ig.system.context.save();
            ig.system.context.translate(shakeX, shakeY);
            origDraw.apply(this, arguments);
            ig.system.context.restore();
        };
    }

    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let hue = 0;
    let elapsed = 0;

    const drainDuration = 120000;
    const drainInterval = 200;
    const steps = drainDuration / drainInterval;
    const initialHealth = p.health ?? 100;
    const drainAmount = initialHealth / steps;

    const healthDrain = setInterval(() => {
        elapsed += drainInterval;
        if (p.health !== undefined) {
            p.health -= drainAmount;
            if (p.health <= 0) {
                clearInterval(healthDrain);
                p.kill = oldKill;
                p.kill();
            }
        }
    }, drainInterval);

    const liquidWarp = () => {
        const w = canvas.width;
        const h = canvas.height;
        const frame = ctx.getImageData(0, 0, w, h);
        const srcData = new Uint8ClampedArray(frame.data);

        const step = 2;
        const amplitude = 5 + 20 * Math.min(elapsed / drainDuration, 1);
        const frequency = 0.05;

        for (let y = 0; y < h; y++) {
            const offset = Math.floor(Math.sin((y * frequency) + (hue * 0.02)) * amplitude);
            for (let x = 0; x < w; x += step) {
                let dstX = x + offset;
                if (dstX < 0) dstX = 0;
                if (dstX >= w) dstX = w - 1;

                const srcIdx = (y * w + x) * 4;
                const dstIdx = (y * w + dstX) * 4;

                frame.data[dstIdx]     = srcData[srcIdx];
                frame.data[dstIdx + 1] = srcData[srcIdx + 1];
                frame.data[dstIdx + 2] = srcData[srcIdx + 2];
                frame.data[dstIdx + 3] = srcData[srcIdx + 3];
            }
        }

        ctx.putImageData(frame, 0, 0);

        hue += 1;
        canvas.style.filter = `hue-rotate(${hue}deg) saturate(1.5)`;
        canvas.style.transform = `scale(${1 + Math.sin(hue/50)*0.02}) rotate(${Math.sin(hue/40)*0.3}deg)`;

        requestAnimationFrame(liquidWarp);
    };
    liquidWarp();

    p.update = function() {
        if (spasmActive) {
            this.gravityFactor = 0;
        } else {
            this.gravityFactor = 1;
        }

        oldUpdate();
    };
};

cocaineSpasm();
