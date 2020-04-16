var watchwordsArray = new Array(10);


var watchwordString = "";
var watchwordToDraw = "";
var mistakeCounter = 0;


window.onload = start;

function start()
{
    loadWatchwords();
    getRandomWatchword();
    createWatchwordToDraw();
    showWatchword();
    generateKeyboard();

}

function loadWatchwords()
{
    watchwordsArray[0] = "predkosc maksymalna";
    watchwordsArray[1] = "moc znamionowa";
    watchwordsArray[2] = "programowanie funkcyjne";
    watchwordsArray[3] = "fortuna kolem sie toczy";
    watchwordsArray[4] = "nie chwal dnia przed zachodem slonca";
    watchwordsArray[5] = "apetyt rosnie w miare jedzenia";
    watchwordsArray[6] = "co ma wisiec nie utonie";
    watchwordsArray[7] = "dzieci i ryby glosu nie maja";
    watchwordsArray[8] = "grosz do grosza a bedzie kokosza";
    watchwordsArray[9] = "szukanie igly w stogu siana";

}

function createWatchwordToDraw(){
    for(i = 0; i < watchwordString.length; i++) 
    {
        if(watchwordString.charAt(i) != " ") watchwordToDraw += "_";
        else watchwordToDraw += " ";
    }
};

function getRandomWatchword()
{
    watchwordString = watchwordsArray[Math.floor(Math.random()*10)];
}

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
