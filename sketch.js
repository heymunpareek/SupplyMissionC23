var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gs = PLAY;
function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
	if (gs === PLAY) {
		moveHelicopter();
	}
	else if(gs===END) {
		textSize(20);
		fill("white");
		text("HELICOPTER DROPPED THE PACKAGE", 200, 350);

		if(helicopterSprite.x > 320 && helicopterSprite.x < 480) {
			fill("green")
			text("YAY! YOU MADE IT! PACKAGE HAS BEEN RECEIVED",200,400);
		}
		else {
			fill("red")
			text("GAME OVER! YOU FAILED!", 250, 400);
		}
		
	}

	
  dropPackage();
	console.log(packageBody.position.x);

  drawSprites();
  
  
  
  
 
}

function moveHelicopter() {
	if(keyDown("left")) {
		helicopterSprite.x = helicopterSprite.x - 10;
		packageBody.position.x = packageSprite.x = helicopterSprite.x ;
		
		
	}
	else if (keyDown("right")) {
		helicopterSprite.x = helicopterSprite.x +10;
		packageBody.position.x = packageSprite.x= helicopterSprite.x ;
		
	}
}

function dropPackage() {
	if(keyCode === DOWN_ARROW) {
		
		if(packageBody.position.y < 610) {
			packageBody.position.x = packageSprite.x= helicopterSprite.x ;
			Matter.Body.setStatic(packageBody, false);		
		}
		else {
			packageBody.position.x = packageSprite.x = helicopterSprite.x;
			Matter.Body.setStatic(packageBody,true);
		}
		gs = END;
		
	}
}