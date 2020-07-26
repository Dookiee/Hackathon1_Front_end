var update_score = () => {
    if (localStorage['result'] == ""){
        new Audio('./sounds/level-cleared.mp3').play();
        document.getElementById('correct_ans').remove();
        calc_score();
        document.getElementById('score_card').innerText = "Your Score is :"+localStorage['score'];
        document.getElementById('level_information').innerText = "You Cleared Level "+localStorage['level'];
        level_update();
    }else{
        new Audio('./sounds/level-fail.mp3').play();
        document.getElementById('level_information').innerText = "You Did Not Cleared Level "+localStorage['level']
        document.getElementById('correct_ans').innerText = "Correct Answer is: "+localStorage['result']
        document.getElementById('score_card').innerText = "Your Score is "+localStorage['score']
    }
    calc_life();
    update_message();
    update_gif();
    localStorage.removeItem("result"); 
    if(localStorage['life'] == 0){
        document.getElementById('continue').innerText = "New Game";
        document.getElementById('quit').disabled = true;
    }
}

var continue_game = () => {
    window.location = './index.html'
}

var quit_game = () => {
    window.location = './index.html'
    localStorage.clear();
}

var calc_score = () => {
    if(localStorage['score'] == undefined){
        localStorage.setItem('score',100-Number(localStorage['mistakes']*10))
    }else{
        localStorage.setItem('score', Number(localStorage['score'])+Number(100-Number(localStorage['mistakes']*10)))
    }
}

var level_update = () => {
    localStorage.setItem('level', Number(localStorage['level'])+1)
}

var update_gif = () => {
    if(localStorage['result'] == ""){
        document.getElementById('handleGif').setAttribute("src", "./images/success.gif");
    }else{
        document.getElementById('handleGif').setAttribute("src", "./images/failure.gif")
    }
}

var calc_life = () => {
    if (localStorage['result'] != ""){
        localStorage.setItem('life',Number(localStorage['life'])-1)
    }
}

var update_message = () => {
    if(localStorage['result'] != ""){
        if(localStorage['life'] == 0){
            document.getElementById('result').innerText = "You Lost!!! You have still "+localStorage['life']+" lives"+", Better Luck next time!"
        }else{
            document.getElementById('result').innerText = "You Lost!!! You have still "+localStorage['life']+" lives"+", Keep the spirit up and Play!"
        }
    }else{
        document.getElementById('result').innerText = "You WON!!! Hurrah!!!!";
    }

}