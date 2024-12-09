import { useState } from 'react'
import './App.css'
import { Switch, FormControlLabel } from '@mui/material'
import { vigesiseptimal, alfabeangel } from './numeros'

function getMatrix(n, op) {
    return [...Array(n).keys()].map((_, i) =>
        [...Array(n).keys()].map((v, j) =>
            op === '×' ? (j + 1) * (i + 1) : j + i
        )
    )
}
/**
 *
 * @param {number} n decimal number value
 * @param {number} base to convert to
 * @param {boolean} angel remove numbers from the symbols?
 * @returns
 */
function changeBase(n, base, angel) {
    base = base < 2 ? 2 : base
    const hash = !angel
        ? vigesiseptimal.slice(0, base)
        : alfabeangel.slice(0, base)

    const i_v = []

    while (n >= base) {
        i_v.unshift(n % base)
        n = Math.floor(n / base)
    }
    i_v.unshift(n % base)

    const final = i_v.map((v) => hash[v])

    return final.join('')
}

function App() {
    const [base, setBase] = useState(10)
    const [op, setOp] = useState('×')
    const [angel, setAngel] = useState(false)
    const [matrix, setMatrix] = useState(
        getMatrix(base, op)
    )

    return (
        <>
            {/* <h1>Sistema numeroángelical</h1>
            <p>
                Tablas de multiplicar para sistema numéricos
                de diferente base
            </p> */}

            <br />

            <FormControlLabel
                control={<Switch />}
                label='numeroángelical'
                onChange={() => setAngel(!angel)}
            />

            <FormControlLabel
                control={<Switch defaultChecked />}
                label={op}
                onChange={() => {
                    const new_op = op === '×' ? '+' : '×'
                    op === '×'
                        ? setOp(new_op)
                        : setOp(new_op)
                    setMatrix(getMatrix(base, new_op))
                }}
            />

            <br />

            <label htmlFor='tablas'>
                Base del sistema (2-27):
            </label>

            <input
                type='number'
                id='tablas'
                name='tablas'
                min='2'
                max='27'
                value={base}
                onChange={(e) => {
                    const v = +e.target.value
                    const lv = v > 27 ? 27 : v < 2 ? 2 : v
                    setBase(lv)
                    setMatrix(getMatrix(lv, op))
                }}
            />

            <table>
                <tbody>
                    {matrix
                        .map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row
                                    .map(
                                        (
                                            cell,
                                            cellIndex
                                        ) => (
                                            <td
                                                key={
                                                    cellIndex
                                                }
                                            >
                                                {changeBase(
                                                    cell,
                                                    base,
                                                    angel
                                                )}
                                            </td>
                                        )
                                    )
                                    .slice(0, base - 1)}
                            </tr>
                        ))
                        .slice(0, base - 1)}
                </tbody>
            </table>
        </>
    )
}

export default App
