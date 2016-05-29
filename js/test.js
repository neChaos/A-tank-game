var a=new MAIN();
var ctx=a.createContext("mCanvas");
var ctx1=a.createContext("eCanvas");
var ctx2=a.createContext("tCanvas");
// 初始化玩家坦克
var p=new Tank(playPosition.x,playPosition.y,imgPosition.player,"UP");
// 避免开网页时出现黑白地图，提前画出地图
window.onload=function(){
    a.drawMap(ctx);
};
function isDireTrue(event){
   if(event.keyCode==65&&event.type=="keydown"){
         playDirections[2]=true;   
     } else if(event.keyCode==65&&event.type=="keyup"){
        playDirections[2]=false; 
     }
}
addEventListener("keydown",a.isDirTrue,false);
addEventListener("keyup",a.isDirTrue,false);
addEventListener("keydown",a.keyDown,false);
addEventListener("keyup",a.keyUp,false);
var reee=setInterval(function(){
            ctx2.clearRect(0,0,416,416);           
            a.moveTank();            
            a.drawTank(p,ctx2);
            a.playerIsBullet();
            a.bulletLaunch(p,ctx2,a);

},50);
setInterval(function(){a.drawEnemy(ctx1);},100);
