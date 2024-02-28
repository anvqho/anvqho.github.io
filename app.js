var animationInterval;

// previous unused math
// var sizeAdjustment = 4;
// var previousSizeToWindow = Math.floor(Math.floor(window.innerWidth / sizeAdjustment) / 32);

var sizeToWindow = 2;

var spriteHeight = 240 * sizeToWindow;
var spriteWidth = 355 * sizeToWindow;

var noCounter = 0;

var buttons = document.getElementById("buttons");

var currentAnimation = "intro";

function noClicked() {
  buttons.style.display = "none";
  if (noCounter == 0) {
    noCounter += 1;
    animateSean(currentAnimation, "secondchance");
  } else {
    noCounter = 0;
    animateSean(currentAnimation, "murder");
  }
}

function yesClicked() {
  buttons.style.display = "none";
  animateSean(currentAnimation, "running");
}

function getSheet(type) {
  return document.getElementById(type);
}

function getFrames(type) {
  switch (type) {
    case "intro":
      return 45;
    case "idle":
      return 3;
    case "murder":
      return 32 + 41 + 27;
    case "secondchance":
      return 42;
    case "running":
      return 10;
    case "celebrate":
      return 8;
    default:
      return 1;
  }
}

function setupSheet(type, spriteWidth, spriteHeight) {
  var sheet = getSheet(type);
  var sheetWidth = spriteWidth * getFrames(type);

  sheet.style.height = spriteHeight + "px";
  sheet.style.width = spriteWidth + "px";
  sheet.style.backgroundSize = spriteWidth * getFrames(type) + "px";
}

function animationStop(interval) {
  clearInterval(interval);
}

function animateSean(previousType, type) {
  var previousSheet = getSheet(previousType);
  var sheet = getSheet(type);
  sheetWidth = spriteWidth * getFrames(type);

  clearInterval(animationInterval);
  previousSheet.style.display = "none";
  sheet.style.display = "inline-block";
  currentAnimation = type;

  var position = 0; // start position for the image
  const speed = 150; // in millisecond(ms)
  const diff = spriteWidth; // difference between two sprite frames

  animationInterval = setInterval(() => {
    sheet.style.backgroundPosition = `-${position}px 0px`;

    if (position < sheetWidth) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      if (type == "intro" || type == "secondchance") {
        animateSean(type, "idle");
        buttons.style.display = "block";
      }
      if (type == "murder") {
        animateSean(type, "intro");
      }
      if (type == "running") {
        animateSean(type, "celebrate");
      }
      //reset the position to show first sprite after the last one
      position = spriteWidth;
    }
  }, speed);
}

//Set up animation sheet dimensions
setupSheet("idle", spriteWidth, spriteHeight);
setupSheet("intro", spriteWidth, spriteHeight);
setupSheet("secondchance", spriteWidth, spriteHeight);
setupSheet("murder", spriteWidth, spriteHeight);
setupSheet("running", spriteWidth, spriteHeight);
setupSheet("celebrate", spriteWidth, spriteHeight);
setupSheet("question", 128 * sizeToWindow, 32 * sizeToWindow);
setupSheet("yes-answer", 28 * sizeToWindow * 2, 14 * sizeToWindow * 2);
setupSheet("no-answer", 28 * sizeToWindow * 2, 14 * sizeToWindow * 2);

// Start first animation
animateSean(currentAnimation, "intro");
