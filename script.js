/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
const LEVELONE = 0;
const LEVELTWO = 1;
const DERDELEVEL = 2;
var level = LEVELONE;
var level = LEVELTWO;
var spawnX = 159;
var spawnY = 500;
var spelerX = 159; // x-positie van speler
var spelerY = 500; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 300;   // x-positie van vijand
var vijandY = 600;   // y-positie van vijand

var score = 0; // aantal behaalde punten



var player ={
x : 100,
y: 300,
sx: 20,
sy: 20
};

 var KEY_LEFT = 37;
 var KEY_RIGHT = 39;
 var KEY_SPACEBAR = 32;
 var KEY_DOWN = 40;
 var sprongHoogte = 5;
 var speedJump = 20;
 var spelerSize = 25;
 var jumpHoogte = 6.5;

 var platformSnelheidY = [2, 2, 2, 2];
 var platformSnelheidX = [2, 2, 2, 2];

 var platformHeight = 60;
 var platformBreedte = 225;
 var platformSize = [200, 150, 220, 450];
 
 var platformX = [30, 290, 470, 660, 955];
 var platformY = [520, 540, 560, 580, 600];

 var puntenX = [300, 600, 800, 400, 700];
 var PuntenY = [450, 450, 450, 650, 200];
 var punten = 0;
 var highScore = 0;
 var levens = 8;

var schadePlatformX = [165, 325, 475, 625];
var schadePlatformY = [250, 250, 250, 250];

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("white");
  rect(20, 20, width - 2 * 20, height - 2 * 20)
};

var tekenBorders = function() {
    fill("green")
    rect(20, 600, width - 2 * 20, height - 2 * 20 - 575);
    if (spelerY > 600 - spelerSize/2) {
        spelerY = 600 - spelerSize/2;
       
    }
    if (spelerX > 1200 - spelerSize/2) {
        spelerX = 1200 - spelerSize/2;
      
    }
    if (spelerX < 100 - spelerSize/2) {
        spelerX = 100 - spelerSize/2;
       
    }
    if (spelerY > 1200 - spelerSize/2) {
        spelerY = 1200 - spelerSize/2;
     
    }
};
var platform = function(x, y, w, h) {
if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + spelerSize/2
    ) 

     {spelerY = y - spelerSize/2;
        jumpHoogte = 6.5 + 4.5;
        speedJump = 0;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + 5 + h + spelerSize/2
    ) 
     
     {spelerY = y + 5 + h + spelerSize/2;
      speedJump = 20;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + 5 + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x + 5 + w + spelerSize/2;
     };

if (spelerX > x - 5 - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x - 5 - spelerSize/2;
     };
    
    fill("blue")
    rect(x, y, w, h)
};


var tekenPlatform = function(x,y,w,h) {
  fill("blue");
  rect(platformX[0], y, w, h)
};

var schadePlatformX = [200, 475, 725, 975];
var schadePlatformY = [300, 350, 270, 350];

    

var achtergrondX = [250, 745, 300, 225, 465, 780, 0, 0, 0, 0, 0, 0, 0, 0];
var achtergrondY = [100, 200, 150, 40, 180, 30, 95, 0, 0, 0, 0, 0, 0, 0, 0];

var zon = function(x,y)
 ellipse(achtergrondX[x], achtergrondY[y], 30, 30)
}


};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
 noStroke();
 fill("red");
 ellipse(spawnX, spawnY, 50, 50);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
 var beweegSpeler = function() {
    if (keyIsPressed) 
       if (keyIsDown(KEY_LEFT)) {spelerX -= 3}
       else if (keyIsDown(KEY_RIGHT)) {spelerX += 3}
       else if (keyIsDown(KEY_SPACEBAR)) {spelerY -= 5}
       
       
   };
var beweegPlatform = function(x,y) {
    // platformX[x] += platformSpeed;
    // damagePlatformY[y] += platformSpeedY[y];
    // damagePlatformX[x] += platformSpeedX[x];

    schadePlatformY[y] += platformSnelheidY[y];
    schadePlatformX[x] += platformSnelheidY[x];

    if (schadePlatformY[y] > 550) {
        platformSnelheidY[y] = -2;
    }
    
    if (schadePlatformY[y] < 350) {
        platformSnelheidY[y] = 2;
    }

    

};
var Punten = function(x, y, w, h, p)
{if (spelerX > x - 0.375*w && 
        spelerX < x + 1*w && 
        spelerY > y - 0.375*h && 
        spelerY < y + 1*w)

        {score += 1;
            puntenX.splice(p, 1);
            PuntenY.splice(p, 1);
         
    }

      fill(187,224,255)
      ellipse(x, y, w, h);
};


var schadePlatform = function(x, y, w, h){
    if (spelerX > x- spelerSize/2 && 
        spelerX < x + w + spelerSize/2 &&
        spelerY > y - spelerSize/2 &&
        spelerY < y + h + spelerSize/2)
        
        
        { levens -= 1;
         spelerX = spawnX
         spelerY = spawnY
         speedJump = 20;
        }
        fill(150, 0, 0);
        rect(x, y, w, h);
      
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    if (levens ===0)
    {return true}
  else return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('Red');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:


    break;
    
    
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
        levens -= 1;
        spelerX = 25;

      }

      tekenVeld();
      tekenBorders();
      tekenPlatform();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
switch(level) {

      case LEVELONE:


      for(var i = 0; i <schadePlatformX.length; i++) {
      schadePlatform(schadePlatformX[i], schadePlatformY[i], 100, 50)
      }

      for(var i = 0; i <platformX.length; i++) {
      platform(platformX[i], platformY[i], 100, 50)
      }

      for(var i = 0; i <puntenX.length; i++) {
      Punten(puntenX[i], PuntenY[i], 20, 20, i)
      }

      for(var i = 0; i <schadePlatformY.length; i++) {
      beweegPlatform(i,i)
    }
      
    schadePlatform(20, 600 - 5, width - 2*20, height - 2*20 - 575 + 5)
}

      textSize(30)
      fill(200, 200, 200)
      text("levens = " + levens, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      spelerY += 3.25

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
      case LEVELTWO:
     
     
     
     
      break;
    case GAMEOVER:
        background(0,0,0);
        textSize(75)
        fill(255, 0, 0)
        text("game over", 640 - 175, 360, 700, 700);
        text("score: " + score, 640 - 175, 460, 700, 700);

        if (score > highScore) {
            highScore = score;
        }

        text ("Highscore: " + highScore, 640 - 175, 560, 700, 700);
        level = LEVELONE;
        spelerX = 100;
        spelerY = 500;
        spawnX = 100;
        spawnY = 500

    if (keyIsPressed && keyCode === 13) {
        spelStatus = SPELEN;
         levens = 5;
        score = 0;
         puntenX = [300, 600, 800, 400, 700];
         PuntenY = [450, 450, 450, 650, 200];
       }
  }
}

