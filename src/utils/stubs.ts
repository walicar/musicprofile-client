const stubString = (opt?: string): string => {
    return opt ? `stub ${opt}` : 'stub';
}

export default stubString;