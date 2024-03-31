export default (key, options) => {
    let data = {};
    let parseMethod = data => data;
    let storeMethod = data => data;
    const { initial, dataType } = options;
    if (initial) {
        if (dataType !== undefined) {
            switch (dataType) {
                case 'JSON': {
                    parseMethod = JSON.parse;
                    storeMethod = JSON.stringify;
                    break;
                }
            }
        }
        if (initial.fromLocal) {
            data = parseMethod(localStorage.getItem(key));
        } else if (initial.fromLocalOrUseDefault) {
            if (localStorage.getItem(key) !== null) {
                data = parseMethod(localStorage.getItem(key));
            } else {
                data = initial.data;
                localStorage.setItem(key, storeMethod(initial.data));
            }
        } else {
            data = initial.data;
            localStorage.setItem(key, storeMethod(initial.data));
        }
    }

    return [data, (newData) => {
        data = newData;
        localStorage.setItem(key, storeMethod(newData));
    }];
};