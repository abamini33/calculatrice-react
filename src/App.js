import React, { useReducer } from "react";
import "./App.css";

const initialState = {
    num1: "",
    num2: "",
    result: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NUM1":
            return { ...state, num1: action.payload };
        case "SET_NUM2":
            return { ...state, num2: action.payload };
        case "ADD":
            return {
                ...state,
                result: parseFloat(state.num1) + parseFloat(state.num2),
            };
        case "MULTIPLY":
            return {
                ...state,
                result: parseFloat(state.num1) * parseFloat(state.num2),
            };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addition = () => {
        dispatch({ type: "ADD" });
    };

    const multiplication = () => {
        dispatch({ type: "MULTIPLY" });
    };

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div className="calculator">
            <div>
                <label>Num 1 : </label>
                <input
                    type="text"
                    value={state.num1}
                    onChange={(e) =>
                        dispatch({ type: "SET_NUM1", payload: e.target.value })
                    }
                />
                <label> Num 2 : </label>
                <input
                    type="text"
                    value={state.num2}
                    onChange={(e) =>
                        dispatch({ type: "SET_NUM2", payload: e.target.value })
                    }
                />
            </div>
            <div className="result">
                <label>Resultat : </label>
                <span>{state.result}</span>
            </div>
            <div className="buttons">
                <button onClick={addition}>+</button>
                <button onClick={multiplication}>x</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default App;
