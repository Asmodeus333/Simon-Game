var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on('keydown touchstart', function(event) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            console.log("success");
        }
    } else {      
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200); // A remoção da classe game-over após 200ms
        startOver();
    }
}

        

function nextSequence() {
    userClickedPattern = [];
    level ++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout (function() {        
        $("#" + currentColor).removeClass("pressed");        
    }, 100)
};

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


