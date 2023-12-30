function squaredDistance(point1, point2) {
    let dx = point1.x - point2.x;
    let dy = point1.y - point2.y;
    return dx * dx + dy * dy;
}

class Line {
    constructor(point1, point2, maxDistance, color = 'green') {
        this.point1 = point1;
        this.point2 = point2;
        this.maxDistanceSquared = maxDistance * maxDistance; // Pre-calculate and store
        this.progress = 0;
        this.color = color;
    }

    update() {
        let squaredDist = squaredDistance(this.point1, this.point2);

        if (squaredDist < this.maxDistanceSquared) {
            this.progress += 0.01;
            if (this.progress > 1) this.progress = 1; // Inlined to avoid function call
        } else {
            this.progress -= 0.01;
            if (this.progress < 0) this.progress = 0; // Inlined to avoid function call
        }
    }

    draw(ctx, pointSize) {
        if (this.progress <= 0) return; // Early exit if the line is not visible

        let progress = this.progress; // Cache to avoid repeated property access
        let x1 = this.point1.x;
        let y1 = this.point1.y;
        let x2 = this.point2.x;
        let y2 = this.point2.y;

        // Only calculate the required positions based on progress
        let currentX1 = x1 + (x2 - x1) * progress;
        let currentY1 = y1 + (y2 - y1) * progress;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = pointSize / 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(currentX1, currentY1);
        ctx.stroke(); // Only one stroke operation per line
    }
}

export { Line };
