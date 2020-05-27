export const getCreatedYear = (createdDate) => {
    const createdYear = new Date(createdDate).getFullYear();
    const presentYear = new Date().getFullYear();
    return presentYear - createdYear;
};

export const getCheckboxData = (data, label, origin = false) => {
    let result = [];
    data.map(item => {
        return result.push(origin ? item[label].name : item[label])
    })
    return [...new Set(result)];
}

export const setLocalstorage = (data) => {
    if (data) {
        for (let value in data) {
            localStorage.setItem(value, data[value]);
        }
    }
}
export const removeFromLocalStorage = (data) => {
    if (data) {
        data.forEach(item => {
            localStorage.removeItem(item);
        })
    }
}