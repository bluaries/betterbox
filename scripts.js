// let name = 'mewww';
// console.log(name);

// let StringA = 'Hi';
// console.log(StringA);

// let school = {
//     name:"Kasetsart Univ.",
//     location:"Bang Khen",
//     age: 80,
// }

let n = ["m. #ske16","หง่าว #สกี16","cat #ske16"]
let i = 0
function changename() {
    document.getElementById('name').innerText = n[i]
    i++
    if (i === n.length){
        i=0
    }
}

function inputname() {
    const input = document.getElementById('input').value 
    document.getElementById('name').innerText = input
}