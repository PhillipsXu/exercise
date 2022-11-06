class Snake {
    element: HTMLElement;
    head: HTMLElement;
    bodies: HTMLCollection;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(val: number) {
        if (this.X === val) return;
        if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetLeft === val) {
            if (val > this.X) {
                val = this.X - 10;
            } else {
                val = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = val + 'px';
        this.checkHead();
        if (val < 0 || val > 290) {
            throw ('YOU ARE DEAD!')
        }
    }

    set Y(val: number) {
        if (this.Y === val) return;
        if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetTop === val) {
            if (val > this.Y) {
                val = this.Y - 10;
            } else {
                val = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = val + 'px';
        this.checkHead();
        if (val < 0 || val > 290) {
            throw ('YOU ARE DEAD! 请刷新页面...')
        }
    }

    addBody() {
        // const div = document.createElement('div');
        // this.element.appendChild(div);
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let x = (<HTMLElement>this.bodies[i - 1]).offsetLeft;
            let y = (<HTMLElement>this.bodies[i - 1]).offsetTop;
            (<HTMLElement>this.bodies[i]).style.left = x + 'px';
            (<HTMLElement>this.bodies[i]).style.top = y + 'px';
        }
    }

    checkHead() {
        for (let i = 1; i < this.bodies.length - 1; i++) {
            let body = (<HTMLElement>this.bodies[i])
            if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
                throw ('GAME OVER! 请刷新页面...')
            }
        }
    }

    changeHead(direction: string) {
        switch (direction) {
            case 'ArrowUp':
            case 'Up':
                this.head.style.transform = 'rotate(-90deg)';
                break;
            case 'ArrowDown':
            case 'Down':
                this.head.style.transform = 'rotate(90deg)';
                break;
            case 'ArrowLeft':
            case 'Left':
                this.head.style.transform = 'rotate(180deg)';
                break;
            case 'ArrowRight':
            case 'Right':
                this.head.style.transform = 'rotate(0)';
                break;
        }
    }
}

export default Snake;