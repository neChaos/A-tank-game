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
        for(var i=0;i<=enemys.length-1;i++){
            if(enemys[i].HP==0){
                continue;
            }else if(Math.abs(tank.bullets.x-enemys[i].x-16)<=30&&Math.abs(tank.bullets.y-enemys[i].y-16)<=30){
                // Math.sqrt(Math.pow(Math.abs(x1-enemys[i].x),2)+Math.pow(Math.abs(y1-enemys[i].y),2))<=20
                // if(tank.bullets.tankBoom<3){
                //     console.log("hello");
                //     tank.bullets.tankBoom+=1;
                //     that.apear(tank.bullets,tank.bullets.tankBoom,"tankBoom",enemys[i]);
                //     return;
                // }else{
                //     enemys[i].HP=0;
                //     var x3=enemys.length%3*194;
                //     var tank1=new Tank(x3,0,imgPosition.enemy1,"DOWN"); 
                //     enemys.push(tank1);
                //     tank.bullets=null;
                //     return;
                // }
                console.log("crash");
            }
        }
    }
}


