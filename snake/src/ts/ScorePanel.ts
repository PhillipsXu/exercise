class ScorePanel {
    score: number = 0;
    level: number = 1;
    scoreSpan: HTMLElement;
    levelSpan: HTMLElement;
    maxLevel: number;
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreSpan = document.getElementById('score')!;
        this.levelSpan = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.score++;
        this.scoreSpan.innerHTML = this.score + '';
        if (this.score % this.upScore === 0) {
            this.addLevel();
        }
    }

    addLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelSpan.innerHTML = this.level + '';
        }
    }
}
export default ScorePanel;