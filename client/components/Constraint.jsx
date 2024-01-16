function Constraint({ constraint:{coefficient,symbol,constant}, setConstraints, id }) {
    const parseOrLeft = (value) => {
        return isNaN(parseInt(value)) ? 0 : parseInt(value);
    }

    return (
        <div className="constraint">
            {coefficient.map(
                ({coeff}, j) =>
                    <div className='constraint-element' key={j}>
                        <label>
                            <input type="text" className='constraint-inputs' onInput={(e) => setConstraints((pre) => {
                                let newArr = [...pre];
                                newArr[id].coefficient[j] = parseOrLeft(e.target.value);
                                return newArr;
                            })} value={coeff} />x
                            <sub>{j + 1}</sub>
                            {((j + 1) < coefficient.length) && '+'}
                        </label>
                    </div>
            )}
            <select id="constraint-inequalitysign" onInput={(e) => setConstraints((pre) => {
                let newArr = [...pre];
                newArr[id].symbol = e.target.value;
                return newArr;
            })} value={symbol}>
                <option value="<=">&le;</option>
                <option value="=">=</option>
                <option value=">=">&ge;</option>
            </select>
            <input type="text" className="constraint-inputs" onInput={(e) => setConstraints((pre) => {
                let newArr = [...pre];
                newArr[id].constant = parseOrLeft(e.target.value);
                return newArr;
            })} value={constant} />
        </div>
    );
}

export default Constraint;