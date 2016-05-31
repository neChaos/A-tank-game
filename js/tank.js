
function MAIN(){
    /*1.共同方法*/
    // 创建画布
    this.createContext=function(canvasId){
       var c=document.getElementById(canvasId);
        var ct=c.getContext("2d");
        return ct;
    };
    // 炮弹机会坦克判定
    this.crash=function (tank,context,that){
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
                            // var newEtype=that.selectNewETank();                  
                            // var newTank=new Tank(i%3*194,0,newEtype,"DOWN");
                            var newTank=that.bornEnemy(i%3*194,0,"DOWN"); 
                            enemys.splice(i,1,newTank);
                            tank.bullets=null;
                            break;
                        };
                }
            }      
        }
    };
        // 坦克碰墙判定
    this.directions=[
        {           
            x:"DOWN",
            y:function(tank){
                if(tank.y+4<=384&&/*右下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x-1)/16)+2]==0&&/*左下点*/map[Math.floor((tank.y+3)/16)+2][Math.floor((tank.x+1)/16)]==0){
                    tank.y+=4;}else{return;}
            }
        },
        {
            x:"UP",
            y:function(tank){
                if(tank.y-4>=0&&/*左上点*/map[Math.floor((tank.y-3)/16)][Math.floor((tank.x+1)/16)]==0&&/*右上点*/map[Math.floor((tank.y-3)/16)][Math.floor((tank.x-1)/16)+2]==0){
                    tank.y-=4;}else{return;}
            }
                
        },
        {
            x:"LEFT",
            y:function(tank){
                if(tank.x-4>=0&&map[Math.floor((tank.y+1)/16)][Math.floor((tank.x-3)/16)]==0&&map[Math.floor((tank.y-1)/16)+2][Math.floor((tank.x-3)/16)]==0){
                    tank.x-=4;}else{return;}
            }
                
        },
        {
            x:"RIGHT",
            y:function(tank){
                if(tank.x+4<=384&&map[Math.floor((tank.y-1)/16)+2][Math.floor((tank.x+3)/16)+2]==0&&map[Math.floor((tank.y+1)/16)][Math.floor((tank.x+3)/16)+2]==0){
                    tank.x+=4;}else{return;}
            }
                
        }];
    this.drawMap=function (context){
        var len1=map.length;
        for(var i=0;i<=len1-1;i++){
            for(var j=0;j<=map[i].length-1;j++){
                if(map[i][j]==0){
                    context.fillRect(j*16,i*16,16,16);
                }else if(map[i][j]==1){
                    context.drawImage(img,imgPosition.wall[0],imgPosition.wall[1],16,16,j*16,i*16,16,16)
                }else if(map[i][j]==2){
                   context.drawImage(img,imgPosition.wall[0]+16,imgPosition.wall[1],16,16,j*16,i*16,16,16) 
                };
                
            }
        };
    };
        // 爆炸和敌方坦克出生时闪烁
    this.apear=function(dom,apearIndex,type,tank){
        if(type=="born"){
            ctx1.drawImage(img,imgPosition.enemyApear[0]+apearIndex*32,imgPosition.enemyApear[1],32,32,dom.x,dom.y,32,32);
        }else if(type=="wallBoom"){
            ctx1.drawImage(img,imgPosition.bulletBomb[0]+apearIndex*32,imgPosition.bulletBomb[1],32,32,dom.x-16,dom.y-16,32,32);
        }else if(type=="tankBoom"){
            ctx1.drawImage(img,imgPosition.tankBomb[0]+apearIndex*70,imgPosition.tankBomb[1],64,64,tank.x-16,tank.y-16,64,64);
        };
    };              
    this.bulletLaunch=function(tank,context,that){
        if(tank.bullets==null){
            return;
        }
        var x1= tank.bullets.x,y1=tank.bullets.y;
        that.crash(tank,context,that);
        if(tank.bullets==null||tank.bullets.tankBoom!=-1){
            return;
        }
        // 判定子弹是否碰墙（地图边缘和子弹四周是否有墙）
        if(tank.bullets.wallBoom<0&&y1-16>=0&&y1+16<=416&&x1-16>=0&&x1+16<=416&&map[y1/16][x1/16]==0&&map[y1/16-1][x1/16-1]==0&&map[y1/16-1][x1/16]==0&&map[y1/16][x1/16-1]==0){
            // 取得子弹在图片初始位置            
            var x2=imgPosition.bullet[0],y2=imgPosition.bullet[1];
            switch(tank.bullets.direction){
                case "DOWN":x2=x2+6;tank.bullets.y+=16;           
                break;
                case "UP":tank.bullets.y-=16;
                break;
                case "LEFT":x2=x2+12;tank.bullets.x-=16;
                break;
                case "RIGHT":x2=x2+18;tank.bullets.x+=16;
                break;
                }
            context.drawImage(img,x2,y2,6,6,tank.bullets.x-3,tank.bullets.y-3,6,6);
        }else{
            // 如果是土墙直接清除
            if(x1!=0&&x1!=416&&y1!=0&&y1!=416){
                if(map[y1/16][x1/16]==1||map[y1/16-1][x1/16-1]==1||map[y1/16][x1/16-1]==1||map[y1/16-1][x1/16]==1){
                    map[y1/16][x1/16]=0;
                    map[y1/16-1][x1/16-1]=0;
                    map[y1/16-1][x1/16]=0;
                    map[y1/16][x1/16-1]=0;
                }
            }
            if(tank.bullets.wallBoom<2){
                tank.bullets.wallBoom+=1;
                that.apear(tank.bullets,tank.bullets.wallBoom,"wallBoom")
            }else{
                tank.bullets=null;
            }
            that.drawMap(ctx);
        }
    };
    this.drawTank=function (tank,context){
        var x1,y1;
        if(tank.direction=="DOWN"){
            x1=tank.type[0]+32;
        }else if(tank.direction=="UP"){
            x1=tank.type[0];
        }else if(tank.direction=="RIGHT"){
            x1=tank.type[0]+96;
        }else if(tank.direction=="LEFT"){
            x1=tank.type[0]+64;
        };
        // 如果敌方坦克在16整数倍坐标，自动发射子弹
         if(tank.type==imgPosition.enemy1||tank.type==imgPosition.enemy2||tank.type==imgPosition.enemy3){
            if(tank.x%16==0&&tank.y%16==0&&tank.bullets==null){
                var bullet=new BULLET(tank.x+16,tank.y+16,tank.direction);
                tank.bullets=bullet;
            }
        }  
        context.drawImage(img,x1,tank.type[1],32,32,tank.x,tank.y,32,32);
    };

    /*2.主要是玩家方法*/
    // 判断玩家坦克是否可以射击
    this.playerIsBullet=function(){
       if(playDirections[2]==true&&p.bullets==null){
            var bullet=new BULLET(Math.floor(p.x/16)*16+16,Math.floor(p.y/16)*16+16,p.direction);
                 p.bullets=bullet;
        } 
    };
    // 玩家坦克移动
    this.moveTank=function(){
        if(playDirections[0]==null){
            return;
        };
        var directions=this.directions.slice(0);
        for(var i=0;i<=directions.length-1;i++){
            if(directions[i].x==playDirections[0]){
                var index=i;
                directions[i].y(playPosition);
            }
        };
        // 玩家坦克重置数据
        p.x=playPosition.x;p.y=playPosition.y;p.type=imgPosition.player;p.direction=playDirections[0];
    };
    // 判断玩家子弹发射事件函数
    this.isDirTrue=function(event){
        if(event.keyCode==65&&event.type=="keydown"){
             playDirections[2]=true;   
         } else if(event.keyCode==65&&event.type=="keyup"){
            playDirections[2]=false; 
         }
    };
    // 玩家按下键
    this.keyDown=function(event){
    // 判断上一次按键keyup后，玩家坐标是否到达16的整数倍位置
        if(playDirections[1]==1||event.keyCode>40||event.keyCode<37){
            return;
        }
        switch (event.keyCode){
                case 38:
                var x1="UP";
                break;
                case 40:
                var x1="DOWN";
                break;
                case 37:
                var x1="LEFT";
                break;
                case 39:
                var x1="RIGHT";
                break;
                
            };
           playDirections[0]=x1;
    };
    // 松开键
    this.keyUp=function(event){
        var e=event.keyCode;
        if(e<37||e>40){
            return;
        };
        playDirections[1]=1;
        var ax=setInterval(function(){
            // 判断按键是否是上下键
            if(e%2==0){
                var x1=playPosition.y;
             }else{
                var x1=playPosition.x;
             };
             // 玩家坐标是否是16的整数
            if(x1%16==0){
                  clearInterval(ax); 
                  playDirections[1]=0;
                  playDirections[0]=null;
                }
            },10)

    };

    /*3.下面的函数主要关于敌方坦克*/
    // 敌方坦克移动
    this.moveETANK=function(tank){
        var num=Math.random();
        var directions=this.directions.slice(0);
        for(var i=0;i<=3;i++){
            if(directions[i].x==tank.direction){
                var index=i;
            }
        }
        // 表示有8成机会不改变方向
        if(num>0.2){
            tank.direction=tank.direction;
            directions[index].y(tank);
        }else{
            // 随机一其他个方向
            var num1=Math.floor(Math.random()*3);
            directions.splice(index,1);
            tank.direction=directions[num1].x;
            directions[num1].y(tank);
        };
        directions=null;
    };
    this.drawEnemy=function(context){
        var x1=0,y1=0,that=this;
        // 游戏开始先画6个坦克
        if(enemys.length!=6){
            if(enemys.length+1-3>0){
                x1=(enemys.length+1-3-1)*192;
            }else{
                x1=(enemys.length+1-1)*192;
            };
            var newEnemy=that.bornEnemy(x1,y1,"DOWN");
            // var newEtype=this.selectNewETank();   
            // var newEnemy=new Tank(x1,y1,newEtype,"DOWN");
            enemys.push(newEnemy);
        };
        context.clearRect(0,0,416,416);
        for(var i=0;i<=enemys.length-1;i++){
            // 坦克是否有生命
            if(enemys[i].HP==0){
                continue;
            }
            // 轮流画敌方坦克出现前的四角星
            else if(enemys[i].ready[1]==false){
                if(i==0||enemys[i-1].ready[1]==true){
                    this.apear(enemys[i],enemys[i].ready[0],"born");
                    enemys[i].ready[0]+=1;                       
                }
                if(enemys[i].ready[0]==7){
                    enemys[i].ready[1]=true;
                }
            }else{  
                this.moveETANK(enemys[i]);
                this.drawTank(enemys[i],context);
                this.bulletLaunch(enemys[i],context,that);
            }     
        };
    };
    this.bornEnemy=function(x,y,direction){
        for(var i=0;i<=bornEnemys.length-1;i++){
            if(bornEnemys[i].amount!=0){
                bornEnemys[i].amount-=1;
                switch(i){
                    case 0:var speed=1;break;
                    case 1:var speed=2;break;
                    case 2:var speed=0.5;break;
                }
                var newTank=new Tank(x,y,bornEnemys[i].type,direction,speed);
                return newTank;
            }
        }
    }
};