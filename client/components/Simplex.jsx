import { useState } from 'react';
import '../styles/Simplex.css';
import Constraint from './Constraint';
import useFetch from '../src/hooks/useFetch';

function Simplex() {

    const [decisionVars, setDecisionVars] = useState("");
    const [constraintsCount, setConstraintsCount] = useState("");
    const [optimizeType, setOptimizeType] = useState("max");
    const [isBasicsEntered, setIsBasicsEntered] = useState(false);
    const [objectiveCoefficients, setObjectiveCoefficients] = useState([]);
    const [constraints, setConstraints] = useState([]);
    const [nonNegativeConstraints, setNonNegativeConstraints] = useState([]);
    const [answerContent, setAnswerContent] = useState("");

    const createModel = () => {
        if (decisionVars && constraintsCount && optimizeType) {
            setIsBasicsEntered(true);
            setObjectiveCoefficients(Array.from({ length: decisionVars }, _ => 0));
            setConstraints(Array.from({ length: constraintsCount }, _ => ({
                coefficient: Array.from({ length: decisionVars }, _ => 0),
                symbol: "<=",
                constant: 0
            })));
            setNonNegativeConstraints(Array.from({ length: decisionVars }, _ => ({
                symbol: ">=",
                constant: 0
            })));
        }
    }

    const parseOrLeft = (value) => {
        return isNaN(parseInt(value)) ? 0 : parseInt(value);
    }

    const solve = async () => {
        try {
            const { data: { htmlContent } } = await useFetch("/tools/calc/or/simplex", {
                noOfDecisionVariables: decisionVars,
                optimizeType,
                objectiveCoefficients: objectiveCoefficients.map(coefficient => ({ dividend: coefficient, divisor: 1 })),
                constraints: constraints.map((constraint) => ({
                    coefficient: constraint.coefficient.map(coefficient => ({ dividend: coefficient, divisor: 1 })),
                    symbol: constraint.symbol,
                    constant: { dividend: constraint.constant, divisor: 1 }
                })),
                nonNegativeConstraints: nonNegativeConstraints.map((constraint, i) => ({
                    coefficient: Array.from({ length: decisionVars }, (_, j) => {
                        if (i === j) {
                            return { dividend: 1, divisor: 1 };
                        }
                        return { dividend: 0, dividsor: 1 };
                    }),
                    symbol: constraint.symbol,
                    constant: { dividend: constraint.constant, dividsor: 1 }
                }))
            }, "POST");
            setAnswerContent(htmlContent);
        } catch (error) {
            setAnswerContent(`Error : ${error.message}`);
        }
    }

    return (
        <>
            <h1>Operations Research</h1>
            <h2>Simplex Algorithm</h2>
            <div className="info">
                The Simplex Method is an iterative procedure for solving linear programming problems with a large number of variables.
                It was developed by G.B. Dantzig, an American mathematician. The method involves moving from one basic feasible solution to
                another in a prescribed manner such that the value of the objective function is improved. The simplex method is applicable
                to any problem that can be formulated in terms of a linear objective function subject to a set of linear constraints.
                The computational procedure of the simplex method is best explained by a simple example.
                The method provides a systematic algorithm that consists of moving from one basic feasible solution to another in a prescribed
                manner such that the value of the objective function is improved. The procedure of jumping from vertex to vertex is repeated
                until an optimal solution is obtained.
                The simplex method is widely used in business and economics for solving optimization problems.
                <a href="https://en.wikipedia.org/wiki/Simplex_algorithm" target='blank'>Wikipedia</a>.
            </div>

            <div className="solver-container">
                <div className="info">
                    <h3>Simplex Solver</h3>
                    This solver currently solves simple problems. Note: This solver not solves a problem if there is any basic varibles are vanished ((i.e)Using Artificals).
                </div>

                <div className="simplex-calculator">
                    <h3>Create Model : </h3>
                    <div className="create-container">
                        <label htmlFor='decision-vars'>Enter number of decision variables : </label><input type="text" name="decision-vars" id="decision-vars" value={decisionVars} onInput={(e) => setDecisionVars(isNaN(parseInt(e.target.value)) ? "" : (parseInt(e.target.value)))} />
                        <label htmlFor='constraints-count'>Enter number of constraints : </label><input type="text" name='constraints-count' id="constraints-count" value={constraintsCount} onInput={(e) => setConstraintsCount(isNaN(parseInt(e.target.value)) ? "" : (parseInt(e.target.value)))} />
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
                            {
                                objectiveCoefficients.map((coefficient, i) =>
                                    <label key={i}>
                                        <input type="text" className='constraint-inputs' onInput={(e) => setObjectiveCoefficients((pre) => {
                                            let newArr = [...pre];
                                            newArr[i] = parseOrLeft(e.target.value);
                                            return newArr;
                                        })} value={coefficient} />x
                                        <sub>{i + 1}</sub>
                                        {((i + 1) < decisionVars) && '+'}
                                    </label>)
                            }
                        </div>
                        <div className="constraints-container">
                            <h4>Constraints:</h4>
                            {
                                constraints.map((_, i) =>
                                    <Constraint key={i} id={i} constraint={constraints[i]} setConstraints={setConstraints} />
                                )
                            }
                        </div>
                        <h4>Non negative constraints:</h4>
                        <div className="non-negative-constraints-container">
                            {
                                nonNegativeConstraints.map(({ symbol, constant }, i) =>
                                    <div key={i} className="non-negative-constraints">
                                        x <sub> {i + 1}</sub>
                                        <select id="constraint-inequalitysign" onInput={(e) => setNonNegativeConstraints((pre) => {
                                            const newArr = [...pre];
                                            newArr[i].symbol = e.target.value;
                                            return newArr;
                                        })} value={symbol}>
                                            <option value=">=">&ge;</option>
                                            {/* <option value="=">=</option> */}
                                            <option value="<=">&le;</option>
                                        </select>
                                        <input type="text" className="constraint-inputs" onInput={(e) => setNonNegativeConstraints((pre) => {
                                            const newArr = [...pre];
                                            newArr[i].constant = parseOrLeft(e.target.value);
                                            return newArr;
                                        })} value={constant} />
                                    </div>)
                            }
                        </div>
                        <button className='solve-button' onClick={solve}>Solve</button>
                        <div className="answer-container" dangerouslySetInnerHTML={{ __html: answerContent }}>

                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Simplex;