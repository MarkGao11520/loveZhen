var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 668;

var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var RADIUS = 8;

const startTime = new Date(2019,10,7,22,0,0)
var endTime = new Date(2019,11,7,22,0,0)
var balls = []
const colors = ["#33B5E5","#0099CC","#AA66CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]




window.onload=function () {
    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d")

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    var curTime = new Date()
    endTime.setMonth(curTime.getMonth())
    if(endTime.getTime() < curTime.getTime()){
        endTime.setMonth(endTime.getMonth() + 1)
    }

    curShowTimeSeconds = getCurShowTimeSeconds()

    setInterval(function () {
        render(context)
        update()
    },50)

}

function getCurShowTimeSeconds() {
    var curTime = new Date()
    var ret = endTime.getTime() - curTime.getTime()
    ret = Math.round(ret / 1000)
    return ret >= 0 ? ret : 0
}


function render(ctx) {

    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

    renderText(ctx)


    var hours = parseInt(curShowTimeSeconds / 3600)
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    var seconds = curShowTimeSeconds % 60


    // renderDigit(0,0,parseInt(hours/10),ctx)
    if(hours >= 100){
        MARGIN_LEFT = Math.round(WINDOW_WIDTH / 30)
        renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/100),ctx)
        hours %= 100
        renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours/10),ctx)
        renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx)
        renderDigit(MARGIN_LEFT+45*(RADIUS+1),MARGIN_TOP,parseInt(10),ctx)


        renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx)
        renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx)
        renderDigit(MARGIN_LEFT+84*(RADIUS+1),MARGIN_TOP,parseInt(10),ctx)

        renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx)
        renderDigit(MARGIN_LEFT+108*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx)
    }else{
        MARGIN_LEFT = Math.round(WINDOW_WIDTH /13)
        renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx)
        renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx)
        renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,parseInt(10),ctx)


        renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx)
        renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx)
        renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,parseInt(10),ctx)

        renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx)
        renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx)
    }



    for(var i=0;i<balls.length;i++){
        ctx.fillStyle = balls[i].color

        ctx.beginPath()
        ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        ctx.closePath()

        ctx.fill()
    }
}

function renderText(ctx) {
    ctx.font = "50px bold 黑体";

    var months = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 3600 / 24 / 30)

    ctx.fillText("距离高文峰和周珍在一起",MARGIN_LEFT,MARGIN_TOP +  + (RADIUS+1) * 2 * (digit[0].length+3))
    ctx.fillText("\t\t\t\t\t\t\t"+months+"个月倒计时",MARGIN_LEFT,MARGIN_TOP + (RADIUS+1) * 2 * (digit[0].length+3) + 60)

}

function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds()
    if(nextShowTimeSeconds == 0){
        window.location.href = "../flower/index.html"
    }
    var nextHours = parseInt(nextShowTimeSeconds / 3600)
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    var nextSeconds = nextShowTimeSeconds % 60


    var curHours = parseInt(curShowTimeSeconds / 3600)
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = curShowTimeSeconds % 60

    if(nextSeconds != curSeconds){

        if(curHours >= 100){
            if(parseInt(curHours/100) != parseInt(nextHours/100)){
                addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHours / 100));
            }
            curHours %= 100
            nextHours %= 100
            if(parseInt(curHours/10) != parseInt(nextHours/10)){
                addBalls(MARGIN_LEFT +15*(RADIUS+1),MARGIN_TOP,parseInt(curHours / 10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)){
                addBalls(MARGIN_LEFT +30*(RADIUS+1),MARGIN_TOP,parseInt(curHours % 10));
            }
            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
                addBalls(MARGIN_LEFT +54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes / 10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
                addBalls(MARGIN_LEFT +69*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes % 10));
            }
            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
                addBalls(MARGIN_LEFT +93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds / 10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
                addBalls(MARGIN_LEFT +108*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds % 10));
            }
        }else{
            if(parseInt(curHours/10) != parseInt(nextHours/10)){
                addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHours / 10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)){
                addBalls(MARGIN_LEFT +15*(RADIUS+1),MARGIN_TOP,parseInt(curHours % 10));
            }
            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
                addBalls(MARGIN_LEFT +39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes / 10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
                addBalls(MARGIN_LEFT +54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes % 10));
            }
            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
                addBalls(MARGIN_LEFT +78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds / 10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
                addBalls(MARGIN_LEFT +93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds % 10));
            }
        }

        curShowTimeSeconds = nextShowTimeSeconds
    }
    updateBalls()
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)";

    for (var i = 0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(1 === digit[num][i][j]){
                ctx.beginPath()
                ctx.arc(x+2*j*(RADIUS+1)+(RADIUS+1),y+2*i*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI)
                ctx.closePath()

                ctx.fill()
            }
        }
    }
}

function addBalls(x,y,num) {
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 100)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall)
            }
        }
    }
}

function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g

        if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
            balls[i].y = WINDOW_HEIGHT - RADIUS
            balls[i].vy = - balls[i].vy * 0.75
        }
     }

    var cnt = 0
    for(var i=0;i<balls.length;i++){
        if(balls[i].x + RADIUS >0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i]
        }
    }
    while (balls.length>cnt){
        balls.pop()
    }
}
