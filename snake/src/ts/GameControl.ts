import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl {
    food: Food;
    scorepanel: ScorePanel;
    snake: Snake;
    direction: string = '';
    isLive: boolean = true;

    constructor() {
        this.food = new Food();
        this.scorepanel = new ScorePanel(10, 1);
        this.snake = new Snake();
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.startHandler.bind(this));
        this.run();
    }

    startHandler(e: KeyboardEvent) {
        this.direction = e.key;
    }

    run() {
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                x -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                x += 10;
                break;
        }

        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (error: unknown) {
            alert(error);
            this.isLive = false;
        }

        this.checkFood();

        this.isLive && setTimeout(this.run.bind(this), 30 * (this.scorepanel.maxLevel + 1 - this.scorepanel.level));
    }

    checkFood() {
        if (this.snake.X === this.food.X && this.snake.Y === this.food.Y) {
            console.log('GET FOOD!');
            this.food.change();
            this.scorepanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;