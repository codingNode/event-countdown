const dateEl= document.getElementById('date-picker');
const countForm = document.getElementById('countdownForm')
const resetBtn = document.getElementById('countdown-button')
const inputEl= document.getElementById('input-container')
const countDown = document.getElementById('countdown')
const countTitleEl = document.getElementById('countdown-title')
const completeEl= document.getElementById('complete')
const completeBtn = document.getElementById('complete-button')

// setting the min attribute of the date-picket to today
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min',today)



let countTitle = '';
let countDate = '';
let countActive;
let savedCount;
let countdownValue = Date;


function updateDom()
{
    const sec = 1000;
    const min = sec*60;
    const hour = min*60;
    const day = hour*24;

    const timeNow = new Date()
    const now = timeNow.getTime()

    // console.log('difference in time zone w.r.t UTC', (timeNow.getTimezoneOffset())/60)
    const countValue = countdownValue-now;

    console.log('countdown', countValue)
    if(countValue<0)
    {
        const completeInfo = document.getElementById('complete-info');

        completeEl.hidden = false;
        inputEl.hidden = true;
        countDown.hidden = true;

        completeInfo.textContent =`${countTitle} has ended on ${countDate}`;
        clearInterval(countActive);
    }
    else
    {
        
    const days = Math.floor(countValue/day);
    const hours = Math.floor(((countValue % day)/hour)+(timeNow.getTimezoneOffset()/60));
    const mins = Math.floor((countValue % hour)/min);
    const secs = Math.floor((countValue % min)/sec);
    // console.log('days',days,"Hours" ,hours, 'Minutes:', mins, 'Seconds:', secs)

    const countList = document.querySelectorAll('span')
    countList[0].innerText = `${days}`;
    countList[1].innerText = `${hours}`;
    countList[2].innerText = `${mins}`;
    countList[3].innerText = `${secs}`;

    inputEl.hidden = true;

    countDown.hidden = false;

    countTitleEl.textContent = `${countTitle}`;       
    }
    
}

function countUpdate(e)
{

    e.preventDefault()
  
    countTitle = e.srcElement[0].value;
    countDate = e.srcElement[1].value;

    if(countDate === '')
    {
        alert('Please select the date!')
    }
    else
    {
        countdownValue = new Date(countDate).getTime()

        savedCount={
            'title' : countTitle,
            'date' : countDate
        }

        localStorage.setItem('countdown', JSON.stringify(savedCount))
        // console.log('since jan 1970',countdownValue)
        countActive = setInterval(updateDom,1000)
        // updateDom()
    }


}

function restoreLocalStorage()
{
    if(localStorage.getItem('countdown'))
    {
        inputEl.hidden = true;
        
        savedCount = JSON.parse(localStorage.getItem('countdown'));
        console.log(savedCount)
        countTitle = savedCount.title;
        countDate = savedCount.date;
        countdownValue = new Date(countDate).getTime();
        countActive = setInterval(updateDom,1000)
    }
    
}

function reset(e)
{
    
    countTitle='';
    countDate='';

    const inputEl= document.getElementById('input-container')
    inputEl.hidden = false;

    const countDown = document.getElementById('countdown')
    countDown.hidden = true;
    completeEl.hidden = true;

    // clearTimeout(countActive)
    clearInterval(countActive)
    localStorage.removeItem('countdown')
}

countForm.addEventListener('submit',countUpdate);
resetBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restoreLocalStorage();