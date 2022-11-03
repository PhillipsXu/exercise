import count from './js/count';
import sum from './js/sum';
import { mul } from './js/math';
import demo from './ts/demo'

import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
import './css/iconfont.css';

console.log(count(2, 10));
console.log(sum(10, 10));
console.log(mul(3, 3));
console.log(demo(9, 3));

if(module.hot) {
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");
}