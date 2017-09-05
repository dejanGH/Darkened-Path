var disp;
var dim = 15;
var matrix = [];
var user = {};
var c;
var ctx;
var img = new Image();
var imgFlare = new Image();
var visibility_radiusCONST = 40;
var visibility_radius = visibility_radiusCONST;
var flareradius = sizex * dim;

var flareTimeCONST = 600;
var flareTime = flareTimeCONST;

var fx;
var fy;
var fmx = 0;
var fmy = 0;
var timeInt;
var timeVar;
var grd;

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


function draw() {

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    for (var x = 0; x < sizex + 4; x++) {
        for (var y = 0; y < sizey + 4; y++) {

            if (matrix[x][y][1] == 1) {
                ctx.beginPath();
                ctx.strokeStyle = grd;
                ctx.moveTo(x * dim, y * dim);
                ctx.lineTo(x * dim + dim, y * dim);
                ctx.stroke();
            }
            if (matrix[x][y][2] == 1) {
                ctx.beginPath();
                ctx.strokeStyle = grd;
                ctx.moveTo(x * dim + dim, y * dim);
                ctx.lineTo(x * dim + dim, y * dim + dim);
                ctx.stroke();
            }
            if (matrix[x][y][3] == 1) {
                ctx.beginPath();
                ctx.strokeStyle = grd;
                ctx.moveTo(x * dim, y * dim + dim);
                ctx.lineTo(x * dim + dim, y * dim + dim);
                ctx.stroke();
            }
            if (matrix[x][y][0] == 1) {
                ctx.beginPath();
                ctx.strokeStyle = grd;
                ctx.moveTo(x * dim, y * dim);
                ctx.lineTo(x * dim, y * dim + dim);
                ctx.stroke();
            }

            if (matrix[x][y][4] == 1) {
                ctx.drawImage(img, x * dim, y * dim, dim, dim);
            }
            if (matrix[x][y][5] == 1) {
                ctx.fillStyle = "#ff0000";
                ctx.beginPath();
                ctx.arc(x * dim + (dim / 2), y * dim + (dim / 2), 2, 0, 2 * Math.PI, true);
                ctx.fill();
            }
            if (matrix[x][y][6] == 1) {
                ctx.fillStyle = "#fff000";
                ctx.beginPath();
                ctx.arc(x * dim + (dim / 2), y * dim + (dim / 2), 2, 0, 2 * Math.PI, true);
                ctx.fill();
            }
        }
    }
    ctx.fillStyle = "#4caf50";
    ctx.beginPath();
    ctx.arc((finish.x + 1) * dim + (dim / 2), (finish.y + 1) * dim + (dim / 2), 4, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillStyle = "#fff";
    if (flareTime == flareTimeCONST) {
        clipArc(ctx, user.x * dim, user.y * dim, visibility_radius, 10);
    }

}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

window.onload = function (e) {

    img.src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNzNun2MAAASWSURBVGhD1ZptiBVlFMdnbXOxFzHMVDAz2Zm1ElmhApFSCTYEI1ihD1EUFCRItIVBfamFKOmFKDFYqEAqCirK+iAYQVBLfQgMenWjAsmKInqhzFrdM/3OzGmu985zX2Zn56Uf/Hl2z/N/zjmz986dZ+auVyiDMoCWeKvlPG+dnGnR/wvhPC+QrZ4v+70g/I2fZ5Dw+59o0vPDm6MDrDUXh8to+i0OIOwoX6a8IbnUVtWMoXAVDR5xNu6SvkJDssVW1wR9qwTykbPhTvLlF9ausCw1IJAxZ6M9SV6xLBWzKeynmaPuJnuQL9Pe6nClZasQPxx2NphFQ7LDslXIoFzvbC6LfNlr2SpkkL+mq7ks8uU5y1YhgVznbC6LfHnCslWILxc5m8siX26ybFUS9tHIF84Ge5L8xXiuJauYQG5MN9irZMKy1IHwNBrqvsdKiS3NBeEiS1IT1shi3mIfuht2yJfvWLPWVteMFbIgeqsEctLZfCI5WK89Vhvmrw3X3L9H3j44GYatGt0p281WLWEY9qGVInItuhvtQa+id9AhNIW+Qb/jS0H8ANqFrkSLLW150MMZFL4LHUYzcVv5IM8JyzeBthMq9sSnyDr0eVy+OKgxjd7gx82oz8rPDSRejn6KKpUE9YThZXSOtZEfck5E2SuA2h+j/OcRuU4nUddXA89x9DP6Fn2NPkPf23QuyPM6Q763GQkWRdla0IYZxhlHGJcxDjD2o3m2VNeOoxR4t6Ab0JPofXTcppwwr2y0tLODBAstXyv7zNIW1j5k3oSoJZELzRLB7wvQ1UzvY3QeFPEXzD47SDCAUtcDYlMMHV9uPLtjdwNiehKvMksKpi9Df8fuBsSOMuR7e5HkvThdA2J/MHTceuN5NHY3IKbXn44PGvDox6+LfJ9gJLhHs1DgB/Q8GkULbboteB7XdadC7CTquMdi/gGzN0H8ErPMDhKcjzaQq99CPcGavXELDYjplXy5WZwwf4fZW9lslnKhoaesgQQ7kKVmccL8DrM3QXzELOVC4aethwRi0wzdzq3aHciz1kMCsX9Qxys187ol2oRGTNeYlpilHOi3j6JL0Ztx+w2I6cn+GNpg9vpBn8M0+Aj6ShuOW3fDvPIiqs+3WDSjW/wD1mMmWKdblLMtVXXQxBg6YX3NCtbvZ5jbe48s0MCdcSv5II9yi6UtFwqvR7leiVMh148MZ1n68qCo3r05oakZ9AHajXS7vhEFSD9Wt6LUplAhfp+lLwdq6kOIY3H5BsSUl9CgWZ0wP2ZLmiB+hCG5nykcCq6PS6fQV6nrSYtnPjm+jFa0QPwKsxUPxfQmKAXx28zSFbw7bVkTxB80S/F0OJCevwfErrfHepPVBKFJsxQPxS63uq2Mm6UnyPOprUsg9isq5987KKSfPq6/Zqbvy/E/Y0sTLG/bW+E5hULOR0TEDjP0fIXGf3u8shnio2YpHoq9a3UTiOkWvest8H/gvcqWNkH8XrMUD8VST0gU4tvM0hXs+kRfH+p9gl5DD6NbUWCW4qHYtrj1qHm9kuujTb21HTZLV/Dq1xOZngO0x/P+Bbs8TUFJ4vShAAAAAElFTkSuQmCC";
    imgFlare.src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAv39GvoBGv4FHv4VOwYVMwYVOw4ZNw4hPwYlTwYpXxIhQxYtWx4xTx4xUw45bypNdyZNe2ZtexpNiypZmzJZky5psyZtvzZpqzZprzJtsyp1zzp5wzp5zzJ9015xj1pxk0Z1r2Jxj2J9n3KBh2aBo3KRs0KF10qN20aN30aN40aN506Z61ad71Kl+3ahy26l52al63a173Kx85qFb5qRf6KVe5aVl5aZl6Klo6atq5atw77Jw6LN97LJ57LZ+7bd/87R3/L1x/L5x+rt9/cJu+8d2/MNz/MRx/Mdy/MZz+sF/+8Z+/MJ6/MJ//Ml0+sh8/cl4zaeC0aqF1amA1auE1q6H1a+J1K+L3a6B1rGO17KP27CC37GE37SE2LCO3rOK3rWP17KQ2bSS27WU2beX3LiU3bmX2riY2ruf3Lyd276k47SG4LSI4rWJ47aL4LWN4biN6LWB67eD7bmH77yG67mJ7byI4LmT4rqR57yS4buY5L+c67+R9LmG+b+A38Ch58Gb8sCK/ceA+8eI+8iC+86E+s6G/ciH+8qI+8yP/cmJ/MiK9MWS9Mub98yd+MiU+86d+tKH+9GK+9CM+tKP/NGJ/dWP+tSU/NCX+9Wc/NWc5MWl4MWr5sqt6Mal78mj6cmq6Mqr68yt68yv78yo5cqx5c22686y6M+159G76NC57tW88Mul8s2l/teg/Nej/NSn/Nas/Net+9qg/Nii/Nik/dym+9qq/duu/N+p/d6s/N6v9NO39Na99Ni99tq/+96z/N2z++Wv/Oau/O6y/O24/vyv/Pa2/PO6/v2y/fy0/fy3/Pu4/Py6/v278dnA/OLH/ObA/OzB/erS/fPO/PjB/PvF/fzB/fvK/PvL/v3M/fzP/fTS/f3T/f3X/f3h/v3u/P33AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqpJHAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTczbp9jAAAB2UlEQVQ4T2WNh1+OURiGi4iy98omJCs7e0VWJEplRvYe2XuHrKysjEqoFKKSPUIkKVv9I5f3PN/5+r73c/9+7/3cz3295xwn7LRMT5tMuCtc01HLhKGtnlY5YPCJ00H0H15SRweRCc8QjxdnljITbk9KKvRQ8aoUVpycZFj3HWTFPoPZm1daWtvpTbCiNTzlwS7ZN4jbXf5E2Xk4Cfcf0lI609vbvsg48/kctJBojx8PPQZf3xlpj/FdgitxVhwKOVtHwJv3f/8Uk5Gpuo1LbafdYXDMAb79LuPHh5eFAbuNLjHkosZTW8GAsfcoyaf049sX2ePvQhujt+AGjWDnsElG+v46L/8VE9ILuNUuTONp82Ht0XETT5w6Dj9/PT+bRni3KEUUblJdJTgEY6CoaN/wNEIslZyuxUAGwer+7GXU6UcjYd1yFpdjpS3Kjvj5Rx8cvZ9+18FNFU5Eegd5RcDNjlPgsKqiWd/HGJUnK5wwZ3qg84KZc5tWrZJs7Hd69YY1ENSprvpVLl+oDJcuDGEVn2739QWPmtKVvy3qKX4ZPCtJcsC50Hm7Ch4NZXfAdHBt7l6b+q7BerfHjaHCPLjQrGI93ZiwZ40bMheJi0yXV9PTJoe3zYJ/omf853W0/SAAAAAASUVORK5CYII=";

    var cnvc = document.getElementById("cnvc");
    c = document.getElementById("cnv");
    if (cnvc.clientHeight > 400 && cnvc.clientWidth > 400) {
        c.style.width = "400px";
        c.style.height = "400px";
    } else {
        var min = Math.min(cnvc.clientHeight, cnvc.clientWidth);
        c.style.width = min - 20 + "px";
        c.style.height = min - 20 + "px";

    }
    dim = Math.floor(c.clientWidth / sizex) - 0.5;
    c.width = c.clientWidth;
    c.height = c.clientHeight;
    ctx = c.getContext("2d");
    visibility_radiusCONST = c.width / 10;
    visibility_radius = visibility_radiusCONST;
    flareradius = sizex * dim;
    grd = ctx.createLinearGradient(150.000, 0.000, 150.000, 300.000);
    grd.addColorStop(0.000, 'rgba(135, 135, 135, 1.000)');
    grd.addColorStop(0.193, 'rgba(196, 196, 196, 1.000)');
    grd.addColorStop(0.678, 'rgba(153, 153, 153, 1.000)');
    grd.addColorStop(1.000, 'rgba(206, 206, 206, 1.000)');

    if (isMobile.any()) {
        document.getElementById("ctrl").style.visibility = "visible";
    }
    if (typeof (Storage) !== "undefined") {
        var btime = localStorage.getItem("dp_bt");
        if(btime!=null && btime!=undefined)
        document.getElementById("time_best").innerHTML = " " + (pad(parseInt(btime / 60)) + ":" + pad(btime % 60));
    }
};



window.onload();
document.onkeydown = zx;

function startGame() {

    build_field();
    build_maze(7, 11, 7, 12);

    matrix[start.x + 1][start.y][4] = 1;
    matrix[Math.round(Math.random() * (sizex / 2 - 2) + 2)][Math.round(Math.random() * (sizey / 2 - 2) + 2)][6] = 1;
    matrix[Math.round(Math.random() * (sizex / 2 - 2) + sizex / 2)][Math.round(Math.random() * (sizey / 2 - 2) + sizey / 2)][6] = 1;
    matrix[Math.round(Math.random() * (sizex / 2 - 2) + 2)][Math.round(Math.random() * (sizey / 2 - 2) + sizey / 2)][6] = 1;

    user = {
        x: start.x + 1,
        y: start.y,
        s: 5,
        f: 1
    };
    setUserStonesFlares();
    draw();
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("end").style.visibility = "hidden";
       document.getElementById("finishrecord").style.visibility = "hidden";
    document.getElementById("gstat").style.visibility = "visible";
    timeVar = 0;
    var timeelement = document.getElementById("time");

    timeInt = setInterval(function () {
        ++timeVar;
        timeelement.innerHTML = " " + (pad(parseInt(timeVar / 60)) + ":" + pad(timeVar % 60));
    }, 1000);
}


function setUserStonesFlares() {
    document.getElementById("stones").innerHTML = user.s;
    document.getElementById("flare").innerHTML = user.f;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function zx(e) {

    var code = e.which || e.keyCode;
    if (code == 37) {
        if (matrix[user.x][user.y][0] != 1 && user.x > 0) {
            matrix[user.x][user.y][4] = 0;
            user.x = user.x - 1;
            matrix[user.x][user.y][4] = 1;

        }
        e.preventDefault();
    }
    if (code == 38) {
        if (matrix[user.x][user.y][1] != 1 && user.y > 0) {
            matrix[user.x][user.y][4] = 0;
            user.y = user.y - 1;
            matrix[user.x][user.y][4] = 1;

        }
        e.preventDefault();
    }
    if (code == 39) {
        if (matrix[user.x][user.y][2] != 1 && user.x < sizex) {
            matrix[user.x][user.y][4] = 0;
            user.x = user.x + 1;
            matrix[user.x][user.y][4] = 1;
        }
        e.preventDefault();
    }
    if (code == 40) {
        if (matrix[user.x][user.y][3] != 1 && user.y < sizey) {
            matrix[user.x][user.y][4] = 0;
            user.y = user.y + 1;
            matrix[user.x][user.y][4] = 1;

        }
        e.preventDefault();
    }
    if (code == 83) {
        if (matrix[user.x][user.y][5] == 0 && user.s > 0) {
            matrix[user.x][user.y][5] = 1;
            user.s--;
        } else if (matrix[user.x][user.y][5] == 1) {
            matrix[user.x][user.y][5] = 0;
            user.s++;
        }
        setUserStonesFlares();
        e.preventDefault();
    }

    if (code == 70) {
        if (user.f > 0 && flareTime == flareTimeCONST) {
            user.f--;
            fx = user.x;
            fy = user.y;
            fmx = 0;
            fmy = 0;
            visibility_radius = visibility_radiusCONST
            flareTime = flareTimeCONST;
            flareShot();

        }
        setUserStonesFlares();
        e.preventDefault();
    }
    if (matrix[user.x][user.y][6] == 1) {
        user.f++;
        matrix[user.x][user.y][6] = 0;
        setUserStonesFlares();
    }
    if (user.x - 1 == finish.x && user.y - 1 == finish.y) {
        document.getElementById("finishrecord").style.visibility = "hidden";
        if (typeof (Storage) !== "undefined") {
            var btime = localStorage.getItem("dp_bt");
            clearInterval(timeInt);
            if (btime===null || btime===undefined || timeVar < btime) {
                localStorage.setItem("dp_bt",timeVar);
                document.getElementById("time_best").innerHTML = " " + (pad(parseInt(timeVar / 60)) + ":" + pad(timeVar % 60));
                  document.getElementById("finishrecord").style.visibility = "visible";
            }

        }
        
      
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("gstat").style.visibility = "hidden";
        document.getElementById("finishtime").innerHTML = " " + (pad(parseInt(timeVar / 60)) + ":" + pad(timeVar % 60));
    }
    draw();

}

function moveUp() {
    var e = {
        keyCode: 38,
        preventDefault: function () {}
    };
    zx(e);
}

function moveDown() {
    var e = {
        keyCode: 40,
        preventDefault: function () {}
    };
    zx(e);
}

function moveLeft() {
    var e = {
        keyCode: 37,
        preventDefault: function () {}
    };
    zx(e);
}

function moveRight() {
    var e = {
        keyCode: 39,
        preventDefault: function () {}
    };
    zx(e);

}

function setStone() {
    var e = {
        keyCode: 83,
        preventDefault: function () {}
    };
    zx(e);

}

function setFlare() {
    var e = {
        keyCode: 70,
        preventDefault: function () {}
    };
    zx(e);

}

function flareShot() {
    flareTime--;
    if (flareTime > 0) {
        drawFlare();
        requestAnimFrame(flareShot);
    } else {
        visibility_radius = visibility_radiusCONST;
        flareTime = flareTimeCONST;
        flareradius = sizex * dim;
        draw();
    }
}

function drawFlare() {

    draw();
    if (flareTime % 10 == 0) {
        if (fx < sizex / 2 && fy < sizey / 2) {
            fmx++;
            fmy++;
        }
        if (fx > sizex / 2 && fy < sizey / 2) {
            fmx--;
            fmy++;
        }
        if (fx < sizex / 2 && fy > sizey / 2) {
            fmx++;
            fmy--;
        }
        if (fx > sizex / 2 && fy > sizey / 2) {
            fmx--;
            fmy--;
        }
    }

    ctx.drawImage(imgFlare, fx * dim + fmx, fy * dim + fmy, 20, 20);

    clipArc(ctx, fx * dim + fmx, fy * dim + fmy, visibility_radius, 10);
    if (flareTime % 10 == 0) {
        if ((Math.random() * (10 - 1) + 1) % 2 == 0) {
            flareradius -= Math.random() * (5 - 1) + 1;
        } else {
            flareradius -= Math.random() * (5 - 1) + 1;
        }
        visibility_radius = flareradius;
    }


}

function clipArc(ctx, x, y, r, f) {

    ctx.globalCompositeOperation = 'destination-in';

    ctx.filter = "blur(10px)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.filter = "none";
}
