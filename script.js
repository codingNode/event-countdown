const dateEl= document.getElementById('date-picker');
const countForm = document.getElementById('countdownForm')



// setting the min attribute of the date-picket to today
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min',today)



let countTitle = '';
let countDate = ''

let countdownValue = Date;


function updateDom()
{
    const sec = 1000;
    const min = sec*60;
    const hour = min*60;
    const day = hour*24;

    const timeNow = new Date()
    const now = timeNow.getTime()

    console.log('difference in time zone w.r.t UTC', (timeNow.getTimezoneOffset())/60)
    const countValue = countdownValue-now;
    console.log('countdown', countValue)

    const days = Math.floor(countValue/day);
    const hours = Math.floor(((countValue % day)/hour)+(timeNow.getTimezoneOffset()/60));
    const mins = Math.floor((countValue % hour)/min);
    const secs = Math.floor((countValue % min)/sec);
    console.log('days',days,"Hours" ,hours, 'Minutes:', mins, 'Seconds:', secs)
    
    const countList = document.querySelectorAll('span')
    countList[0].innerText = `${days}`;
    countList[1].innerText = `${hours}`;
    countList[2].innerText = `${mins}`;
    countList[3].innerText = `${secs}`;


    const inputEl= document.getElementById('input-container')
    inputEl.hidden = true;

    const countDown = document.getElementById('countdown')
    countDown.hidden = false;

    const countTitleEl = document.getElementById('countdown-title')
    countTitleEl.textContent = `${countTitle}`;

    

    
}

function countUpdate(e)
{

    e.preventDefault()
  
    countTitle = e.srcElement[0].value;
    countDate = e.srcElement[1].value;

    countdownValue = new Date(countDate).getTime()

    console.log('since jan 1970',countdownValue)

    updateDom()

}

countForm.addEventListener('submit',countUpdate)