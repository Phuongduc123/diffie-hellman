function isPrime(n) {
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;
    if (n % 2 == 0 || n % 3 == 0)
        return false;
 
    for (let i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    return true;
}
 
function power(x, y, p) {
    let res = 1;     // Initialize result
    x = x % p; // Update x if it is more than or
    while (y > 0) {
        if (y & 1)
            res = (res * x) % p;
        y = y >> 1; // y = y/2
        x = (x * x) % p;
    }
    return res;
}
 
function findPrimefactors(s, n) {
    while (n % 2 == 0) {
        s.add(2);
        n = n / 2;
    }
    for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
        while (n % i == 0) {
            s.add(i);
            n = n / i;
        }
    }
    if (n > 2)
        s.add(n);
}

export function findPrimitive(n) {
    let s = new Set();
    if (isPrime(n) == false)
        return -1;
    let phi = n - 1;
    findPrimefactors(s, phi);
    for (let r = 2; r <= phi; r++) {
        let flag = false;
        for (let it of s) {
            if (power(r, phi / it, n) == 1) {
                flag = true;
                break;
            }
        }   
        if (flag == false)
            return r;
    }
    return -1;
}