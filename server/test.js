function mpsort() {
    let arr = [...arguments],
        length = arr.length;
    let output = [];
    let t;
    for (let i = 0; i < length; ++i) {
        for (let j = 0; j < length - i; ++j) {
            if (arr[j] < arr[j+1]) {
                t = arr[j];
                arr[j] = a[j+1];
                arr[j+1] = t;
            }
        }
    }
    return arr;
}

function tongSort() {
    let arr = [...arguments],
        length = arr.length,
        output = [],
        max = Math.max(...arr) > length ? Math.max(...arr) : length,
        box = new Array(max);

    for (let i = 0; i < length; ++i) {
        if (box[arr[i]]) {
            ++box[arr[i]];
        } else {
            box[arr[i]] = 1;
        }
        
    }

    box.forEach((item,i) => {
        for (let j = 0; j < item; ++j) {
            output.push(i)
        }
    });

    return output;
}

function quickSort(arr, l , r) {
    if (l > r) return
    else {
        let i = l,
            j = r,
            x = arr[i],
            t;
        
        while (i != j) {
            while (arr[j] >= x && i < j) {
                j--;
            }
            while (arr[i] <= x && i < j) {
                i++;
            }

            if (i < j) {
                t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }

        arr[l] = arr[i];     
        arr[i] = x;

        quickSort(arr,l,r-1);    
        quickSort(arr,l+1,r);
    }

    return arr;
}

function quickSort1(arr, l , r) {
    if (l > r) return
    else {
        let i = l,
            j = r,
            x = arr[i];
        
        while (i != j) {
            while (arr[j] > x && i < j) {
                j--;
            }
            if (i < j) {
                arr[i++] = arr[j];
            }

            while (arr[i] < x && i < j) {
                i++;
            }
            if (i < j) {
                arr[j--] = arr[i];
            }
        }

        arr[i] = x;

        quickSort1(arr, l, r-1);    
        quickSort1(arr, l+1, r);
    }

    return arr;
}