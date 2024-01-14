
import { useState } from 'react';
import '../styles/Simplex.css';

function Simplex() {

    const [decisionVars, setDecisionVars] = useState("");
    const [constraintsCount, setConstaintsCount] = useState("");
    const [optimizeType, setOptimizeType] = useState("max");
    const [isBasicsEntered, setIsBasicsEntered] = useState(false);
    const [objectiveCoefficients, setObjectiveCoefficients] = useState([]);
    const [constaints, setConstraints] = useState([]);
    const [nonNegativeConstraints, setNonNegativeConstraints] = useState([]);

    const createModel = () => {
        setIsBasicsEntered(true);
    }

    const parseOrLeft = (value) => {
        return isNaN(parseInt(value)) ? 0 : parseInt(value);
    }

    return (
        <>
            <h1>Operations Research</h1>
            <h2>Simplex Problem</h2>
            <div className="info">
                he Simplex problem is a mathematical optimization problem that deals with the allocation of goods
                from several sources to several destinations. The objective is to minimize the total Simplex cost
                while satisfying the supply and demand constraints. The problem was first formalized by the French mathematician
                Gaspard Monge in 17811. The Simplex problem is a special case of the linear programming problem and can be
                solved using several algorithms such as the North-West Corner Method, Least Cost Method, Vogel's Approximation Method,
                and the Modified Distribution Method2. You can learn more about the Simplex problem and its applications in mathematics
                and economics on <a href="https://en.wikipedia.org/wiki/Simplex_theory_%28mathematics%29">Wikipedia</a>.
            </div>

            <div className="solver-container">
                <div className="info">
                    <h3>Simplex Solver</h3>
                    This solver uses five algorithms to get the initial basic feasible solution for this problem.
                </div>

                <div className="simplex-calculator">
                    <h3>Create Model : </h3>
                    <div className="create-container">
                        <label htmlFor='decision-vars'>Enter number of decision variables : </label><input type="text" name="decision-vars" id="decision-vars" value={decisionVars} onInput={(e) => setDecisionVars(isNaN(parseInt(e.target.value)) ? "" : (parseInt(e.target.value)))} />
                        <label htmlFor='constraints-count'>Enter number of constraints : </label><input type="text" name='constraints-count' id="constraints-count" value={constraintsCount} onInput={(e) => setConstaintsCount(isNaN(parseInt(e.target.value)) ? "" : (parseInt(e.target.value)))} />
                        <label htmlFor="optimizeType">Select Optimization Type :</label>
                        <select name="optimizeType" id="optimizeType" value={optimizeType} onInput={(e) => setOptimizeType(e.target.value)}>
                            <option value="max">Max</option>
                            <option value="min">Min</option>
                        </select>
                        <button className='create-button' onClick={createModel}>Create</button>
                    </div>
                </div>
            </div>

            {isBasicsEntered &&
                <>
                    <div className="model-container">
                        <div className="objective-function">
                            <h4>Objective Function:</h4>
                            <span className="optimize-type">{optimizeType} z = </span>
                            {Array.from({ length: decisionVars },
                                (_, i) =>
                                    <label>
                                        <input type="text" className='constraint-inputs' onInput={(e) => setObjectiveCoefficients((pre) => {
                                            let newArr = [...pre];
                                            newArr[i] = parseOrLeft(e.target.value);
                                            return newArr;
                                        })} />x
                                        <sub>{i + 1}</sub>
                                        {((i + 1) < decisionVars) && '+'}
                                    </label>
                            )
                            }
                        </div>
                        <div className="constraints-container">
                            <h4>Constraints:</h4>
                            {Array.from({ length: constraintsCount }, (_, i) =>
                                <div className="constraint">
                                    {Array.from({ length: decisionVars },
                                        (_, j) =>
                                            <div className='constraint-element'>
                                                {/* <select name="sign" id="sign">
                                                    <option value="+">+</option>
                                                    <option value="-">-</option>
                                                </select> */}
                                                <label>
                                                    <input type="text" className='constraint-inputs' onInput={(e) => setConstraints((pre) => {
                                                        let newArr = [...pre];
                                                        newArr[i] = {
                                                            coefficient : [...pre[i]['coefficient']]
                                                        }
                                                        newArr[i][j] = parseOrLeft(e.target.value);
                                                        return newArr;
                                                    })} />x
                                                    <sub>{j + 1}</sub>
                                                </label>
                                            </div>
                                    )}
                                    <select id="constraint-inequalitysign">
                                        <option value="<=">&le;</option>
                                        <option value="=">=</option>
                                        <option value=">=">&ge;</option>
                                    </select>
                                    <input type="text" className="constraint-inputs" />
                                </div>
                            )}
                        </div>
                        <h4>Non negative constraints:</h4>
                        <div className="non-negative-constraints-container">
                            {Array.from({ length: decisionVars }, (_, i) =>
                                <div className="non-negative-constraints">
                                    x <sub> {i + 1}</sub>
                                    <select id="constraint-inequalitysign">
                                        <option value="<=">&le;</option>
                                        <option value="=">=</option>
                                        <option value=">=">&ge;</option>
                                    </select>
                                    <input type="text" className="constraint-inputs" />
                                </div>
                            )}
                        </div>
                    </div>
                    {JSON.stringify(constaints)}
                </>
            }
        </>
    );
}

export default Simplex;