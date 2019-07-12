function createGraph(f) {
    fetch('https://exceed.superposition.pknn.dev/data/groupTen')
    .then((res) => res.json())
    .then((data) => {
        groupData = data;
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
            labels: [groupData['timedate'][groupData['timedate'].length - 7][1],groupData['timedate'][groupData['timedate'].length - 6][1],groupData['timedate'][groupData['timedate'].length - 5][1],groupData['timedate'][groupData['timedate'].length - 4][1],groupData['timedate'][groupData['timedate'].length -3][1],groupData['timedate'][groupData['timedate'].length - 2][1],groupData['timedate'][groupData['timedate'].length - 1][1]],
            datasets: [{
                label: 'My sleep hour in 1 week',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [groupData['timedate'][groupData['timedate'].length - 7][0],groupData['timedate'][groupData['timedate'].length - 6][0],groupData['timedate'][groupData['timedate'].length - 5][0],groupData['timedate'][groupData['timedate'].length - 4][0],groupData['timedate'][groupData['timedate'].length -3][0],groupData['timedate'][groupData['timedate'].length - 2][0],groupData['timedate'][groupData['timedate'].length - 1][0]]
            }]
        },

        // Configuration options go here
        options: {}
    });
}

createGraph(f);