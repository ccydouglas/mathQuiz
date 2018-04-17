// Kirill Sakovich
$('document').ready(function(){});

/**
 * Consructor for player (and computer) major stuff like heltpoint and how much ponts to substact
 * @param {*} healthPoints  at the beggining  every player gets 100 HP
 * @param {*} pointsToSubstract each player when was hit by the opponent loses 20 HP
 */
    function FighterStatement(healthPoints, pointsToSubstract)
        {
            this.healthPoints = healthPoints;
            this.pointsToSubstract = pointsToSubstract;
            this.updateHealthPoints = function()
            {
                this.healthPoints -= pointsToSubstract;
            }
            this.setHealthPoints = function(newHealthPoints)
            {
                this.healthPoints = newHealthPoints;
            }
            this.setPointsToSubsract = function(newPointsToSubstract)
            {
                this.pointsToSubstract = newPointsToSubstract;
            }
        }
/** 
 * Function generates  random number that will be used as computer's choice
 * @returns random number
*/
    function getRandomNum()
    {
        var randomNum = Math.floor(Math.random() * 4);
        // console.log("random num is " + randomNum);
        return randomNum;
    }
    /**
     * This function assignes modyfies received number to the choice which part to block for computer
     * @param {*} blockNum received as random number
     * @returns {*}compBlockChoice
     */
    function getCompBlock(blockNum)
        {
        var compBlockChoice = 0;
           switch(blockNum)
           {
                case 0:
                    compBlockChoice = "Head";
                    break;
                case 1:
                    compBlockChoice = "Chest";
                    break;
                case 2:
                    compBlockChoice = "Hip";
                    break;
                case 3:
                    compBlockChoice = "Feet";
                    break;
                default:
                    compBlockChoice = "Head";
           }
           
           return compBlockChoice;
        }
    /**
     * This function assignes modyfies received number to the choice which part to attack for computer
     * @param {*} attackNum received as random number
     * @returns {*} compAttackChoice
     */
        function getCompAttack(attackNum)
        {
            var compAttackChoice = 0;
            switch(attackNum)
           {
                case 0:
                    compAttackChoice  = "Head";
                    break;
                case 1:
                    compAttackChoice  = "Chest";
                    break;
                case 2:
                    compAttackChoice  = "Hip";
                    break;
                case 3:
                    compAttackChoice = "Feet";
                    break;
                default:
                    compAttackChoice  = "Head";
           }
          
           return compAttackChoice;
        }
/**
 * Function checks which radio button is checked an gets value of that
 * @param {*} form 
 * @param {*} name 
 * @returns {*} playerAttackChoice 
 */
        function playerAttack(form, name)
        {
            var playerAttackChoice;
            // get list of radio buttons with specified name
            var radios = form.elements[name];
        
            // loop through list of radio buttons
            for (var i=0, len=radios.length; i<len; i++) 
            {
                if ( radios[i].checked ) // radio checked?
                { 
                    playerAttackChoice = radios[i].value; // if so, hold its value in val
                    break; // and break out of for loop
                }
            }
            
            return playerAttackChoice; // return value of checked radio 
        }
/**
 * Function checks which radio button is checked an gets value of that
 * @param {*} form 
 * @param {*} name 
 * @returns {*} playerBlockChoice
 */
        function playerBlock(form, name)
        {
            var playerBlockChoice;
            // get list of radio buttons with specified name
            var radios = form.elements[name];
        
            // loop through list of radio buttons
            for (var i=0, len=radios.length; i<len; i++) 
            {
                if ( radios[i].checked ) // radio checked?
                { 
                    playerBlockChoice = radios[i].value; // if so, hold its value in val
                    break; // and break out of for loop
                }
            }
            
            return playerBlockChoice // return value of checked radio 
        }
        /**
         * Function reset plyer's and computer's healthpoint
         * writes in <p> actual Healtpoints
         * stops all animation for computer defence & attack icons and 
         * @param {*} playerState 
         * @param {*} computerState 
         */
        function resetPoints(playerState, computerState)
        {
            playerState.setHealthPoints(100);
            computerState.setHealthPoints(100);
            compHpMove(computerState);
            playerHpMove(playerState);
            $("#compHealthP").html(computerState.healthPoints + " HP");
            $("#playerHealthP").html(playerState.healthPoints + " HP");
            $('li').stop(true, true);
            $('li').addClass('invisible');  
        }
        /**
         * Function verifyes how the game ended - player win,player lost or Tie, 
         * and based on that show appropriate picture to the player
         * and add in myConsole prints updates
         * then calls resetPoints function
         * @param {*} compHP statement of computer's healtponts
         * @param {*} playerHP statement of player's healtponts
         */
        function gameOver(compHP, playerHP)
        {
            console.log("GAME OVER");
            document.getElementById("myConsole").innerHTML += "GAME OVER" + "<br>";
            // if Computer and player have 0 HP it's Tie
            if ((compHP === 0) && (playerHP === 0))
            {
                console.log("Computer and player are TIE!"); 
                document.getElementById("myConsole").innerHTML += "Computer and player are TIE!"+ "<br>";
                $("#tie").removeClass("invisible");
                $("#tie").fadeOut(10000, function(){
                    $("#tie").addClass('invisible'); 
                }).fadeIn(10000);
            }
            // if Computer has 0 HP and player has more than 0
            // player win
            else if((compHP === 0) && (playerHP !== 0))
            {
                console.log("PLAYER WIN!");
                document.getElementById("myConsole").innerHTML += "PLAYER WIN!"  + "<br>";
                $("#winner").removeClass("invisible");
                $("#winner").fadeOut(10000, function(){
                    $("#winner").addClass('invisible'); //or any other class
                }).fadeIn(10000);
            }
            // if player has 0 HP and computer has more than 0
            // computer win
            else if((playerHP === 0) && (compHP !== 0))
            {
                console.log("COMPUTER WIN!");
                document.getElementById("myConsole").innerHTML += "COMPUTER WIN!" + "<br>";
                $("#gameOver").removeClass("invisible");
                $("#gameOver").fadeOut(10000, function(){
                $("#gameOver").addClass('invisible'); //or any other class
                }).fadeIn(10000);
            }
            // call resetPoints functuon afterall
            resetPoints(playerState, computerState);
        }
       // Create oblects from constructor
        var computerState = new FighterStatement(100, 20);
        var playerState = new FighterStatement(100, 20);
        $("#compHealthP").html(computerState.healthPoints + " HP");
        $("#playerHealthP").html(playerState.healthPoints + " HP");

        /**
         * Changes progress bar of the player's hp
         * @param {*} playerState as a argument
         */
        function playerHpMove(playerState) {
            $( function() {
                $( "#currentPlayerHP" ).progressbar({
                  value: playerState.healthPoints, create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'green'})}
                });
              } );
          }
          /**
           * Changes progress bar of the computer's's hp
           * @param {*} computerState as a argument
           */
          function compHpMove(computerState) {
            $( function() {
                $( "#currentCompHP" ).progressbar({
                  value: computerState.healthPoints, create: function(event, ui) {$(this).find('.ui-widget-header').css({'background-color':'green'})}
                });
            } );
          }
          // assign hp to the progress bar
        playerHpMove(playerState);
        compHpMove(computerState);

        /**
         * Main function that called when user clicks "Fight" button
         * Puts together all other parts of the game
         * Mathches computer's block choice with player's attack choice
         * prints result in myConsole 
         * shows tha animation 
         * and updates heltpoints
         * @param {*} playerObject 
         * @param {*} computerObject 
         */
        function fight(playerObject, computerObject)
        {
            var playerAttackChoice = playerAttack( document.getElementById("attackSection"), "toAttack");
            var playerBlockChoice = playerBlock( document.getElementById("blockSection"), "toBlock");
            var compAttackChoice = getCompBlock(getRandomNum());
            var compBlockChoice = getCompAttack(getRandomNum());
            var playerStuckedAttack = "";
            var compStuckedAttack = "";
            var compIconProtection = "";
            var compIconAttack = "";

            $('img').stop(true, true);
            $('li').stop(true, true);
            $('li').addClass('invisible'); 

            console.log("player attacks " + playerAttackChoice + " and computer blocks " + compBlockChoice );
            console.log("computer attacks " + compAttackChoice + " and player blocks " + playerBlockChoice );
            document.getElementById("myConsole").innerHTML += "player attacks " + playerAttackChoice + " and computer blocks " + compBlockChoice  + "<br>";
            document.getElementById("myConsole").innerHTML += "computer attacks " + compAttackChoice + " and player blocks " + playerBlockChoice  + "<br>";
            // if computer blocks player's attack
            if (playerAttackChoice == compBlockChoice)
            {
                console.log("computer blocked player's attack. Computer does not loose health points");
                console.log ("computer's healthpoints left " + computerState.healthPoints);
                document.getElementById("myConsole").innerHTML += "computer blocked player's attack. Computer does not loose health points" + "<br>";
                document.getElementById("myConsole").innerHTML += "computer's healthpoints left " + computerState.healthPoints + "<br>";
                playerStuckedAttack = "#stuckedIn"+playerAttackChoice;
                $(playerStuckedAttack).removeClass("invisible",1000);
            }
            //if computer  doesn't block player's attack
            else
            {
                console.log ("computer looses " + computerState.pointsToSubstract + " health points");
                document.getElementById("myConsole").innerHTML += "computer looses " + computerState.pointsToSubstract + " health points"  + "<br>";
                computerState.updateHealthPoints();
                console.log ("computer's healthpoints left " + computerState.healthPoints);
                document.getElementById("myConsole").innerHTML += "computer's healthpoints left " + computerState.healthPoints  + "<br>";
                $("#compHealthP").html(computerState.healthPoints + " HP");
                compHpMove(computerState);
            }
            // if player blocks comps's attack
            if (compAttackChoice == playerBlockChoice)
            {
                console.log("player blocked computer's attack. Player does not loose health points");
                document.getElementById("myConsole").innerHTML += "player blocked computer's attack. Player does not loose health points" + "<br>";
                console.log ("player's healthpoints left " + playerState.healthPoints);
                document.getElementById("myConsole").innerHTML += "player's healthpoints left " + playerState.healthPoints + "<br>";
                compStuckedAttack = "#stuckedIn"+compAttackChoice;
                $(compStuckedAttack).removeClass("invisible", 500);
            }
            //if player doesn't block comp's attack
            else
            {
                console.log ("player looses " + playerState.pointsToSubstract + " health points");
                document.getElementById("myConsole").innerHTML += "player looses " + playerState.pointsToSubstract + " health points"  + "<br>";
                playerState.updateHealthPoints();
                console.log ("player's healthpoints left " + playerState.healthPoints);
                document.getElementById("myConsole").innerHTML += "player's healthpoints left " + playerState.healthPoints  + "<br>";
                $("#playerHealthP").html(playerState.healthPoints + " HP");
                playerHpMove(playerState);

               
            }
            // check if at least one player has 0 HP
            if((computerState.healthPoints === 0) || (playerState.healthPoints === 0))
            {
                gameOver(computerState.healthPoints, playerState.healthPoints);
                // return;
            }
            
            // Animation happens here
            compIconProtection = "#protected"+compBlockChoice;
            $(compIconProtection).removeClass("invisible");
            $(compIconProtection).fadeOut(1000, function(){
                $(compIconProtection).addClass('invisible'); //or any other class
            }).fadeIn(3000);
           
            compIconAttack = "#attacked"+compAttackChoice;
            $(compIconAttack).removeClass("invisible");
            $(compIconAttack).fadeOut(1000, function(){
                $(compIconAttack).addClass('invisible'); //or any other class
            }).fadeIn(3000);

            console.log ("============ Next round ============");
            document.getElementById("myConsole").innerHTML += "<br>"+ "============ Next round ============"  + "<br>";
            // $('#myConsole').scroll( $('#myConsole') );
            
            $(playerStuckedAttack).fadeOut(1000, function(){
                    $(playerStuckedAttack).addClass('invisible'); //or any other class
                }).fadeIn(3000);
                
                $(compStuckedAttack).fadeOut(3000, function(){
                    $(compStuckedAttack).addClass('invisible'); //or any other class
                }).fadeIn(3000);
            
        }
    /* Test cases
case #1
TRIED to make a differnt choice for the radio-button
EXPECTED the choice will be changed
RESULT WAS the radio button changed

case #2
TRIED to make choice an hit FIGHT button
EXPECTED the game will start and player's or / and computer's HP will be changed, also expexted animation to show
RESULT WAS the game started and player's or / and computer's HP changed be changed, also  animation started to show

case #3
TRIED lose the game for a player 
EXPECTED to see "game over" image  when player has 0 HP and computer has more
RESULT WAS saw "game over" image  when player had 0 HP and computer had more


case #4
TRIED win the game for a player 
EXPECTED  see "Winner" image  when comp has 0 HP and player has more
RESULT WAS saw "Winner" image  when comp had 0 HP and player had more

case #4
TRIED to make tie for the game by ending 0 HP for player and 0 hp for computer
EXPECTED to see "TIE" image  when comp has 0 HP and player has 0 HP
RESULT WAS saw "TIE" image  when comp has 0 HP and player has 0 HP

case #5
TRIED to hit FIGHT button after finishing the game 
EXPECTED to dissapear Tie/ Game over / Winner image after click button
RESULT WAS dissapeared Tie/ Game over / Winner image after click button

case #6
TRIED to finish the game
EXPECTED HP will be restarted
RESULT WAS hp restarted

case #7
TRIED to play the game
EXPECTED HP will be changing during the game
RESULT WAS hp are changing during the game

case #8
TRIED to play the game
EXPECTED HP will  not be changing when block choice of the one player  equals attack choice of another
RESULT WAS HP are not  changing when block choice of the one player  equals attack choice of another

case #9
TRIED to play the game
EXPECTED HP will be shown correctly
RESULT WAS HP are shown correctly

case #10
TRIED to play the game
EXPECTED all results are written down in a mini-console version
RESULT WAS all results are written down in a mini-console version

     */