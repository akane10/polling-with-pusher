const form = document.getElementById('vote-form');

//submit form
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const choice = document.querySelector('input[name=club]:checked').value;
	const data = {
		club: choice
	};

	fetch('http://localhost:3000/', {
		method: 'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(e => console.log(e.message));
});


let dataPoints = [
	{label: 'FC Barcelona', y: 0},
	{label: 'Real Madrid', y: 0},
	{label: 'Bayern Munchen', y: 0},
	{label: 'Other', y: 0}
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
	const chart = new CanvasJS.Chart('chartContainer', {
		animationEnabled: true,
		theme: 'theme1',
		title: { text: `Total Votes` },
		data: [
			{
				type: 'column',
				dataPoints: dataPoints
			}
		]
	});

	chart.render();

	// Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  const pusher = new Pusher('73d8e2955b06547a3d6d', {
    cluster: 'ap1',
    forceTLS: true
  });

  const channel = pusher.subscribe('club-poll');
  channel.bind('club-vote', function(data) {
    dataPoints = dataPoints.map(x => {
    	if(x.label === data.club){
    		x.y += data.points;
    		return x;
    	} else {
    		return x;
    	}
    });

    chart.render();
  });
}
