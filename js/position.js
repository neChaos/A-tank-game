var imgPosition = {
    home:[256,0],
    wall:[0,96],
    player:[0,0],
    enemy1:[0,32],
    enemy2:[128,32],
    enemy3:[0,64],
    bullet:[80,96],
    tankBomb:[0,160],
    bulletBomb:[320,0],
    enemyApear:[256,32]
}

var playPosition = {
    x:128,
    y:368
};
// 所有出生的敌人
var bornEnemys = [
    {
        type:imgPosition.enemy1,
        amount:10
    },
    {
        type:imgPosition.enemy2,
        amount:10
    },
    {
        type:imgPosition.enemy3,
        amount:6
    }
];
var playerHp=3;
    
