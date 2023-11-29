const countryName = document.querySelector('.country-name');
const countryTotal = document.querySelector('.total-cases');
const box = document.querySelector('.box');
const table = box.querySelector('table');
const loadingMsg = document.querySelector('.loader-msg');


let mainData;
window.addEventListener('load',getData);
function getData(){
// --------------------USing Fetch API MEthod

	let url = 'https://disease.sh/v3/covid-19/countries';
	
	fetch(url)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			data.map(function(d){
			let timeDiff =  timeDifference(new Date().getTime(), d.updated);
			// console.log(d.updated);
				table.innerHTML += `<tr>
                <td class='country'>
                <img class='country-flag' src="${d.countryInfo.flag}" alt="Flag">
				${  d.country}
                </td>
                <td class='today-cases'>${d.todayCases}</td>
                <td>${d.cases}</td>
                <td>${d.deaths}</td>
				<td>${d.recovered}</td>
                <td class="updated">${timeDiff}</td>
                </tr>`
				// console.log(d);
			});	
            loadingMsg.style.display = "none";
            
	})
}

//----------------using xhr mrthod

// const xhr = new XMLHttpRequest();

// xhr.open('GET','api.txt',true);

// xhr.onprogress = function(){
	
// };

// xhr.onload = function(){
// 	document.querySelector('.loader-msg').style.display = 'none';
// 	const datas = JSON.parse(this.responseText)
// 	datas.map(function(d){
		// let timeDiff =  timeDifference(new Date().getTime(), d.updated);
// 		table.innerHTML += `<tr><td class='country'><img class='country-flag' src="${d.countryInfo.flag}" alt="Flag">
// 	 		${  d.country}</td><td class='today-cases'>${d.todayCases}</td><td>${d.cases}</td><td>${d.deaths}</td>
// 	 		<td>${d.recovered}</td><td class="updated">${timeDiff}</td></tr>`;
// 	});

// };

// xhr.send();
// }



const tableHeader = document.querySelector('.table-header');
	window.addEventListener('scroll',stickyHeader);

	function stickyHeader(){
	let top = table.getBoundingClientRect().top;

	if(top < 0){
		table.classList.add('fixed');
	}else{
		table.classList.remove('fixed');
	}
}





function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' secs';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' mins';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hrs';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years';   
    }
}

