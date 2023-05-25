
// user clicks
var userClicks = [];
// stores sequence of game colors
var gamePattern = [];

var started = false;

var levelCounter = 0; 
var buttonColors = ['green' , 'red' , 'yellow' , 'blue'];

$(document).keypress(function(){
    if(!started) {
        started = true;
        $("level-title").text("Level " + levelCounter);
        nextSequence();
    }
});


$('.btn').click(function() {
    buttonId = $(this).attr('id');
    userClicks.push(buttonId);

    playAudio(buttonId);
    animationControl(buttonId);
    checkClickPattern(userClicks.length - 1);
});


function checkClickPattern(userLevel) {
    if(userClicks[userLevel] === gamePattern[userLevel]) {
        if(userClicks.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            } , 1000);
        }
    }
    else {
        animationControl('wrong');
        playAudio('wrong');
        $("body").addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over");
        } , 100);
        $("#level-title").text("Game Over Press Any Key to Restart");
        restart();
    }
}

function nextSequence() {
    userClicks = [];
    levelCounter++;
    $("#level-title").text('Level ' + levelCounter);

    var nextColor = Math.floor(Math.random() * 4);

    gamePattern.push(buttonColors[nextColor]);
    $('#' + buttonColors[nextColor]).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playAudio(buttonId) {
    var audio = new Audio("sounds/" + buttonId + '.mp3');
    audio.play();
}

function animationControl(buttonId) {
    $('#' + buttonId).addClass('pressed');
    setTimeout(function() {
        $('#' + buttonId).removeClass('pressed');
    } , 100);
}


function restart() {
    gamePattern = [];
    levelCounter = 0;
    started = false;
}
