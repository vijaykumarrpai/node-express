let printEven = function(a) {
    console.log("Inside even function");
    console.log(n);
}

let printOdd = function(n) {
    console.log("Inside odd function");
    console.log(n);
}

function displayNumber(printEven, printOdd) {
    let random = Math.round(Math.random() * 1);
    if(random % 2 == 0)
    {
        printEven(random);
    }else{
        printOdd(random);
    }
}

karthik = function(ele){
    if(ele === 7)
    {
        return ele;
    }
}

array = [1,7,7,1]
rer= array.filter(karthik)
console.log(typeof(karthik))


console.log(`rer = ${rer}`)
