class MiniMaple {
    diff(expr, variable) {
        expr = expr.replace(/\s+/g, '');
        const terms = expr.match(/[+-]?[^+-]+/g);
        if (!terms) return '0';

        const resultTerms = terms.map(t => this.#diffSingleTerm(t, variable));
        const filtered = resultTerms.filter(t => t !== '0');

        return filtered.length ? filtered.join(' + ').replace(/\+\s*-/g, '- ') : '0';
    }

    diffTerms(termsArray, variable) {
        if (!Array.isArray(termsArray)) throw new Error('Expected an array of terms');
        const resultTerms = termsArray.map(t => this.#diffSingleTerm(t, variable));
        return resultTerms.filter(t => t !== '0');
    }

    #diffSingleTerm(term, variable) {
        // просто число
        if (/^\d+$/.test(term)) return '0';

        // степенная форма a*x^n
        let match = term.match(/^([+-]?\d*)\*?([a-zA-Z]+)\^(\d+)$/);
        if (match) {
            let coef = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : Number(match[1]);
            const v = match[2];
            const n = Number(match[3]);
            if (v !== variable) return '0';
            const newCoef = coef * n;
            const newPower = n - 1;
            return newPower === 1 ? `${newCoef}*${v}` : `${newCoef}*${v}^${newPower}`;
        }

        // линейная форма a*x
        match = term.match(/^([+-]?\d*)\*?([a-zA-Z]+)$/);
        if (match) {
            const coef = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : Number(match[1]);
            const v = match[2];
            return v === variable ? `${coef}` : '0';
        }

        // просто переменная x
        if (term === variable) return '1';
        if (/^[a-zA-Z]+$/.test(term)) return '0';

        throw new Error("Unsupported operation: " + term);
    }
}

export { MiniMaple };
