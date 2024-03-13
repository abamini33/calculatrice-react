import React, { useReducer } from "react";
import "./App.css";

const initialState = {
    display: "0",
    num1: "",
    num2: "",
    operator: "",
    result: "",
    waitingForOperand: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DISPLAY":
            return { ...state, display: action.payload };
        case "SET_NUM":
            if (state.waitingForOperand) {
                return {
                    ...state,
                    num2: action.payload,
                    display: action.payload,
                    waitingForOperand: false,
                };
            } else {
                return {
                    ...state,
                    num1:
                        state.num1 === "0"
                            ? action.payload
                            : state.num1 + action.payload,
                    display:
                        state.num1 === "0"
                            ? action.payload
                            : state.num1 + action.payload,
                };
            }
        case "SET_DECIMAL":
            if (state.waitingForOperand) {
                return {
                    ...state,
                    num2: "0.",
                    display: "0.",
                    waitingForOperand: false,
                };
            } else if (!state.num1.includes(".")) {
                return {
                    ...state,
                    num1: state.num1 === "" ? "0." : state.num1 + ".",
                    display: state.num1 === "" ? "0." : state.num1 + ".",
                };
            }
            return state;
        case "SET_OPERATOR":
            if (state.num1 !== "") {
                if (state.num2 !== "") {
                    let result;
                    switch (state.operator) {
                        case "+":
                            result =
                                parseFloat(state.num1) + parseFloat(state.num2);
                            break;
                        case "-":
                            result =
                                parseFloat(state.num1) - parseFloat(state.num2);
                            break;
                        case "*":
                            result =
                                parseFloat(state.num1) * parseFloat(state.num2);
                            break;
                        case "/":
                            result =
                                parseFloat(state.num1) / parseFloat(state.num2);
                            break;
                        default:
                            result = "";
                    }
                    return {
                        ...state,
                        num1: result.toString(),
                        num2: "",
                        display: result.toString(),
                        operator: action.payload,
                        waitingForOperand: true,
                    };
                } else {
                    return {
                        ...state,
                        operator: action.payload,
                        display: state.num1 + action.payload,
                        waitingForOperand: true,
                    };
                }
            }
            return state;
        case "CALCULATE":
            if (state.num2 !== "") {
                let result;
                switch (state.operator) {
                    case "+":
                        result =
                            parseFloat(state.num1) + parseFloat(state.num2);
                        break;
                    case "-":
                        result =
                            parseFloat(state.num1) - parseFloat(state.num2);
                        break;
                    case "*":
                        result =
                            parseFloat(state.num1) * parseFloat(state.num2);
                        break;
                    case "/":
                        result =
                            parseFloat(state.num1) / parseFloat(state.num2);
                        break;
                    default:
                        result = "";
                }
                return {
                    ...state,
                    result: result.toString(),
                    display: result.toString(),
                    waitingForOperand: true,
                };
            }
            return state;
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const numberClick = (number) => {
        dispatch({ type: "SET_NUM", payload: number });
    };

    const decimalClick = () => {
        dispatch({ type: "SET_DECIMAL" });
    };

    const operatorClick = (operator) => {
        dispatch({ type: "SET_OPERATOR", payload: operator });
    };

    const equalClick = () => {
        dispatch({ type: "CALCULATE" });
    };

    const clearClick = () => {
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
                <button onClick={() => operatorClick("*")}>x</button>
                <button onClick={() => numberClick("0")}>0</button>
                <button onClick={decimalClick}>.</button>
                <button onClick={() => operatorClick("/")}>/</button>
                <button onClick={equalClick}>=</button>
                <button onClick={clearClick}>C</button>
            </div>
        </div>
    );
}

export default App;
