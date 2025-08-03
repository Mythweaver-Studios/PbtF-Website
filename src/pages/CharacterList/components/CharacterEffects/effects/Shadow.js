class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speedY;

        if (this.y - this.radius > this.canvas.height) {
            this.y = 0 - this.radius;
            this.x = Math.random() * this.canvas.width;
            this.radius = Math.random() * 2 + 1;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "rgba(170, 190, 255, 0.9)";
        this.ctx.fillStyle = "#000000";
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export function createShadowEffect(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numberOfParticles = 200;
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
        ctx.shadowBlur = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
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