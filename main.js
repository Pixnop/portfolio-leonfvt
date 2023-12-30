import { Point } from './point.js';
import { Line } from './line.js';

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const defaultPointCount = 500; // Nombre de points au max
    const defaultMaxDistance = 100; // Distance à la moitié
    const defaultSpeed = 0.1;      // Vitesse au minimum
    const defaultPointSize = 2;    // Taille à 10%

    let points = [];
    let mousePoint = new Point(0, 0, 0, 0, 5, 'red');

    function createPoints() {
        points = Array.from({length: defaultPointCount}, () => new Point(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * Math.PI * 2,
            defaultSpeed,
            defaultPointSize
        ));
        points.push(mousePoint);
    }

    function connectPointsOptimized() {
        const gridSize = 50;
        let grid = Array.from({length: Math.ceil(canvas.width / gridSize)}, () =>
            Array.from({length: Math.ceil(canvas.height / gridSize)}, () => [])
        );

        points.forEach(point => {
            let gridX = Math.floor(point.x / gridSize);
            let gridY = Math.floor(point.y / gridSize);
            grid[gridX][gridY].push(point);
        });

        grid.flat().forEach(cell => {
            cell.forEach(point => {
                cell.forEach(otherPoint => {
                    if (point !== otherPoint && !point.connectedPoints.has(otherPoint)) {
                        let lineColor = point === mousePoint || otherPoint === mousePoint ? 'red' : 'green';
                        let line = new Line(point, otherPoint, defaultMaxDistance, lineColor);
                        point.addConnection(otherPoint, line);
                        otherPoint.addConnection(point, line);
                    }
                });
            });
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connectPointsOptimized();
        points.forEach(point => {
            point.update(ctx, canvas);
            point.connectedPoints.forEach(line => {
                line.update();
                line.draw(ctx, defaultPointSize);
            });
        });
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function(event) {
        mousePoint.x = event.clientX;
        mousePoint.y = event.clientY;
    });

    createPoints();
    animate();
});
