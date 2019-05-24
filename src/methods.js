function add(a,b) {
    return a + b;
}

function testES6(arr) {   
    var a = 0;
    arr.forEach(element => {
        a += element;
    });

    return a;
}

module.exports.add = add;
module.exports.testES6 = testES6;