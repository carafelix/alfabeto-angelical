import {
    alfabeangel,
    alfabeangelNoDiacritics,
} from './numeros'
import { Textarea, Button } from '@mui/joy'
import { Switch, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { changeBase } from './App'

const angelHash = alfabeangel.reduce(
    (acc, v, i) => ({ ...acc, [v]: i }),
    {}
)
const angelHashNoDiac = alfabeangelNoDiacritics.reduce(
    (acc, v, i) => ({ ...acc, [v]: i }),
    {}
)

/**
 *  Interprets the word using a letter to number conversion ∅=0, A=1, Á=2 B=3,..., Ñ=18 ..., Z=33
 *  And then performs trivial numerical interpretation based on radix and base
 * @param {*} word to be converted into a decimal number
 * @returns
 */

function wordToNumber(word, diacritics) {
    const w = word.split('').reverse()
    const hash = diacritics ? angelHash : angelHashNoDiac
    const base = diacritics ? 34 : 28

    if (!w.length) return null
    if (isNaN(hash[w[0].toUpperCase()])) return word

    let sum = 0
    for (let i = 0; i < w.length; i++) {
        sum += hash[w[i].toUpperCase()] * base ** i
    }
    return sum
}

export default function WordInterpreter() {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState(null)
    const [diacritics, setDiacritics] = useState(true)

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const lines = !diacritics
            ? inputValue
                  .normalize('NFD')
                  .replace(/\p{Diacritic}/gu, '')
                  .split('\n')
            : inputValue.split('\n')

        const numbersFromWords = lines.map((line) =>
            line
                .replaceAll(
                    /[^a-zA-ZáÁéÉíÍóÓúÚüÜñ]/g,
                    (match) => ` ` + match + ' '
                )
                .split(' ')
                .map((word) =>
                    wordToNumber(word, diacritics)
                )
                .join(' ')
                .replaceAll(/ [^0-9]/g, (match) =>
                    match.replace(' ', '')
                )
                .replaceAll(/[^0-9] /g, (match) =>
                    match.replace(' ', '')
                )
        )
        const wordsFromNumbers = lines.map((line) =>
            line
                .replaceAll(
                    /[^0-9]/g,
                    (match) => ` ` + match + ' '
                )
                .split(' ')
                .map((number) => {
                    if (isNaN(+number) || +number === 0)
                        return number
                    return changeBase(
                        +number,
                        diacritics ? 34 : 28,
                        true,
                        diacritics
                    )
                })
                .join(' ')
                .replaceAll(
                    / [^a-zA-ZáÁéÉíÍóÓúÚüÜñ]/g,
                    (match) => match.replace(' ', '')
                )
                .replaceAll(
                    /[^a-zA-ZáÁéÉíÍóÓúÚüÜñ] /g,
                    (match) => match.replace(' ', '')
                )
        )
        if (isNaN(+inputValue[0])) {
            setResult(numbersFromWords)
        } else setResult(wordsFromNumbers)
    }

    return (
        <>
            <FormControlLabel
                control={<Switch defaultChecked />}
                label='diacritics'
                onChange={() => setDiacritics(!diacritics)}
            />
            <form onSubmit={handleSubmit}>
                <Textarea
                    placeholder='Type words papi'
                    onChange={(ev) =>
                        setInputValue(ev.target.value)
                    }
                    required
                    sx={{ mb: 1 }}
                />
                <Button type='submit'>
                    convertir en ángeles
                </Button>
            </form>
            Result:
            <output>
                {result &&
                    result.map((line, i) => (
                        <p key={[i, line]}>{line}</p>
                    ))}
            </output>
        </>
    )
}
