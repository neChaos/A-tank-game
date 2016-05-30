function crash(tank,context,that){
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
    }else if(context==ctx2){
    try{
      for(var i=0;i<=enemys.length-1;i++){
            if(enemys[i].HP==0){
                continue;
            }else if(Math.abs(tank.bullets.x-enemys[i].x-16)<=30&&Math.abs(tank.bullets.y-enemys[i].y-16)<=30){
                // Math.sqrt(Math.pow(Math.abs(x1-enemys[i].x),2)+Math.pow(Math.abs(y1-enemys[i].y),2))<=20
                // console.
                if(tank.bullets.tankBoom<3){
                    console.log("hello");
                    tank.bullets.tankBoom+=1;
                    that.apear(tank.bullets,tank.bullets.tankBoom,"tankBoom",enemys[i]);
                    return;
                }
                else{
                    enemys[i].HP=0;
                    var newTank=new Tank(i%3*194,0,imgPosition.enemy1,"DOWN"); 
                    enemys.splice(i,1,newTank);
                    tank.bullets=null;
                    // return;
                }
                console.log("crash");
            }
        }  
    }catch(e){
        console.log(tank);
    }       
        
    }
}


