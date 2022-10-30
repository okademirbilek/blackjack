let player = {
    name: "Berkay ",
    chips: 10000
}


// function playerInfo(){
//     var userName = document.getElementById("Username")
//     var cash= document.getElementById("Credit") 
//     player.name =userName.value
//     player.chips=cash.value  
//     console.log(player.name) 
//     console.log(player.chips)
// }





let cards = []
let dealercards=[]
let sum = 0
let sum2=0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")


let cardsEl = document.getElementById("cards-el")

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name+": $" + player.chips


let dealerCards = document.getElementById("dealer-cards")
let dealerSum = document.getElementById("dealer-sum")





let dealerEl= document.getElementById("dealer-el")

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()

    let dFirstCard= getRandomCard()
    let dSecondCard= getRandomCard()
    cards = [firstCard, secondCard]
    dealercards=[ dFirstCard,dSecondCard]
    sum = firstCard + secondCard
    sum2=dFirstCard+dSecondCard
    dealerCards.textContent +=dealercards[0]
    renderGame()
}





function dealerIngame(){
    //console.log(dealercards)
    dealerCards.textContent= "Cards: "
    dealerSum.textContent = "Sum: " + sum2
    for (let i = 0; i < dealercards.length; i++) {
        dealerCards.textContent += dealercards[i] + " "

    }
    
}


function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
        
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        dealerEl.textContent = "dealer lost"
        dealerIngame()
        hasBlackJack = true
        isAlive=false
    } else {
        message = "You're out of the game!"
        dealerEl.textContent = "dealer won the game"
        dealerIngame()
        isAlive = false
    }
    messageEl.textContent = message
}



function hold(){
    if(isAlive === true){
        dealerCards.textContent ="Cards: "+dealercards[0]+" "+dealercards[1]
        dealerSum.textContent = "Sum: " + sum2
        if (sum2 <= 20) {
            if(sum2<sum){
                console.log("im here")
                isAlive=true
                newCard2()
            }else{
                isAlive = false
                message="dealer won the game" 
                messageEl.textContent = "you lost"
                dealerIngame()
            } 
            
        } else if (sum2 === 21) {
            message = "Dealer got Blackjack!"
            messageEl.textContent = "you lost"
            dealerIngame()
            hasBlackJack = true
            isAlive=false
        } else {
            message = "Dealer Busted!"
            messageEl.textContent = "you won"
            dealerIngame()
            isAlive = false
        }
        dealerEl.textContent = message
    }

}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}




function newCard2() {
    if (isAlive === true && hasBlackJack === false) {
        let card2 = getRandomCard()
        sum2 += card2
        dealercards.push(card2)
        hold()        
    }  
}