//based on https://github.com/alexte/javascript-maze-generator
var sizex = 26;
var sizey = 26;
var start = {
    x: 7,
    y: sizey
};
var finish = {
    x: 5,
    y: -1
};

var tiles = [];

function build_field() {
    for (var i = 0; i < sizex; i++) {
        tiles[i] = [];
        for (var j = 0; j < sizey; j++) {
            tiles[i][j] = {};
            tiles[i][j].maze_done = false;
        }
    }
    for (var y = 0; y < sizex + 5; y++) {
        matrix[y] = [];
        for (var x = 0; x < sizey + 5; x++) {
            matrix[y][x] = [0, 0, 0, 0, 0, 0, 0];
        }
    }
}

function build_maze(x, y, sourcex, sourcey) {

    if (x == finish.x && y == finish.y) return "1";
    if (x == start.x && y == start.y) return "1";
    if (x < 0 || x >= sizex || y < 0 || y >= sizey) return "2";
    if (tiles[x][y].maze_done) return "2";
    tiles[x][y].maze_done = true;
    var next = [];
    if (x - 1 != sourcex || y != sourcey) {
        next.push({
            x: x - 1,
            y: y,
            bp: 0
        });
    }
    if (x + 1 != sourcex || y != sourcey) {
        next.push({
            x: x + 1,
            y: y,
            bp: 2
        });
    }
    if (x != sourcex || y - 1 != sourcey) {
        next.push({
            x: x,
            y: y - 1,
            bp: 1
        });
    }
    if (x != sourcex || y + 1 != sourcey) {
        next.push({
            x: x,
            y: y + 1,
            bp: 3
        });
    }
    while (next.length > 0) {
        var i = 0;
        if (next.length > 1) i = Math.floor(Math.random() * next.length);
        var ret = build_maze(next[i].x, next[i].y, x, y);
        if (ret == "2") {
            matrix[x + 1][y + 1][next[i].bp] = 1;
        }
        next.splice(i, 1);
    }

    return "1";
}