var Player = function (name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 3;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 0;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    bumperMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 10, 12, 12, false), this.materialBumper);
    bumperMesh.rotation.x = Math.PI / 2;

    sphere = new THREE.SphereGeometry(6, 8, 8);
    THREE.GeometryUtils.merge(sphere, bumperMesh);

    canon = new THREE.CubeGeometry(3, 3, 15);
    THREE.GeometryUtils.merge(canon, sphere);

    this.graphic = new THREE.Mesh(sphere, this.material);
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
    this.graphic.position.z = 6;
    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), this.direction);

};

Player.prototype.accelerate = function (distance) {
    var max = 2;

    this.speed += distance / 4;
    if (this.speed >= max) {
        this.speed = max;
    }
};

Player.prototype.dead = function () {
    this.graphic.position.z = this.graphic.position.z - 0.1;
    //Nettoyage de la div container
    $("#container").html("");
    jQuery('#' + this.name + ' >.life').text("Tu es mort !");
    init();
}

Player.prototype.killed = function () {
    //   ennemy.position = null;
    ennemy.position.x = 0;
    ennemy.position.y = 0;
    ennemy.graphic.position.x = 0;
    ennemy.graphic.position.y = 0;
    ennemy.graphic.position.z = -100;

}



Player.prototype.decelerate = function (distance) {
    var min = -1;

    this.speed -= distance / 16;
    if (this.speed <= min) {
        this.speed = min;
    }
};

Player.prototype.displayInfo = function () {
    jQuery('#' + this.name + ' >.life').text(this.life);
}

Player.prototype.turnRight = function (angle) {
    this.direction -= angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle);
};

Player.prototype.turnLeft = function (angle) {
    this.direction += angle;
    this.graphic.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle);
};

Player.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.graphic.position.x,
        this.speed * Math.sin(this.direction) + this.graphic.position.y,
        this.graphic.position.z
    );

    this.graphic.position = moveTo;
    if (this.speed > 0) {
        this.speed = this.speed - 0.04;
    }
    else if (this.speed < 0) {
        this.speed = this.speed + 0.04
    }

    light1.position.x = this.graphic.position.x;
    light1.position.y = this.graphic.position.y;
    // light1.position.z = this.graphic.position.z + 500;
};

Player.prototype.moveTo = function () {
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second

    var moveTo = new THREE.Vector3(
        1 * Math.cos(this.direction) + this.graphic.position.x,
       1 * Math.sin(this.direction) + this.graphic.position.y,
        this.graphic.position.z
    );

    var moveTo2 = new THREE.Vector2(
        1 * Math.cos(this.direction) + this.graphic.position.x,
       1 * Math.sin(this.direction) + this.graphic.position.y
    );


    ennemy.graphic.position = moveTo;
    ennemy.position = moveTo2;
   
    if (ennemy.graphic.position.x  < 0)
        ennemy.turnLeft(rotateAngle);
    
    ennemy.accelerate(moveDistance);
};
