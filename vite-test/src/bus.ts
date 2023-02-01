// 自定义事件总线
type busClass = {
    emit: (name: string) => void,
    on: (name: string, cb: Function) => void
}

type pramsKey = string | number | symbol;

type list = {
    [key: pramsKey]: Array<Function>
}

class bus implements busClass {
    public list: list;

    constructor() {
        this.list = {};
    }

    emit(name: string, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name];
        eventName.forEach(fn => {
            fn.apply(this, args);
        })
    }

    on(name: string, cb: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(cb);
        this.list[name] = fn;
    }
}

export default new bus();