let timedate = [];

function createGraph(f) {
    fetch('https://exceed.superposition.pknn.dev/data/groupgroupten/timedate')
    .then((res) => res.json())
    .then((data) => {
        timedate = data;
        console.log(timedate)
        f()
    });
}

function f() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: timedate < 7 ? timedate.map(t => t[1]) : timedate.slice(timedate.length - 7).map(t => t[1]),
            datasets: [{
                label: 'My sleep hour in 1 week',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: timedate < 7 ? timedate.map(t => t[0]) : timedate.slice(timedate.length - 7).map(t => t[0]),
            }]
        },

        // Configuration options go here
        options: {}
    });
}

createGraph(f);