// src/pages/CharacterList/components/CharacterEffects/effects/Holy.js

// --- Particle Class ---
class HolyParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.type = Math.random() > 0.3 ? 'riser' : 'sparkler';
        this.radius = Math.random() * 3 + 1;
        this.color = `hsl(50, 100%, ${Math.random() * 40 + 50}%)`;

        if (this.type === 'riser') {
            this.x = Math.random() * this.canvas.width;
            this.y = this.canvas.height + this.radius;
            this.speedY = Math.random() * 0.8 + 0.2;
            this.life = Math.random() * 400 + 400;
        } else {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.speedY = 0;
            this.life = Math.random() * 150 + 100;
        }
        this.maxLife = this.life;
    }

    update() {
        this.life--;
        if (this.type === 'riser') {
            this.y -= this.speedY;
        }
        if (this.life <= 0 || (this.type === 'riser' && this.y < -this.radius)) {
            this.reset();
        }
    }

    draw() {
        const opacity = Math.sin((this.life / this.maxLife) * Math.PI);
        if (opacity <= 0) return;

        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = `hsla(${parseInt(this.color.substring(4))}, 100%, 80%, ${opacity})`;

        if (this.type === 'riser') {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
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

// --- Main Effect Logic ---
export function createHolyEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 250;
    let animationFrameId;

    function init() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new HolyParticle(canvas));
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

    // Cleanup function
    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
    };
}