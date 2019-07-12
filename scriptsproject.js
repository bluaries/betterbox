const baseURL = 'https://exceed.superposition.pknn.dev'

let groupData;

console.log('groupdata');



fetch(baseURL + '/data/groupTen')
    .then((res) => res.json())
    .then((data) => {
        groupData = data;
    });

fetch(baseURL + '/data/groupTen/sleeptime')
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


// fetch(baseURL + '/data/groupTen', {
//     method: 'POST',
//     body: JSON.stringify({
//         "data": {
//             "sleeptime": 0,
//             "light": 0,
//             "wakeuptime": 11,
//             "timedate":[],
//         }
//     }),
    
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then((res) => res.json())
//     .then((data) => console.log(data))
//     // .then((data) => converttime(data.data))
//     .catch((err) => console.log(err));

console.log("fetch complete")

function light(c) {
    //let c = document.getElementById("colorid").innerText
    console.log(c) 
    fetch(baseURL + '/data/groupTen/light', {
        method: 'PUT',
        body: JSON.stringify({
        "value": parseInt(c)
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }


function converttime() {
    let t = 0
    let h = parseInt(document.getElementById("hourid").value)
    let m = parseInt(document.getElementById("minuteid").value)
    let s = parseInt(document.getElementById("secondid").value)
    let ap = document.getElementById('apid').value.toUpperCase()
    console.log(groupData)
    if (groupData["sleeptime"] == 1) {
        let timesleep = new Date().toLocaleTimeString()
        console.log(timesleep)
        let date = new Date().toLocaleString()
        console.log(date)
        // let tem = groupData["temperature"]
        // console.log(tem)
        let ap2 = timesleep[timesleep.length-2]+timesleep[timesleep.length-1]
     
       
        console.log(timesleep[1])
        let h0;
        let m0;
        let s0;
       
        if (timesleep[1] == ":") {
            h0 = parseInt(timesleep[0])
            m0 = parseInt(timesleep[2]+timesleep[3])
            s0 = parseInt(timesleep[5]+timesleep[6])
            console.log(h0)
        

        }
        else {
            h0 = parseInt(timesleep[0]+timesleep[1])
            m0 = parseInt(timesleep[3]+timesleep[4])
            s0 = parseInt(timesleep[6]+timesleep[7])
            console.log(h0)
         

        }
        if (ap == ap2) {
            t = Math.abs(h -h0)*10 + Math.abs(m-m0)*2  + Math.abs(s-s0)
            console.log(t)
        }
        else {
            t = Math.abs((12-h0)+h)*10 + Math.abs(m-m0)*2  + Math.abs(s-s0)
            console.log(t)
        console.log(44)
            

        }
        fetch(baseURL + '/data/groupTen/wakeuptime', {
            method: 'PUT',
            body: JSON.stringify({
                "value": t
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        let tmp = []
        tmp.push(t)
        tmp.push(date)
        groupData['timedate'].push(tmp)
        console.log(groupData['timedate']);
        

        fetch(baseURL + '/data/groupTen', {
            method: 'POST',
            body: JSON.stringify({
                "data": {
                    "sleeptime": 0,
                    "light": groupData['light'],
                    "wakeuptime": groupData['wakeuptime'],
                    "timedate": groupData['timedate'],
                }
            }),
            
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => console.log(data))
            // .then((data) => converttime(data.data))
            .catch((err) => console.log(err));
        
    }
}
