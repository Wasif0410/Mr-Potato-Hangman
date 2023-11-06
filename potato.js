const words = ["javascript", "arithemtic", "discrete", "html", "css", "operator"];
var guessed = [];
var selectedWord = words[Math.floor(Math.random() * words.length)];
var hiddenWord = '_'.repeat(selectedWord.length).split('');
var PotatoStatus = 0;
const PotatoIMG = ["FullBody_0.png", "NoHat_1.png", "NoMouth_2.png", "NoNose_3.png", "NoEyes_4.png", "NoBody_5.png", "nothing.png"];


//checks that the input is correct
function GuessCheck(){
    let guess = document.getElementById('word_input').value.toLowerCase();
    let rule = /^[a-zA-Z]$/;

    if(!guess.match(rule)){
        alert("Input can only contain letters!");
        guess.focus();
        return false;
    }

    if(guessed.includes(guess)){
        alert("You already guessed this!")
        guess.focus();
    }

    else if(!guessed.includes(guess)){
        guessed.push(guess);
    }

    GameLoop(guess);
}

//processes correct input
function GameLoop(guess){

if(selectedWord.includes(guess)){

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] == guess) {
            hiddenWord[i] = guess;
        }}
    
        UpdateUI();
        gameStatus();
}

else if(!selectedWord.includes(guess)){

    PotatoStatus+=1;
    UpdateUI();

    if(PotatoStatus == 6){
        GameLose();
    }  
}
}

function gameStatus(){
    if(!hiddenWord.includes("_")){
        GameWin();
    }
}

function GameLose(){
    $("#word_input").val("");
    $('#Interface').hide()
    $('#End_Message').show();
    $('#End_Text').html('YOU KILLED Mr. POTATO!<br/>' + " The word was: " + selectedWord);
}

function GameWin(){
    $("#word_input").val("");
    $('#Interface').hide()
    $('#End_Message').show();
    $('#End_Text').html('YOU WIN!<br/>' + " You saved Mr. Potato");
}

function UpdateUI(){
    $('#Hidden_word').text(hiddenWord.join(" "));
    $("#pGuessed").text("Already Guessed: " + guessed.join(", "));
    $('#POT_IMG').attr("src", PotatoIMG[PotatoStatus]);
}


function reset(){
    $('#Interface').show();
    $('#End_Message').hide();
    PotatoStatus = 0;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = '_'.repeat(selectedWord.length).split('');
    guessed=[];
    UpdateUI();
}


$(document).ready(function() {

    $('#End_Message').hide();
    $('#Hidden_word').text(hiddenWord.join(" "));

    var full = false;

    $('#POT_IMG').hover(function() {

        if(full){
            return;
        }

        $('#POT_IMG').animate({ 
            width: $(window).width(),
            height: $(window).height()
            }, "slow")

            full = true;

    });

    $('#Shrink_Icon').click(function() {
        $('#POT_IMG').animate({ 
            width: "30vh", 
            height: "30vh" 
            }, "slow", 
            )

            full = false;
            
            
    });


    $("#Shrink_Icon").on("mouseenter", function () { 
        $('#Shrink_Icon').animate({ 
            width: "7vh", 
            height: "5vh" 
            }, "slow")
    });


    $("#Shrink_Icon").on("mouseleave", function () {
        $('#Shrink_Icon').animate({ 
            width: "5vh", 
            height: "3vh" 
            }, "slow")
    });


    $("#Save_Picture").click(function() {

        html2canvas(document.querySelector("#POT_IMG")).then(canvas => {
            let link = document.createElement('a')
            link.download = $('#POT_IMG').attr('src');
            link.href = canvas.toDataURL();
            link.click();
        })
    })
        
  
});

