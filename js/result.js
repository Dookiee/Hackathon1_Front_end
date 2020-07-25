var update_score = () => {
    if (localStorage['result'] == ""){
        document.getElementById('result').innerText = "You WON!!! Hurrah!!!!"
        if(localStorage['score'] == undefined){
            score_data = 100-Number(localStorage['mistakes']*10)
            document.getElementById('score_card').innerText = "Your Score is :"+score_data
            localStorage.setItem('score',score_data)
        }else{
            localStorage.setItem('score', Number(localStorage['score'])+Number(100-Number(localStorage['mistakes']*10)))
            document.getElementById('score_card').innerText = "Your Score is :"+localStorage['score']
        }
    document.getElementById('level_information').innerText = "You Cleared Level "+localStorage['level']
    localStorage.setItem('level', Number(localStorage['level'])+1)
    document.getElementById('handleGif').setAttribute("src", "./images/success.gif")
    }else{
        document.getElementById('level_information').innerText = "You Did Not Cleared Level "+localStorage['level']
        localStorage.setItem('life',Number(localStorage['life'])-1)
        if(localStorage['life'] == 0){
            document.getElementById('result').innerText = "You Lost!!! You have still "+localStorage['life']+" lives"+", Better Luck next time!"
        }else{
            document.getElementById('result').innerText = "You Lost!!! You have still "+localStorage['life']+" lives"+", Keep the sprit up and Play!"
        }
        document.getElementById('score_card').innerText = "Your Score is "+localStorage['score']
        document.getElementById('handleGif').setAttribute("src", "./images/failure.gif")
    }
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