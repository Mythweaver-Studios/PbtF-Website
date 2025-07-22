// src/pages/CharacterList/components/CharacterEffects/effects/Water.js

// --- Particle Class ---
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
        this.y = Math.random() * this.canvas.height; // Start at a random y position initially
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + Math.random() * 50; // Start just below the screen
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.5; // Upward speed
        this.opacity = this.radius / 4; // Smaller particles are more transparent
        this.wobble = Math.random() * 0.02 + 0.01; // Wobble speed
        this.wobbleAngle = Math.random() * Math.PI * 2;
    }

    update() {
        this.y -= this.speedY;
        this.wobbleAngle += this.wobble;
        this.x += Math.sin(this.wobbleAngle) * 0.5; // Apply horizontal wobble

        if (this.y < -this.radius) {
            this.reset();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`; // Light blue
        this.ctx.shadowColor = 'rgba(0, 191, 255, 0.7)'; // Cyan glow
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

// --- Main Effect Logic ---
export function createWaterEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 150;
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