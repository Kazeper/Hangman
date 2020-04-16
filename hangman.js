var watchwordString = "bez pracy nie ma kasy";
var watchwordToDraw = "";
var mistakeCounter = 0;


window.onload = start;

function start()
{
    createWatchwordToDraw();
    showWatchword();
    generateKeyboard();

}

function createWatchwordToDraw(){
    for(i = 0; i < watchwordString.length; i++) 
    {
        if(watchwordString.charAt(i) != " ") watchwordToDraw += "_";
        else watchwordToDraw += " ";
    }
};

function showWatchword()
{
    document.getElementById("watchword").innerHTML = watchwordToDraw;
}

function generateKeyboard(){
    let divContent ="";
    
    for(i = 1; i < 27; i++){
        var letter =  String.fromCharCode(64 + i);
        let letterASCII = 64+i;
        let element = "letter" + letterASCII;
        divContent += '<div class="letter" id="' + element + '" onclick="findLetter('+letterASCII+');">' + letter + '</div>';
        if(i%7 == 0) divContent += '<div style="clear:both;"></div>';
    }
    document.getElementById("keyboard").innerHTML = divContent;
}

String.prototype.changeLetter = function(index, letter)
{
    if(index >this.length - 1) return this.toString();
    else return this.substr(0, index) + letter + this.substr(index+1);

}

function findLetter(letterASCII)
{
    var isInWatchword = false;
    let letter = String.fromCharCode(letterASCII).toLowerCase();
    var element;
    for(i = 0; i < watchwordString.length; i++) 
    {
        if(watchwordString.charAt(i) == letter)
        {
            watchwordToDraw = watchwordToDraw.changeLetter(i, letter);
            isInWatchword = true;
        }
    } 
    
    if(isInWatchword)
    {
        showWatchword();
    }
    changeColor(isInWatchword, letterASCII);
}

function changeColor(isGoodLetter, element)
{
    if(isGoodLetter)
    {
        document.getElementById("letter" + element).style.background = "#003300";
        document.getElementById("letter" + element).style.border = "3px solid #00C000";
        document.getElementById("letter" + element).style.cursor = "default";
        document.getElementById("letter" + element).setAttribute("onclick", ";");
        if(watchwordToDraw == watchwordString) 
        {
            document.getElementById("gallows").innerHTML = "WIN!";
            disableKeyboard();
        }
    }
    else
    {
        document.getElementById("letter" + element).style.background = "#500000";
        document.getElementById("letter" + element).style.border = "3px solid #c00000";
        document.getElementById("letter" + element).style.cursor = "default";
        document.getElementById("letter" + element).setAttribute("onclick", ";");

        mistakeCounter++;
        if(mistakeCounter < 10) updatePicture();
        else document.getElementById("gallows").innerHTML = "GAME OVER";
    }
}

function updatePicture()
{
    document.getElementById("gallows").innerHTML = '<img src="img/s' + mistakeCounter +'.jpg" alt=""/>';
}

function disableKeyboard()
{
    for(i = 1; i < 27; i++){
        let letterASCII = 64+i;
        let element = "letter" + letterASCII;
        
        document.getElementById(element).setAttribute("onclick", ";");
    }
}
