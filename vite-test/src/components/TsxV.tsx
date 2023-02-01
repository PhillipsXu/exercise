import { defineComponent, ref } from "vue";

// 写法1：直接返回结构
// export default function() {
//     return (
//         <div>

//         </div>
//     )
// }

// 写法2：optionsAPI 不常用
// export default defineComponent({
//     data() {
//         return {
//             a: 1
//         }
//     },
//     render() {
//         return (
//             <div>
//                 <p>Tsx组件</p>
//                 <p>a:{this.a}</p>
//             </div>
//         )
//     }
// })

// 写法3：setup模式
// v-show 支持 v-if 不支持（使用三元表达式代替） tsx中ref包裹的数据需要.value手动解包
// v-for 不支持 用map代替
export default defineComponent({
    props: {
        info: String
    },
    emits: ['on-click'],
    setup(props, { emit }) {
        const data = [
            {
                id: 1,
                name: '01'
            },
            {
                id: 2,
                name: '02'
            },
            {
                id: 3,
                name: '03'
            }
        ]

        let flag = ref(true);
        function changeHandler() {
            flag.value = !flag.value;
            console.log(flag);
            emit('on-click', flag);
        }

        return () => (
            <div>
                <p>Tsx组件</p>
                {
                    flag.value === true ? <p>true</p> : <p>false</p>
                }
                <button onClick={changeHandler}>change</button>
                <ul>
                    {
                        data.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul>
                <p>props: info: {props.info}</p>
            </div>
        )
    }
})

