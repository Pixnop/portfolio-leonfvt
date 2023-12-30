class Point {
    constructor(x, y, angle, speed, size, color = 'green') {
        this.x = x;
        this.y = y;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        this.connectedPoints = new Map();
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(ctx, canvas) {
        this.dx = (this.x + this.dx > canvas.width || this.x + this.dx < 0) ? -this.dx : this.dx;
        this.dy = (this.y + this.dy > canvas.height || this.y + this.dy < 0) ? -this.dy : this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }

    addConnection(point, line) {
        this.connectedPoints.set(point, line);
    }
}

export { Point };