export function limit() {
    try {
        let limit = localStorage.getItem('limit');
        if (limit == null) {
            localStorage.setItem('limit', "0");
            return 0;
        }
        return parseInt(limit);
    } catch {
        localStorage.setItem('limit', "0");
        return 0;
    }
}

export function incrementLimit() {
    try {
        let limit = localStorage.getItem('limit');
        if (limit == null) {
            localStorage.setItem('limit', "0");
            return 0;
        } else {
            let number = parseInt(limit);
            number++;
            localStorage.setItem('limit', number.toString());
            return number;
        }
    } catch {
        localStorage.setItem('limit', "0");
        return 0;
    }
}
