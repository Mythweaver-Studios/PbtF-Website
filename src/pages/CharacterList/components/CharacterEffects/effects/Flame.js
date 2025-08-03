class FlameParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + Math.random() * 50;
        this.radius = Math.random() * 6 + 2;
        this.initialRadius = this.radius;
        this.speedY = Math.random() * 2 + 1;
        this.life = Math.random() * 300 + 200;
        this.maxLife = this.life;
        const hue = Math.random() * 30 + 10;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.waver = Math.random() * 2 - 1;
        this.waverSpeed = Math.random() * 0.05 + 0.01;
    }

    update() {
        this.life--;
        this.y -= this.speedY;
        this.waver += this.waverSpeed;
        this.x += Math.sin(this.waver) * 1.0;
        this.radius = this.initialRadius * (this.life / this.maxLife);
        if (this.life <= 0 || this.radius <= 0.1) {
            this.reset();
        }
    }

    draw() {
        const opacity = this.life / this.maxLife;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = 15;
        this.ctx.fillStyle = `hsla(${parseInt(this.color.substring(4))}, 100%, 50%, ${opacity * 0.7})`;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
}

// --- Main Effect Logic ---
export function createFlameEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 300;
    let animationFrameId;

    function init() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new FlameParticle(canvas));
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