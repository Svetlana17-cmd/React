
import { useDispatch, useSelector } from "react-redux";
import { good, ok, bad, reset } from './reducers/reducer'

const App = () => {
  const dispatch = useDispatch();
  const { good: g, ok: o, bad: b } = useSelector((state) => state);

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => dispatch(good())}>good</button>
      <button onClick={() => dispatch(ok())}>ok</button>
      <button onClick={() => dispatch(bad())}>bad</button>
      <button onClick={() => dispatch(rest())}>reset stats</button>

      <h2>Statistics</h2>
      <div>good: {g}</div>
      <div>ok: {o}</div>
      <div>bad: {b}</div>
    </div>
  );
};

export default App;
