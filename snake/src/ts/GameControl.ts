import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
import getPosition from './getPosition';

class GameControl {
    food: Food;
    scorepanel: ScorePanel;
    snake: Snake;
    direction: string = '';
    isLive: boolean = true;
    dis: HTMLElement;

    constructor() {
        this.food = new Food();
        this.scorepanel = new ScorePanel(10, 2);
        this.snake = new Snake();
        this.dis = document.querySelector('#disruption')!;
        this.init();
    }

    init() {
        document.addEventListener('keydown', this.startHandler.bind(this));
        this.snake.X = getPosition();
        this.snake.Y = getPosition();
        this.food.X = getPosition();
        this.food.Y = getPosition();
        this.run();
    }

    startHandler(e: KeyboardEvent) {
        this.direction = e.key;
        this.dis.innerText = '';
    }

    run() {
        let x = this.snake.X;
        let y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10;
                this.snake.changeHead(this.direction);
                break;
            case 'ArrowDown':
            case 'Down':
                y += 10;
                this.snake.changeHead(this.direction);
                break;
            case 'ArrowLeft':
            case 'Left':
                x -= 10;
                this.snake.changeHead(this.direction);
                break;
            case 'ArrowRight':
            case 'Right':
                x += 10;
                this.snake.changeHead(this.direction);
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

        if (this.scorepanel.level === this.scorepanel.maxLevel) {
            throw alert('YOU ARE WIN! 请刷新页面...');
        }

        this.isLive && setTimeout(this.run.bind(this), 15 * (this.scorepanel.maxLevel + 1 - this.scorepanel.level) + 100);
    }

    checkFood() {
        if (this.snake.X === this.food.X && this.snake.Y === this.food.Y) {
            console.log('GET FOOD!');
            this.snake.addBody();
            this.food.change();
            this.scorepanel.addScore();
        }
    }
}

export default GameControl;