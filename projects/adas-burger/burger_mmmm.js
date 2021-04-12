const burgerWideness = 200;
const steakThickness = 20;
const saladThickness = 5;
const tomatoThickness = 10;
const cheeseThickness = 5;
let bgImage;
let quantitySelectors;
let mClicked = false;
let burgerIngredients = {
  'cheese': 2,
  'tomato': 1,
  'salad': 1,
  'steak': 2
}


class Button {
  constructor(x,y,w,h,c,c2,fntsz,link,str){
     this.x = x;
     this.y = y;
     this.w = w;
     this.h = h;
     this.c = c;
     this.c2 = c2;
     this.fntsz = fntsz;
     this.link = link;
     this.str = str;
     if (this.str === '-'){
       this.mdf = -1;
     } else {
       this.mdf = 1;
     }
  }
  draw(){
    fill(this.c);
    noStroke();
    ellipseMode(CENTER);
    textAlign(CENTER);
    textSize(this.fntsz);
    textFont('Helvetica');
    ellipse(this.x,this.y,this.w,this.h);
    fill(this.c2);
    if (this.str === "+"){
      text(this.str,this.x,this.y+this.h/3);
      text(burgerIngredients[this.link],this.x,this.y+50); 
    } else if (this.str === "-"){
      text(this.str,this.x,this.y+this.h/4);
      text(this.link,this.x,this.y+50); 
    }
    
    
    
  }
  modifyQuantity(){
    
    if ((mouseX >= this.x-this.w/2 &&
         mouseX <= this.x+this.w/2) &&
        (mouseY >= this.y-this.h/2 && 
         mouseY <= this.y+this.h/2)){
      this.c = "#ccccff";
      if (mouseIsPressed) {
        if (mouseButton === LEFT && !(mClicked)){ 
          burgerIngredients[this.link]+=this.mdf;
          if (burgerIngredients[this.link] < 0) burgerIngredients[this.link] = 0;
          this.c = "#bbbbff";
          mClicked = true;
        }
      }
    } else {
      this.c = "#cccccc";
    }
  }
}


function createIngredientStack(){
  
  let steakStack =[], cheeseStack = [], saladStack = [], tomatoStack=[],ingredientStack = [];
  
  for (const [objKey, value] of Object.entries(burgerIngredients)){
    if (objKey === 'steak'){
      for (let i = 0; i < value; i++){
        steakStack.push(objKey);
      }
    } else if (objKey === 'cheese') {
      for (let i = 0; i < value; i++){
        cheeseStack.push(objKey);
      }
    } else if (objKey === 'salad') {
      for (let i = 0; i < value; i++){
        saladStack.push(objKey);
      }
    } else if (objKey === 'tomato') {
      for (let i = 0; i < value; i++){
        tomatoStack.push(objKey);
      }
    }
  }
  
  let stkLen=steakStack.length,chsLen=cheeseStack.length,sldLen=saladStack.length,tmtLen=tomatoStack.length;
  
  ingredientStack.push('bun');
  while (true) {
    if (steakStack.length > 0) {
      ingredientStack.push(steakStack[0]);
      steakStack.pop();
    } if (cheeseStack.length > 0) {
      ingredientStack.push(cheeseStack[0]);
      cheeseStack.pop();
    }
    if (!(steakStack.length + cheeseStack.length)) break;
    
    
  }
  
  while (true) {
    if (saladStack.length > 0) {
      ingredientStack.push(saladStack[0]);
      saladStack.pop();
    } if (tomatoStack.length > 0) {
      ingredientStack.push(tomatoStack[0]);
      tomatoStack.pop();
    }
    if (!(saladStack.length + tomatoStack.length)) break;
    
  }
  ingredientStack.push('bun');
  //print([stkLen,chsLen,sldLen,tmtLen]);
  return([ingredientStack,[stkLen,chsLen,sldLen,tmtLen]]);
}


function drawIngredient(x,y,name,pos=null){
  noStroke();
  switch (name) {
    case 'steak':
      fill("#C68958");
      rect(x,y,burgerWideness,steakThickness);
    break;
    case 'cheese':
      fill("#FFD867");
      rect(x,y,burgerWideness,cheeseThickness);
    break;
    case 'salad':
      fill("#94BB5D");
      rect(x,y,burgerWideness,saladThickness);
    break;
    case 'tomato':
      fill("#FF6347");
      rect(x,y,burgerWideness,tomatoThickness);
    break;
    case 'bun':
      fill("#E6AF5D");
      if (pos==1) rect(x,y,burgerWideness,40,30,30,0,0);
      else rect(x,y,burgerWideness,20,0,0,10,10);
    break;
  }
}
function drawBurger(x,y,ingredientStacks){
  x -=burgerWideness/2;
  let pos = null;
  let ingredients = ingredientStacks[0];
  let burgerH = 0;
  let y0;
  let lastIngredient;
  
  for (const [i,ingredient] of ingredients.entries()){
    if (ingredient=='cheese' && lastIngredient != 'steak'){
      burgerH+=cheeseThickness;
    } else if (ingredient=='cheese' && lastIngredient === 'steak'){
      burgerH+=0;
    } else if (ingredient==='tomato'){
      burgerH+=tomatoThickness;
    } else if (ingredient==='salad'){
      burgerH+=saladThickness;
    } else if (ingredient==='steak'){
      burgerH+=steakThickness;
    }
    y0=y-burgerH;
    if (i!=0 && ingredient=='bun') { // if top bun
      pos=1;
      y0=y-(burgerH+40);
    }
    
    drawIngredient(x,y0,ingredient,pos);
    lastIngredient = ingredient;
  }
}

function createQuantitySelectorsArray(x,y,ingredients){
  let selectors=[];
  let i =0;
  for ( let elem in ingredients) {
    let selectorButtonPlus=new Button(x+i*110,y,30,30,'#cccccc','#707070',32,elem,'+');
    let selectorButtonMinus=new Button(x+i*110,y+80,30,30,'#cccccc','#707070',32,elem,'-');
    selectors.push([selectorButtonPlus,selectorButtonMinus,elem]);
    i++;
  }
  return(selectors);
}

function drawQuantitySelectors(selectors){
  for (let elem of selectors){
    elem[0].modifyQuantity();
    elem[1].modifyQuantity();
    elem[0].draw();
    elem[1].draw();
  }
}

function mouseReleased(){
  mClicked = false;
}

function setup() {
  createCanvas(1000, 1000);
  quantitySelectors = createQuantitySelectorsArray(width/2-170,height-150,burgerIngredients);
  createIngredientStack();
  bgImage = loadImage('assets/imgs/adasburger_bg.jpg');
  
}

function draw() {
  //background("#61A8E8");
  background("#d7bfa8");
  image(bgImage,0,0);
  rectMode(CORNER);
  drawQuantitySelectors(quantitySelectors);
  drawBurger(width/2,height/2,createIngredientStack());

}
