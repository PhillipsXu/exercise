function getPosition(): number {
    return Math.round(Math.random() * (28 - 1) + 1) * 10;
}

export default getPosition;