export default class Helpers {

    static showToast(message) {
        window.Materialize.toast(message, 4000)
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static areRepeatedPositions(array, array2) {
        let result = false;
        array.map(first => {
            array2.map(second => {
                if (first.row === second.row && first.column === second.column) {
                    result = true;
                }
            });
        });
        return result;
    }

    static haveShip(arr, val) {
        return arr.some(pos => pos.row == val.row && pos.column == val.column);
    }

    static saveToLocalStorage(element, key) {
        window.localStorage.setItem(key, JSON.stringify(element));
    }

    static getParsedObjectFromLocalStorage(key) {
        return JSON.parse(window.localStorage.getItem(key))
    }

    static getUnparsedObjectFromLocalStorage(key) {
        return JSON.parse(window.localStorage.getItem(key))
    }

    static deleteFromLocalStorage(...keys) {
        keys.map(key => {
            window.localStorage.removeItem(key)
        })
    }

    static getCurrentDate() {
        let d = new Date,
            dformat = [d.getMonth() + 1,
                    d.getDate(),
                    d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
        return dformat;
    }

}