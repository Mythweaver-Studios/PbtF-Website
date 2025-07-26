// src/pages/CharacterList/components/CharacterEffects/effects/water.js

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
        this.y = Math.random() * this.canvas.height;
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + Math.random() * 50;
        this.radius = Math.random() * 2.5 + 1;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.opacity = (this.radius / 4) * 0.5; 
        this.wobble = Math.random() * 0.02 + 0.01;
        this.wobbleAngle = Math.random() * Math.PI * 2;
    }

    update() {
        this.y -= this.speedY;
        this.wobbleAngle += this.wobble;
        this.x += Math.sin(this.wobbleAngle) * 0.5;

        if (this.y < -this.radius) {
            this.reset();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`;
        this.ctx.shadowColor = 'rgba(0, 191, 255, 0.7)';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export function createWaterEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 80;
    let animationFrameId;

    function init() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle(canvas));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
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