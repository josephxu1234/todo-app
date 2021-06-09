import './Counter.css' 
import React, {useState} from 'react';

function Counter(props) {

    const [count, setCount] = useState(0);
    function increment(step) {
        setCount(count + step);
    }
    return (
        <div className = "counter">
            <div className = "set">
                <CounterButton by = {1} inc = {increment} />
                <CounterButton by = {-1} inc = {increment} />
            </div>

            <div className = "set">
                <CounterButton by = {5} inc = {increment} />
                <CounterButton by = {-5} inc = {increment} />
            </div>

            <div className = "set">
                <CounterButton by = {10} inc = {increment} />
                <CounterButton by = {-10} inc = {increment} />
            </div>

            <span className = "count">
                {count}
            </span>
            <div>
               <button onClick={() => setCount(0)}>
                    Reset
                </button>
            </div>
        </div>
    );
}

function CounterButton(props) {
    let by = props.by;
    const inc = () => {
        props.inc(by);
    }
    if (by >= 0){
        return (
        <div className="Counter">
          <button onClick = {inc}> +{by} </button>
         </div>
        );
    }
    return (
        <div className="Counter">
            <button onClick = {inc}> {by} </button>
        </div>
    );
  }

export default Counter;