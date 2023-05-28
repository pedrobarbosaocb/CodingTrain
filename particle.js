let shots;
let div_360 = [1,2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,30,36,40,45,48,50,60,72,75,80,90,100,120,144,150,180,200,225,240,300,360,400,450,600,720,900,1200,1800,3600];
let index;

class Particle {

    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        index = 4;
        shots = index;
        this.shoot();
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    changeRays(inc) {
        index -= inc;
        this.rays = [];
        if (index < 0) {
            index = div_360.length - 1
        }
        shots = div_360[index]/10;
        this.shoot();
    }

    shoot() {
        for (let a = 0; a < 360; a += shots) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    look(walls) {
        for (ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5
                        .Vector
                        .dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                    record = min(d, record);
                }
            }
            if (closest) {
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }

        }

    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 1);
        for (ray of this.rays) {
            ray.show();

        }
    }
}