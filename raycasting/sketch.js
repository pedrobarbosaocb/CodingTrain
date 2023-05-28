let walls = [];
let n_walls;
let ray;
let particle;

function setup() {
    createCanvas(512, 512);
    n_walls = 5;
    newWalls();
    ray = new Ray(100, 200);
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);
}

function newWalls() {
    walls = []
    for (let i = 0; i < n_walls; i++) {
        let x1 = random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0, 0, width-1, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && n_walls > 1) {
        n_walls -= 1;
        newWalls();
    } else if (keyCode === RIGHT_ARROW) {
        n_walls += 1;
        newWalls();
    }
}

function mousePressed() {
  particle.changeRays(1);
}
