import React, { useReducer } from "react";
import "./App.css";

const initialState = {
    display: "0",
    num1: "",
    num2: "",
    operator: "",
    result: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DISPLAY":
            return { ...state, display: action.payload };
        case "SET_NUM1":
            return {
                ...state,
                num1: state.num1 + action.payload,
                display: state.num1 + action.payload,
            };
        case "SET_NUM2":
            return {
                ...state,
                num2: state.num2 + action.payload,
                display: state.num2 + action.payload,
            };
        case "SET_OPERATOR":
            return {
                ...state,
                operator: action.payload,
                display: state.display + " " + action.payload + " ",
            };
        case "CLEAR":
            return initialState;
        case "CALCULATE":
            let result;
            switch (state.operator) {
                case "+":
                    result = parseFloat(state.num1) + parseFloat(state.num2);
                    break;
                case "-":
                    result = parseFloat(state.num1) - parseFloat(state.num2);
                    break;
                case "*":
                    result = parseFloat(state.num1) * parseFloat(state.num2);
                    break;
                default:
                    result = "";
            }
            return { ...state, result: result, display: result };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const numberClick = (number) => {
        if (state.operator === "") {
            dispatch({ type: "SET_NUM1", payload: number });
        } else {
            dispatch({ type: "SET_NUM2", payload: number });
        }
    };

    const operatorClick = (operator) => {
        if (state.num1 !== "") {
            dispatch({ type: "SET_OPERATOR", payload: operator });
        }
    };

    const equalClick = () => {
        if (state.num2 !== "") {
            dispatch({ type: "CALCULATE" });
        }
    };

    const reset = () => {
        dispatch({ type: "CLEAR" });
    };

    return (
        <div className="calculator">
            <div className="display">{state.display}</div>
            <div className="buttons">
                <button onClick={() => numberClick("7")}>7</button>
                <button onClick={() => numberClick("8")}>8</button>
                <button onClick={() => numberClick("9")}>9</button>
                <button onClick={() => operatorClick("+")}>+</button>
                <button onClick={() => numberClick("4")}>4</button>
                <button onClick={() => numberClick("5")}>5</button>
                <button onClick={() => numberClick("6")}>6</button>
                <button onClick={() => operatorClick("-")}>-</button>
                <button onClick={() => numberClick("1")}>1</button>
                <button onClick={() => numberClick("2")}>2</button>
                <button onClick={() => numberClick("3")}>3</button>
                <button onClick={() => operatorClick("*")}>*</button>
                <button onClick={() => numberClick("0")}>0</button>
                <button onClick={equalClick}>=</button>
                <button onClick={reset}>C</button>
            </div>
        </div>
    );
}

export default App;
