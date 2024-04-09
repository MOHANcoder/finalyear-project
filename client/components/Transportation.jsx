import { useState } from "react";
import useFetch from "../src/hooks/useFetch";

function Transportation() {
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);
    const [grid, setGrid] = useState([]);
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [answerContent, setAnswerContent] = useState("");
    const [solvingMethod, setSolvingMethod] = useState("VA");

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
        setOrigins(Array.from({ length: rows }, _ => 0));
        setDestinations(Array.from({ length: columns }, _ => 0));
    }

    const setCellValue = (row, column, e) => {
        const newGrid = [...grid];
        let value = parseInt(e.target.value);
        newGrid[row][column] = isNaN(value) ? "" : value;
        setGrid(newGrid);
    }

    const setOriginValue = (row, e) => {
        const newOrigins = [...origins];
        let value = parseInt(e.target.value);
        newOrigins[row] = isNaN(value) ? "" : value;
        setOrigins(newOrigins);
    }

    const setDestinationValue = (column, e) => {
        const newDestinations = [...destinations];
        let value = parseInt(e.target.value);
        newDestinations[column] = isNaN(value) ? "" : value;
        setDestinations(newDestinations);
    }

    const solve = async () => {
        try {
            const res = await useFetch("/tools/calc/or/transportation", {
                costTable: grid,
                origins,
                destinations,
                method: solvingMethod
            }, 'POST');
            const { data: { htmlContent } } = res;
            setAnswerContent(`<h3>Steps</h3>${htmlContent}`);
        } catch (error) {
            setAnswerContent(`Error : ${error.message}`);
        }
    }

    return (
        <>
            <h1>Operations Research</h1>
            <h2>Transportation Problem</h2>
            <div className="info">
                he transportation problem is a mathematical optimization problem that deals with the allocation of goods
                from several sources to several destinations. The objective is to minimize the total transportation cost
                while satisfying the supply and demand constraints. The problem was first formalized by the French mathematician
                Gaspard Monge in 17811. The transportation problem is a special case of the linear programming problem and can be
                solved using several algorithms such as the North-West Corner Method, Least Cost Method, Vogel's Approximation Method,
                and the Modified Distribution Method2. You can learn more about the transportation problem and its applications in mathematics
                and economics on <a href="https://en.wikipedia.org/wiki/Transportation_theory_%28mathematics%29">Wikipedia</a>.
            </div>
            <h3>Transportation Solver</h3>
            <div className="info">
                This solver uses five algorithms to get the initial basic feasible solution for this problem.
            </div>
            <div className="solver">
                <label>Enter number of workers or resources or rows : <input type="text" id="workers-input" value={rows} onInput={(e) => setRows(e.target.value)} /></label>
                <label>Enter number of jobs or activities or columns : <input type="text" id="jobs-input" value={columns} onInput={(e) => setColumns(e.target.value)} /></label>
                <label>Select solving method :
                    <select value={solvingMethod} onInput={(e) => setSolvingMethod(e.target.value)}>
                        <option value="VA">Vogel's Approximation</option>
                        <option value="NW">NorthWest Corner</option>
                        <option value="RM">Row Minima</option>
                        <option value="CM">Column Minima</option>
                        <option value="MM">Matrix Minima</option>
                    </select>
                </label>
                <button className='submit-button' onClick={createTable}>create</button>
            </div>
            {grid.length > 0 && <><table className="costTable">
                <tbody>
                    {grid.map((row, i) => (
                        <tr key={i}>
                            {row.map((col, j) => (
                                <td key={j} >
                                    <input type='text' className='cell' onInput={(e) => setCellValue(i, j, e)} value={col} />
                                </td>
                            ))}
                            <td>
                                <input type='text' className='cell origin' onInput={(e) => setOriginValue(i, e)} value={origins[i]} />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {destinations.map((col, j) => (
                            <td key={j} >
                                <input type='text' className='cell destination' onInput={(e) => setDestinationValue(j, e)} value={col} />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
                <button className="submit-button" onClick={solve}>solve</button>
                <div className="answer" dangerouslySetInnerHTML={{ __html: answerContent }}>
                </div>
            </>}
        </>
    );
}

export default Transportation;