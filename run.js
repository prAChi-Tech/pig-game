var gamePlaying, roundScore, scores, activePlayer;

init();


// ROLL A DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
   
    if(gamePlaying) {
        
        // HIDE ANY NOTICE
        document.querySelector('.play-notice-msg').textContent = '';
        
        // GENERATE A RANDOM DICE NUMBER
        dice = Math.floor((Math.random() * 6) + 1);
        console.log('dice = ' + dice);
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        document.querySelector('.dice').style.display = 'block';
        
        // ADD TO THE PLAYERS GRAND TOTAL
        var input = document.querySelector('.final-score').value;
        var finalScore;
        
        if(input) {
            finalScore = input;
        }
        else {
            finalScore = 100;
        }
        
        if(dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            // GET NEXT PLAYER   
            document.querySelector('.play-notice-msg').textContent = 'Oops! Player '+ (activePlayer+1) +' has hit ONE . Player changed.';
            nextPlayer();
        }
    }
    
});


// HOLD ON THE SCORE
document.querySelector('.btn-hold').addEventListener('click',function() {
    
    if(gamePlaying) {
        
        // ADD SCORE TO GLOBAL SCORE
        scores[activePlayer] += roundScore;
        
        var input = document.querySelector('.final-score').value;
        var finalScore;
        
        if(input) {
            finalScore = input;
        }
        else {
            finalScore = 100;
        }
        
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = '0';
        
        console.log(scores[activePlayer]);
        
        // CHECK FOR WINNER
        if(scores[activePlayer] >= finalScore) {
            
            gamePlaying = false;
            document.querySelector('.play-notice-msg').textContent = 'Congratulation Player ' + (activePlayer+1) + ' ! You have won the game.' ;
            
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';   
            document.querySelector('.dice').style.display = 'none';
        }
        else {
            // GET NEXT PLAYER
            document.querySelector('.play-notice-msg').textContent = 'Player '+ (activePlayer+1) +'\'s score is '+ scores[activePlayer]+'. Player changed.';
            nextPlayer();
        }
    }
    
});


// START A NEW GAME
document.querySelector('.btn-new').addEventListener('click',init);


// NEXT PLAYER
function nextPlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.dice').style.display = 'none';

}


// INITIALISE PIG GAME
function init() {
    
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    finalScore = 100;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.play-notice-msg').textContent = '';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
