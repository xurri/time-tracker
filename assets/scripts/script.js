const currParas = document.getElementsByClassName('current-time');
const prevParas = document.getElementsByClassName('previous-time')
let obj = {
  daily: {
    current: [],
    previous: []
  },
  weekly: {
    current: [],
    previous: []
  },
  monthly: {
    current: [],
    previous: []
  }
}

fetch('https://raw.githubusercontent.com/xurri/time-tracker/main/assets/data/data.json').then(res => res.json()).then(res => {
  
  for (let i of res) {
    for (let j in i.timeframes) {
      for (let k in i.timeframes[j]) {
        obj[j][k].push(i.timeframes[j][k]);
      }
    }
  }
  
  for (let i = 0; i < currParas.length; i++) {
      currParas[i].innerText = obj.daily.current[i] + 'hrs';
      prevParas[i].innerText = `${timePeriod('daily')} - ${obj.daily.previous[i]}hrs`;
    }
    
});

const update = (event) => {
  if (obj) {
    
    const el = event.target.id;
    
    for (let i = 0; i < currParas.length; i++) {
      currParas[i].innerText = obj[el].current[i] + 'hrs';
      prevParas[i].innerText = `${timePeriod(el)} - ${obj[el].previous[i]}hrs`;
    }
  } else alert('Loading. Try again');
}

function timePeriod(period) {
  return period === 'daily'? 'Yesterday': period === 'weekly'? 'Last week': 'Last month';
}
