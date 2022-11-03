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
        this.head.style.left = val + 'px';
        this.moveBody();
        if (val < 0 || val > 290) {
            throw ('YOU ARE DEAD!')
        }
    }

    set Y(val: number) {
        if (this.Y === val) return;
        this.head.style.top = val + 'px';
        this.moveBody();
        if (val < 0 || val > 290) {
            throw ('YOU ARE DEAD!')
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
}

export default Snake;