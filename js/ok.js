function crash(tank,context,that){
    // 敌方坦克是否碰撞玩家坦克
    if(context==ctx1&&Math.sqrt(Math.pow(Math.abs(tank.bullets.x-p.x),2)+Math.pow(Math.abs(tank.bullets.y-p.y),2))<=20){
        playDirections[1]=1;
        playDirections[0]=null;    
        if(tank.bullets.tankBoom<3){
            tank.bullets.tankBoom+=1;
            that.apear(tank.bullets,tank.bullets.tankBoom,"tankBoom",p);
            return;
        }else{
            playPosition.x=144;playPosition.y=384;
            p=new Tank(playPosition.x,playPosition.y,imgPosition.player,"UP");
            tank.bullets=null;
            return;
        }               
    }
    // 玩家子弹与敌方坦克判定
    else if(context==ctx2){
      for(var i=0;i<=enemys.length-1;i++){
            if(Math.abs(tank.bullets.x-enemys[i].x-16)<=30&&Math.abs(tank.bullets.y-enemys[i].y-16)<=30){
                    tank.bullets.tankBoom+=1;                 
                    that.apear(tank.bullets,tank.bullets.tankBoom,"tankBoom",enemys[i]);
                    if(tank.bullets.tankBoom==3){                  
                        var newTank=new Tank(i%3*194,0,imgPosition.enemy1,"DOWN"); 
                        enemys.splice(i,1,newTank);
                        tank.bullets=null;
                        break;
                    };
            }
        }      
    }
};
x:"DOWN",
            y:function(tank){
                if(tank.y+4<=384&&/*右下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x-1)/16)+2]==0&&/*左下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x+1)/16)]==0){
                    tank.y+=4;}else{return;}   
                if(tank.y+4*tank.speed<=384&&/*右下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x-1)/16)+2]==0&&/*左下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x+1)/16)]==0){
                    tank.y+=4*tank.speed;}else{return;}
            } 


