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
var spelStatus = UITLEG;

/* variablen en constanten voor level switchen*/
const LEVELEEN = 0;
const LEVELTWEE = 1;
const LEVELDRIE = 2;
var level = LEVELEEN;
var level = LEVELTWEE;
var level = LEVELDRIE;


/* variabelen voor beweeg speler en spawn punt*/
var spawnX = 159;
var spawnY = 500;
var spelerX = 159; // x-positie van speler
var spelerY = 390; // y-positie van speler

var score = 0; // aantal behaalde punten

/* variabelen voor toetsen gebruik*/
 var KEY_LEFT = 37;
 var KEY_RIGHT = 39;
 var KEY_SPACEBAR = 32;
 var KEY_UPDOWN = 38;
 var KEY_DOWN = 40;
 var sprongHoogte = 5;
 var speedJump = 20;
 var spelerSize = 25;
 var jumpHoogte = 6.5;
 
 /*variabelen voor Platformen en snelheid*/
 var platformSnelheidY = [2, 2, 2, 2];
 var platformSnelheidX = [2, 2, 2, 2];
 
 var platformSnelheidX2 = [3, 3, 3, 3];
 var platformSnelheidY2 = [3, 3, 3, 3];

 var platformHeight = 60;
 var platformBreedte = 225;
 var platformSize = [200, 150, 220, 450];
 
var platformX = [50, 260, 500, 760, 1000];
var platformY = [500, 500, 500, 500, 500];

var platformX2 = [50, 280, 530, 770, 1020];
var platformY2 = [500, 400, 322, 400, 500];

var platformX3 = [55, 270, 535, 780, 1013];
var platformY3 = [500, 360, 525, 360, 280];

var schadePlatformX = [125, 305, 425, 625];
var schadePlatformY = [280, 280, 280, 280];

var schadePlatformX2 = [60, 315, 618, 822];
var schadePlatformY2 = [315, 350, 350, 375];

/* variabelen voor punten*/
 var PuntenX = [300, 550, 800, 1000];
 var PuntenY = [450, 450, 450, 450];
 
 var PuntenX2 = [271, 531, 771, 1021];
 var PuntenY2 = [390, 300, 300, 450];
 
 var PuntenX3 = [300, 300, 550, 1000];
 var PuntenY3 = [450, 250, 350, 300];
 
 var punten = 0;
 var highScore = 0;
 var levens = 1;

// variabelen voor plaatjes
var imgA = 0;
var imgB = 0;
var imgC = 0;
var imgD = 0;

function preload() {
  imgA = loadImage('background.gif'); // plaatje laden
  imgB = loadImage('metalplatform.png');
  imgC = loadImage('spaceship.png');
  imgD = loadImage('shootingstar.png');
    };


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */



/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("black");
  rect(20, 20, width - 2 * 20, height - 2 * 20)
};

/*Tekent de borders voor het speelveld*/

var tekenBorders = function() {
    fill("red")
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

/* tekent de platformen */
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
    fill('blue');
    rect(x, y, w, h);
};

/*Tekent veiligheids platformen*/

var tekenPlatform = function(x,y,w,h) {
        image(imgB, platform[0], y, w, h);
    }

var schadePlatformX = [200, 475, 725, 975];
var schadePlatformY = [300, 350, 270, 350];

var schadePlatformX2 = [250, 425, 650, 900];
var schadePlatformY2 = [275, 325, 250, 325];




/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
 noStroke();
 fill("red");
 ellipse(spelerX, spelerY, 50, 50);
};




/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
 var beweegSpeler = function() {
    if (keyIsPressed) 
       if (keyIsDown(KEY_LEFT)) {spelerX -= 8}
       else if (keyIsDown(KEY_RIGHT)) {spelerX += 8}
       else if (keyIsDown(KEY_UPDOWN)) {spelerY -= 13}
       else if (keyIsDown(KEY_DOWN)) {spelerY += 13}
       
   };
   
/* laat de schadeplatformen bewegen*/
var beweegPlatform = function(x,y) {
    

    schadePlatformY[y] += platformSnelheidY[y];
    schadePlatformX[x] += platformSnelheidY[x];

    if (schadePlatformY[y] > 550) {
        platformSnelheidY[y] = -2;
    }
    
    if (schadePlatformY[y] < 350) {
        platformSnelheidY[y] = 2;
    }
};

    var beweegPlatform2 = function(y){
    schadePlatformY2[y] += platformSnelheidY2[y];
     
    

    if (schadePlatformY2[y] > 550) {
        platformSnelheidY2[y] += -2;
    }
    
    if (schadePlatformY2[y] < 200) {
        platformSnelheidY2[y] += 2;
    }
     
    
   
};
    /*tekent de punten*/
var Punten = function(x, y, w, h, p)
{if (spelerX > x - 0.365*w && 
        spelerX < x + 1*w && 
        spelerY > y - 0.365*h && 
        spelerY < y + 1*w)

        {score += 1;
            PuntenX.splice(p, 1);
            PuntenY.splice(p, 1);
            PuntenX2.splice(p, 1);
            PuntenY2.splice(p, 1);
            PuntenX3.splice(p, 1);
            PuntenY3.splice(p, 1);
         
    }
      image(imgD,x, y, 60, 25);
};

/*tekent schadePlatform*/
var schadePlatform = function(x, y, w, h){
    if (spelerX > x- spelerSize/2 && 
        spelerX < x + w + spelerSize/2 &&
        spelerY > y - spelerSize/2 &&
        spelerY < y + h + spelerSize/2)
        
        
        { levens -= 1;
         spelerX = spelerX
         spelerY = spelerY
         speedJump = 20;
        }
        image(imgC, x, y, w, h);
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

  // Kleur de achtergrond zwart
  background('black');
}



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {

  switch (spelStatus) {
    case UITLEG:

    if (keyIsDown(KEY_SPACEBAR)) {
        spelStatus = UITLEG;
    }

    fill(175, 175, 175)
    textSize(30)
    text("Gebruik de linker en rechter pijltjes om heen en weer te bewegen. Met pijltje omhoog kan je springen. De langer je het pijltje ingedrukt houd de hoger je karakter springt.", 40, 20, 1240, 700)
    text("Druk op de 1 2 3 toesten om een level/game te starten. Om te wisselen van level druk op 1 en druk op het level wat u wilt spelen", 40, 150, 1240, 700)

    text("Blauwe platforms zijn veilig bruine platforms brengen schade op", 325, 265, 700, 700)

    text("Hier links staan hoe alle platformen en punter eruit zien", 325, 375, 900, 700)
    

    platform(170, 250, 100, 50)
    schadePlatform(170, 375, 100, 50)
    Punten(170, 540, 20, 20)
   
    if (keyIsPressed && keyCode === 49) {
        spelStatus = SPELEN;
        level = LEVELEEN;
        levens = 1;
        score = 0;
        PuntenX = [300, 550, 800, 1000];
        PuntenY = [450, 450, 450, 450];
    }
   if (keyIsPressed && keyCode === 50) {
     spelStatus = SPELEN;
     level = LEVELTWEE;
    levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
   }
    
    if (keyIsPressed && keyCode === 51) {
     spelStatus = SPELEN;
     level = LEVELDRIE;
      levens = 1;
        score = 0;
        PuntenX3 =  [300, 300, 550, 1000];
        PuntenY3 = [450, 250, 350, 300];
       
   }

        break;
    
    
    case SPELEN: 
      beweegSpeler();
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
        levens -= 1;
        spawnX = 25;

      }

      tekenVeld();
      tekenBorders();
      tekenPlatform();


switch(level) {

      case LEVELEEN:
          image(imgA, 0, 0, 1300, 750); 
          tekenSpeler(spelerX, spelerY);
 if (keyIsPressed && keyCode === 49) {
        spelStatus = SPELEN;
        levens = 1;
        score = 0;
        PuntenX = [300, 550, 800, 1000];
        PuntenY = [450, 450, 450, 450];
       }

      for(var i = 0; i <schadePlatformX.length; i++) {
      schadePlatform(schadePlatformX[i], schadePlatformY[i], 50, 25)
      }

      for(var i = 0; i <platformX.length; i++) {
      platform(platformX[i], platformY[i], 100, 20)
      }

      for(var i = 0; i <PuntenX.length; i++) {
      Punten(PuntenX[i], PuntenY[i], 20, 20, i)
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
    
if (keyIsPressed && keyCode === 50) {
     spelStatus = SPELEN;
     level = LEVELTWEE;
      levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
   }
    
    if (keyIsPressed && keyCode === 51) {
     spelStatus = SPELEN;
     level = LEVELDRIE;
      levens = 1;
        score = 0;
        PuntenX3 =  [300, 300, 550, 1000];
        PuntenY3 = [450, 250, 350, 300];
       
   }
    
    switch(spelStatus){
      case GAMEOVER:
          }
        
  

  switch(level) {
      case LEVELTWEE:
          image(imgA, 0, 0, 1300, 750); 
          tekenSpeler(spelerX, spelerY);
 if (keyIsPressed && keyCode === 50) {
        spelStatus = SPELEN;
        levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
         }

      for(var i = 0; i <schadePlatformX.length; i++) {
      schadePlatform(schadePlatformX2[i], schadePlatformY2[i], 95, 45)
      }

      for(var i = 0; i <platformX.length; i++) {
      platform(platformX2[i], platformY2[i], 125, 70)
      }

      for(var i = 0; i <PuntenX.length; i++) {
      Punten(PuntenX2[i], PuntenY2[i], 20, 20, i)
      }

      for(var i = 0; i <schadePlatformY.length; i++) {
      beweegPlatform2(i)
    }
      
    schadePlatform(20, 600 - 5, width - 2*10, height - 2*20 - 575 + 15)
}

      textSize(30)
      fill(200, 200, 200)
      text("levens = " + levens, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      spelerY += 3.25
      

      if (keyIsPressed && keyCode === 49) {
        spelStatus = SPELEN;
        level = LEVELEEN;
        levens = 1;
        score = 0;
        PuntenX = [300, 550, 800, 1000];
        PuntenY = [450, 450, 450, 450];
}  
      if (keyIsPressed && keyCode === 50) {
     spelStatus = SPELEN;
     level = LEVELTWEE;
      levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
   }
    
    if (keyIsPressed && keyCode === 51) {
     spelStatus = SPELEN;
     level = LEVELDRIE;
      levens = 1;
        score = 0;
        PuntenX3 =  [300, 300, 550, 1000];
        PuntenY3 = [450, 250, 350, 300];
   }


      switch(spelStatus){
     case GAMEOVER:
      }
 

switch(level) {

      case LEVELDRIE:
          image(imgA, 0, 0, 1300, 750);
           tekenSpeler(spelerX, spelerY);
 if (keyIsPressed && keyCode === 51) {
        spelStatus = SPELEN;
        levens = 1;
        score = 0;
         PuntenX3 = [300, 300, 550, 1000];
         PuntenY3 = [450, 250, 350, 300];
       }

      for(var i = 0; i <schadePlatformX.length; i++) {
      schadePlatform(schadePlatformX2[i], schadePlatformY2[i], 95, 45)
      }

      for(var i = 0; i <platformX.length; i++) {
      platform(platformX3[i], platformY3[i], 125, 70)
      }

      for(var i = 0; i <PuntenX.length; i++) {
      Punten(PuntenX3[i], PuntenY3[i], 20, 20, i)
      }

      for(var i = 0; i <schadePlatformY.length; i++) {
      beweegPlatform2(i)
    }
      
    schadePlatform(20, 600 - 5, width - 2*10, height - 2*20 - 575 + 15)
}

      textSize(30)
      fill(200, 200, 200)
      text("levens = " + levens, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      spelerY += 3.25
        spelStatus = SPELEN;
        
        if (keyIsPressed && keyCode === 49) {
        spelStatus = SPELEN;
        level = LEVELEEN;
        levens = 1;
        score = 0;
        PuntenX = [300, 550, 800, 1000];
        PuntenY = [450, 450, 450, 450];
}  
      
    if (keyIsPressed && keyCode === 50) {
     spelStatus = SPELEN;
     level = LEVELTWEE;
      levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
   }
    
    if (keyIsPressed && keyCode === 51) {
     spelStatus = SPELEN;
     level = LEVELDRIE;
      levens = 1;
        score = 0;
        PuntenX3 = [300, 300, 550, 1000];
        PuntenY3 = [450, 250, 350, 300];
       
   }


      switch(spelStatus){
      case GAMEOVER: 
      }

      

     
    
        
      
   if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
    
      case GAMEOVER:
      
        background(0,0,0);
        textSize(80)
        fill('blue')
        text("game over", 640 - 175, 360, 700, 700);
        text("score: " + score, 640 - 175, 460, 700, 700);

        if (score > highScore) {
            highScore = score;
        }

        text ("Highscore: " + highScore, 640 - 175, 560, 700, 700);
        level = LEVELEEN;
        level = LEVELTWEE;
        level = LEVELDRIE;
        spelerX = 159;
        spelerY = 500;
        spawnX = 159;
        spawnY = 500;
          
    if (keyIsPressed && keyCode === 49)  {
        spelStatus = SPELEN;
        level = LEVELEEN;
         levens = 1;
        score = 0;
        PuntenX = [300, 550, 800, 1000];
        PuntenY = [450, 450, 450, 450];
       }
       
 else if (keyIsPressed && keyCode === 50)  {
        spelStatus = SPELEN;
        level = LEVELTWEE;
       levens = 1;
        score = 0;
        PuntenX2 = [271, 531, 771, 1021];
        PuntenY2 = [390, 300, 300, 450];
       }
      
       else if (keyIsPressed && keyCode === 51)  {
        spelStatus = SPELEN;
        level = LEVELDRIE;
         levens = 1;
        score = 0;
        PuntenX3 = [300, 300, 550, 1000];
        PuntenY3 = [450, 250, 350, 300];
       }
       
       if (keyIsPressed && keyCode === KEY_SPACEBAR)  {
        spelStatus = UITLEG;
         }
    
}
}

