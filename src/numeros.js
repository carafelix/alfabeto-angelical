export const alfabeangel = [
    '∅',
    'A',
    'Á',
    'B',
    'C',
    'D',
    'E',
    'É',
    'F',
    'G',
    'H',
    'I',
    'Í',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'Ó',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'Ú',
    'Ü',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]

export const vigesiseptimal = [...Array(10).keys()]
    .map((v) => `${v}`)
    .concat(
        [...Array(100).keys()].map((v) =>
            String.fromCharCode(v + 65)
        )
    )
