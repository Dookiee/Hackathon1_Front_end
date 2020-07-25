var update_score = () => {
    if (localStorage['result'] == ""){
        document.getElementById('result').innerText = "You WON!!!"
        if(localStorage['score'] == undefined){
            score_data = 100-Number(localStorage['mistakes']*10)
            document.getElementById('score_card').innerText = "Your Score is :"+score_data
            localStorage.setItem('score',score_data)
        }else{
            localStorage.setItem('score', Number(localStorage['score'])+Number(100-Number(localStorage['mistakes']*10)))
            document.getElementById('score_card').innerText = "Your Score is :"+localStorage['score']
        }
    document.getElementById('handleGif').setAttribute("src", "./images/success.gif")
    }else{
        localStorage.setItem('life',Number(localStorage['life'])-1)
        document.getElementById('result').innerText = "You Lost!!! You have still "+localStorage['life']+" lives"
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