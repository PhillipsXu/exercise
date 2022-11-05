import getPosition from './getPosition';

class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('food')!; // !表示不会为空
    }

    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    set X(val) {
        this.element.style.left = val + 'px';
    }

    set Y(val) {
        this.element.style.top = val + 'px';
    }

    change() {
        this.element.style.left = getPosition() + 'px';
        this.element.style.top = getPosition() + 'px';
    }
}

export default Food;