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

    change() {
        this.element.style.left = Math.round(Math.random() * 28) * 10 + 'px';
        this.element.style.top = Math.round(Math.random() * 28) * 10 + 'px';
    }
}

export default Food;