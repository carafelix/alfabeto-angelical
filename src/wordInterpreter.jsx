import { alfabeangel } from './numeros'
import { Textarea, Button } from '@mui/joy'
import { useState } from 'react'

const angelHash = alfabeangel.reduce(
    (acc, v, i) => ({ ...acc, [v]: i }),
    {}
)

/**
 *  Interprets the word using a letter to number conversion ∅=0, A=1, Á=2 B=3,..., Ñ=18 ..., Z=33
 *  And then performs trivial numerical interpretation based on radix and base
 * @param {*} word to be converted into a decimal number
 * @returns
 */

function wordToNumber(word) {
    const w = word.split('').reverse()

    if (!w.length) return null

    let sum = 0
    for (let i = 0; i < w.length; i++) {
        sum += angelHash[w[i].toUpperCase()] * 34 ** i
    }
    return sum
}

export default function WordInterpreter() {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState(null)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const lines = inputValue.split('\n')

        const numericWords = lines.map((line) =>
            line.split(' ').map(wordToNumber).join(' ')
        )
        setResult(numericWords)
    }

    return (
        <>
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
                    result.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
            </output>
        </>
    )
}
