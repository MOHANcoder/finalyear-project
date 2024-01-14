import { useEffect, useState } from 'react';
import '../styles/Assignment.css';

function Assignment() {
    const [isLoaded, setLoaded] = useState(false);
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [grid, setGrid] = useState([]);
    const [answerContent, setAnswerContent] = useState("");
    
    const setCellValue = (row,column,e) => {
        const newGrid = [...grid];
        let value = parseInt(e.target.value);
        newGrid[row][column] = isNaN(value) ? "" : value;
        setGrid(newGrid);
    }

    const createTable = () => {
        const newGrid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(0);
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
    }

    const solve = async () => {
        try {
            const res = await fetch("http://localhost:1000/tools/calc/or/assignment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    costTable: grid
                })
            });
            const data = await res.json();
            const { data: { htmlContent } } = data;
            setAnswerContent(`<h3>Steps</h3>${htmlContent}`);
        } catch (error) {
            setAnswerContent(`Error : ${error.message}`);
        }
    }

    return (
        <>
            <h1>Operations Research</h1>
            <h2>Assignment Problem</h2>
            <div className="info">
                An assignment problem is a type of optimization
                problem in operations research, where the goal is to assign
                a set of resources to a set of tasks in such a way that the
                total cost or profit is minimized or maximized. The assignment
                problem can be formulated as a linear programming problem, where the
                decision variables are binary, indicating whether a resource is
                assigned to a task or not. The assignment problem can also be
                seen as a special case of the transportation problem, where the supply
                and demand are equal and the cost matrix is square.
                <a href="https://en.wikipedia.org/wiki/Assignment_problem">Learn more</a>
            </div>
            <h3>Assignment Problem Solver</h3>
            <div className="info">
                This solver uses Hungarian Algorithm to solve the problem.
            </div>
            <div className="solver">
                <label>Enter number of workers or resources or rows : <input type="text" id="workers-input" value={rows} onInput={(e) => setRows(e.target.value)} /></label>
                <label>Enter number of jobs or activities or columns : <input type="text" id="jobs-input" value={columns} onInput={(e) => setColumns(e.target.value)} /></label>
                <button className='submit-button' onClick={createTable}>create</button>
            </div>
            {grid.length > 0 && <><table className="costTable">
                <tbody>
                    {grid.map((row, i) => (
                        <tr key={i}>
                            {row.map((col, j) => (
                                <td key={j} contentEditable={true} >
                                    <input type='text' className='cell' onInput={(e) => setCellValue(i,j,e)} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
                <button className="submit-button" onClick={solve}>solve</button>
                <div className="answer" dangerouslySetInnerHTML={{__html:answerContent}}>
                </div></>}
        </>
    );
}

export default Assignment;