export const alfabeangel = [...Array(14).keys()]
    .map((v) => String.fromCharCode(v + 65))
    .concat(['Ñ'])
    .concat(
        [...Array(12).keys()].map((v) =>
            String.fromCharCode(v + 79)
        )
    )

export const vigesiseptimal = [...Array(10).keys()]
    .map((v) => `${v}`)
    .concat(
        [...Array(17).keys()].map((v) =>
            String.fromCharCode(v + 65)
        )
    )