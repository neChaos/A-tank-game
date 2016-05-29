var img=new Image();
img.src="images/tankAll.gif";
// 坦克对象
var Tank=function (x,y,type,direction){
    this.x=x;
    this.y=y;
    this.type=type;
    this.direction=direction;
    this.ready=[0,false];
    this.bullets=null;
    // 坦克生命值
    this.HP=1;
};
// 敌方坦克出生位置
var enemysPostion=[{x:0,y:0},{x:216,y:0},{x:416,y:0}];
var enemys=[];
// 存储我方坦克方向，是否达到16倍数坐标，子弹是否在飞
var playDirections=["UP",0,false];
var bullets=[];
// 子弹对象
var BULLET=function (x,y,direction){
    this.x=x;
    this.y=y;
    this.direction=direction;
    // 爆炸范围
    this.wallBoom=-1;
    this.tankBoom=-1;
};







