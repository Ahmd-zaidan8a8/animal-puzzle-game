

class Score {
    constructor(){
        this.pointsContainer = document.createElement('div');
        this.pointsContainer.id = 'points-container';

        document.getElementById('grid').appendChild(this.pointsContainer);
        this.score = 0;
    }

    displayScore(){
        this.pointsContainer.innerHTML = `${this.score}`;
    }

    updateScore(){
        this.score++;
    }

}

export default Score;