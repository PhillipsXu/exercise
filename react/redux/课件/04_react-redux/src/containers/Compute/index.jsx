import ComputeUI from '../../components/Compute';
import { connect } from 'react-redux';
import {
    incrementAction,
    decrementAction,
    incrementAsyncAction
} from '../../redux/action';

// 用于传递状态 接收state状态
function mapStateToProps(state) {
    return { number: state }
}
// 用于传递方法 接收dispatch方法
function mapDispatchToProps(dispatch) {
    return {
        increment: data => dispatch(incrementAction(data)),
        decrement: data => dispatch(decrementAction(data)),
        incrementAsync: (data, time = 1000) => dispatch(incrementAsyncAction(data, time))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ComputeUI);