enchant();
window.onload = function(){
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload("chara1.png","map0.gif");
    
    game.onload = function(){
		
		var physicsWorld = new PhysicsWorld(0, 9.8);
		var surface = [];
		var ball = [];
		for(i=0;i<20;i++){
			surface[i] = new Surface(32, 32);
  			surface[i].context.beginPath();
  			surface[i].context.arc(16, 16, 15, 0, Math.PI*2, true);
  			surface[i].context.fillStyle = 'rgba(' + Math.floor(Math.random()*255)+',' + Math.floor(Math.random()*255) + ','+ Math.floor(Math.random()*255) +',0.7)'; // 紫
 			surface[i].context.fill();
 			
			ball[i] = new PhyCircleSprite(16, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.1, Math.random()*6/(i+1), true);
			ball[i].image = surface[i];
			//ball.x = 0;
			
			if(i<5){
				ball[i].x = 50+31*i;  //yを指定しないと物理計算世界とスプライトのY座標がずれてる。
			}else{
				ball[i].x = Math.random()*game.width*0.9+16;
				ball[i].y = Math.random()*game.height*0.9+16;
 			}
			//ball.scale(-1,2)
			ball[i].body.m_body.SetLinearDamping(0.1);
			game.rootScene.addChild(ball[i]);
			
			//ball[i].applyImpulse(new b2Vec2(2,0));
		}
		ball[0].x = 0;
		//ball[0].applyImpulse(new b2Vec2(10,0));
		
		
		var wall=[];
		for(i=0;i<2;i++){
			wall[i] = new PhyBoxSprite(game.width,1,enchant.box2d.STATIC_SPRITE, 1.0, 0.1, 0.3, true);
			wall[i].image = game.assets['map0.gif'];
			wall[i].x = 0;
		}
		for(i=2;i<4;i++){
			wall[i] = new PhyBoxSprite(1,game.height,enchant.box2d.STATIC_SPRITE, 1.0, 0.1, 0.3, true);
			wall[i].image = game.assets['map0.gif'];
			wall[i].y = 0;
			
		}
			wall[0].y = 0;
			wall[1].y = game.height - 1;
			wall[2].x = 0;
			wall[3].x = game.width - 1;
		for(i=0;i<4;i++){
			game.rootScene.addChild(wall[i]);
		}
		/*
		var circle1 = new PhyCircleSprite(16, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.3, true);
		circle1.image = game.assets['chara1.png'];
		circle1.x = 0;
		circle1.y = 30;  //yを指定しないと物理計算世界とスプライトのX座標がずれる。
		game.rootScene.addChild(circle1);
		circle1.applyImpulse(new b2Vec2(2,0));
		*/
        game.rootScene.addEventListener("enterframe",function(){
        	physicsWorld.step(game.fps*5);
        	if(game.frame % 10 == 0){
        		surface[0].context.fillStyle = 'rgba(' + Math.floor(Math.random()*255)+',' + Math.floor(Math.random()*255) + ','+ Math.floor(Math.random()*255) +',0.7)'; // 紫
 				surface[0].context.fill();
 			}
        });
         /* - "touchstart" : タッチ/クリックされたとき
         * - "touchmove" : タッチ座標が動いた/ドラッグされたとき
         * - "touchend" : タッチ/クリックが離されたとき
         * - "enterframe" : 新しいフレームが描画される前
         * - "exitframe" : 新しいフレームが描画された後 */
    };

    /**
     * Game#start
     * ゲームを開始する。この関数を実行するまで、ゲームは待機状態となる。
     * 代わりに Game#debug を使うことで、デバッグモードで起動することができる。
     * Game#pause(); で一時停止し、 Game#resume(); で再開することができる。
     */
    game.start();
};
