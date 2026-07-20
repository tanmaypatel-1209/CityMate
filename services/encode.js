function reverseMaping(c) {
    let a = c.charCodeAt(0);
    if (a >= 97 && a <= 122) {
        return String.fromCharCode(((a - 97 - 11 + 26) % 26) + 97);
    }
    if (a >= 48 && a <= 57) {
        return String.fromCharCode(((a - 48 - 5 + 10) % 10) + 48);
    }
    return c;
}
function reverseMaping2(c) {
    let a = c.charCodeAt(0);

    if (a >= 97 && a <= 122) {
        return String.fromCharCode(((a - 97 - 7 + 26) % 26) + 97);
    }

    if (a >= 48 && a <= 57) {
        return String.fromCharCode(((a - 48 - 3 + 10) % 10) + 48);
    }

    return c;
}

function maping(c) {
    let a = c.charCodeAt(0);
    if (a >= 97 && a <= 122) {
        return ((a - 97 + 11) % 26) + 97;
    }
    if (a >= 48 && a <= 57) {
        return ((a - 48 + 5) % 10) + 48;
    }
    return a;
}
function maping2(c) {
    let a = c.charCodeAt(0);
    if (a >= 97 && a <= 122) {
        return ((a - 97 + 7) % 26) + 97;
    }
    if (a >= 48 && a <= 57) {
        return ((a - 48 + 3) % 10) + 48;
    }
    return a;
}
function shuffle(arr) {
    let n = arr.length;
    for (let i = n - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;

}
function check(str) {
    let arr = str.split("");
    let n = arr.length;
    let m = new Map();
    for (let i = 0; i < n; i++) {
        if (i % 2 == 1) {
            let c = arr[i];
            if (!(m.has(c))) {
                m.set(c, 1)
            }
            else {
                m.set(c, m.get(c) + 1)
            }
        }
    }
    for (let i = 0; i < n; i++) {
        if (i % 2 == 0) {
            let c = String.fromCharCode(maping2(arr[i]));
            if ((m.has(c))) {
                m.set(c, m.get(c) - 1)
            }
        }
    }
    for (let [key, value] of m) {
        if (value != 0) {
            return false;
        }
    }
    return true;

}
const encrypt = function encode(email, key) {
    email = email.split("@")[0];
    let a = email.length;
    let result = "";
    let result2 = "";
    for (let i = 0; i < a; i++) {
        let c = maping(email[i]);
        if (c) {
            result += String.fromCharCode(c);
        }
        else {
            result += email[i];

        }
    }
    for (let i = 0; i < a; i++) {
        let c = maping2(result[i]);
        result2 += String.fromCharCode(c);
    }

    let arr1 = shuffle(result.split(""))
    let arr2 = (result2.split(""));
    let FinalResult = "";
    let n = 2 * a;
    for (let i = 0; i < n; i++) {
        FinalResult += (i % 2 == 0) ? arr1[(i / 2)] : arr2[(i - 1) / 2];
    }
    return FinalResult;
}
function decrypt(str) {
    let n = str.length;
    email = "";
    for (let i = 0; i < n; i++) {
        if (i % 2 == 1) {
            email += reverseMaping(reverseMaping2(str[i]));
        }

    }
    if(email=="BusinessOwner" || email=="User" ){
        return email;
    }
    return email + "@gmail.com";
}
module.exports = {
    maping,
    maping2,
    reverseMaping,
    reverseMaping2,
    shuffle,
    check,
    encrypt,
    decrypt
};
