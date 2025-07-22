// src/pages/CharacterList/components/CharacterEffects/effects/holyFlame.js

class HolyFlameParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        // **FIX:** 80% of particles will be flames, 20% will be holy crosses.
        this.type = Math.random() > 0.2 ? 'flame' : 'cross';

        if (this.type === 'flame') {
            this.x = Math.random() * this.canvas.width;
            this.y = this.canvas.height + Math.random() * 50;
            this.radius = Math.random() * 5 + 2;
            this.initialRadius = this.radius;
            // **FIX:** Slower, calmer vertical speed.
            this.speedY = Math.random() * 1.0 + 0.5;
            // **FIX:** Longer lifespan to reach higher.
            this.life = Math.random() * 400 + 250;
            this.maxLife = this.life;
            const hue = Math.random() * 15 + 40; // Gold/Yellow hue range
            this.color = `hsl(${hue}, 100%, 50%)`;
            this.waver = Math.random() * 2 - 1;
            this.waverSpeed = Math.random() * 0.05 + 0.01;
        } else { // Cross type
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.radius = Math.random() * 2.5 + 1;
            this.speedY = 0;
            this.life = Math.random() * 150 + 100;
            this.maxLife = this.life;
            this.color = `hsl(50, 100%, ${Math.random() * 40 + 50}%)`;
        }
    }

    update() {
        this.life--;
        if (this.type === 'flame') {
            this.y -= this.speedY;
            this.waver += this.waverSpeed;
            this.x += Math.sin(this.waver) * 0.8;
            this.radius = this.initialRadius * (this.life / this.maxLife);
        }

        if (this.life <= 0 || (this.type === 'flame' && this.radius <= 0.1)) {
            this.reset();
        }
    }

    draw() {
        const opacity = (this.type === 'flame')
            ? this.life / this.maxLife
            : Math.sin((this.life / this.maxLife) * Math.PI);

        if (opacity <= 0) return;

        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 20;

        if (this.type === 'flame') {
            this.ctx.fillStyle = `hsla(${parseInt(this.color.substring(4))}, 100%, 70%, ${opacity * 0.8})`;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
        } else { // Cross type
            this.ctx.fillStyle = `hsla(${parseInt(this.color.substring(4))}, 100%, 80%, ${opacity})`;
            const verticalArmLength = this.radius * 5;
            const horizontalArmLength = this.radius * 3.5;
            const armWidth = this.radius * 0.8;
            const verticalOffset = this.radius * 0.7;
            const horizontalArmY = (this.y - armWidth / 2) - verticalOffset;

            this.ctx.fillRect(this.x - armWidth / 2, this.y - verticalArmLength / 2, armWidth, verticalArmLength);
            this.ctx.fillRect(this.x - horizontalArmLength / 2, horizontalArmY, horizontalArmLength, armWidth);
        }

        this.ctx.shadowBlur = 0;
    }
}

export function createHolyFlameEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    // **FIX:** Reduced particle count by ~15% (from 200 to 170)
    const numberOfParticles = 170;
    let animationFrameId;

    function init() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new HolyFlameParticle(canvas));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const resizeObserver = new ResizeObserver(() => {
        init();
    });
    resizeObserver.observe(canvas.parentElement);

    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
    };
}