
const searchCar = document.querySelector("#search-car");

// const button = document.querySelector("#button");

document.querySelector('#getads').addEventListener('click',loadads);


function loadads(){

    console.log("fonksiyon çalışıyor")
    var loadImage = document.querySelector('#loading');
    loadImage.style.display = 'block';

    var url ='/v1/spawn/sahibinden'
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
   
    setTimeout(() => 
    {
        xhr.onload = function()
        {
            loadImage.style.display="none";

            if(this.status === 200)
            {       
                const res = JSON.parse(this.responseText)
                let ads = JSON.parse(res.stdout)
                console.log(ads)

                let html="";
                
                ads.forEach(ad => {
                    console.log(ad.price)
                    html+= `<tr>
                                <td id="price">${ad.price}</td>
                                <td id="year">${ad.year}</td>
                                <td id="km">${ad.km}</td>
                                <td id="color">${ad.color}</td>
                            </tr>`;
                });             
    
                document.querySelector('#ads').innerHTML = html;
    
            }
        }
        xhr.send();

    }, 1500);
}

searchCar.addEventListener("keypress", (event)=>
{
    let text = event.target.value;

    if(text !== "")
    {
        console.log(text);
    }

})


// button.addEventListener('click', (updateButton)=>
// {
//   if (button.value === 'Start machine') 
//   {
//     button.value = 'Stop machine';
//     alert("The machine has started!");
//   } 
//   else 
//   {
//     button.value = 'Start machine';
//     alert('The machine is stopped.');
//   }
// })