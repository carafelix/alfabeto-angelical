import { useState, useEffect } from 'react'
import './App.css'
import { Switch, FormControlLabel } from '@mui/material'
import {
    vigesiseptimal,
    alfabeangel,
    alfabeangelNoDiacritics,
} from './numeros'
import WordInterpreter from './wordInterpreter'

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
export function changeBase(n, base, angel, diacritics) {
    base = base < 2 ? 2 : base
    const hash = !angel
        ? vigesiseptimal
        : diacritics
        ? alfabeangel
        : alfabeangelNoDiacritics

    const i_v = []

    while (n >= base) {
        i_v.unshift(n % base)
        n = Math.floor(n / base)
    }
    i_v.unshift(n % base)

    const final = i_v.map((v) => hash[v])

    return final.join('')
}

export default function App() {
    const [base, setBase] = useState(10)
    const [op, setOp] = useState('×')
    const [angel, setAngel] = useState(false)
    const [matrix, setMatrix] = useState(
        getMatrix(base, op)
    )
    const [diacritics, setDiacritics] = useState(true)

    useEffect(() => {
        if (!diacritics && angel && base > 28) {
            setBase(28)
        }
    }, [diacritics, angel, base])

    useEffect(() => {
        setMatrix(getMatrix(base, op, angel))
    }, [base, op, angel])

    return (
        <>
            {/* <h1>Sistema numeroángelical</h1> */}

            <WordInterpreter />
            {/* <p>
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
                control={
                    <Switch
                        defaultChecked
                        color='secondary'
                        disabled={!angel}
                    />
                }
                label='diacritics'
                onChange={() => {
                    setDiacritics(!diacritics)
                }}
            />
            <FormControlLabel
                control={<Switch defaultChecked />}
                label={op}
                onChange={() => {
                    const new_op = op === '×' ? '+' : '×'
                    op === '×'
                        ? setOp(new_op)
                        : setOp(new_op)
                }}
            />
            <br />
            <label htmlFor='tablas'>
                Base del sistema:
            </label>
            <input
                type='number'
                id='tablas'
                name='tablas'
                min='2'
                max='34'
                value={base}
                onChange={(ev) => {
                    const v = +ev.target.value
                    let lv =
                        diacritics | !angel
                            ? v > 34
                                ? 34
                                : v < 2
                                ? 2
                                : v
                            : v > 28
                            ? 28
                            : v < 2
                            ? 2
                            : v

                    if (
                        diacritics &&
                        angel &&
                        lv > 28 &&
                        lv < 34
                    ) {
                        lv = lv > base ? 34 : 28
                    }

                    setBase(lv)
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
                                                    angel,
                                                    diacritics
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
