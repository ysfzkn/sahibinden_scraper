
var loadImage = document.querySelector('#loading');
document.querySelector('#getads').addEventListener('click',loadtable);
//document.querySelector('#getads').addEventListener('click',loadads);

let prices = []

// function loadads()   // eski versiyon request işlemi
// {

//     const brand = document.getElementById("brand").value;
//     const model = document.getElementById("model").value;   
//     console.log(brand);
//     console.log(model);
    
//     console.log("fonksiyon çalışıyor")

//     loadImage.style.display = 'block';

//     var url ='/v1/spawn/sahibinden'+'/'+brand+'/'+model ;
//     console.log(url);
//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url, true);
   
//     setTimeout(() => 
//     {
//         xhr.onload = function()
//         {
//             loadImage.style.display="none";

//             if(this.status === 200)
//             {       
//                 const res = JSON.parse(this.responseText)
//                 let ads = JSON.parse(res.stdout)
//                 console.log(ads)

//                 let html="";
                
//                 ads.forEach(ad => {
//                     console.log(ad.price)
//                     html+= `<tr>
//                                 <td id="price">${ad.price}</td>
//                                 <td id="year">${ad.year}</td>
//                                 <td id="km">${ad.km}</td>
//                                 <td id="color">${ad.color}</td>
//                             </tr>`;
//                 });             
    
//                 document.querySelector('#ads').innerHTML = html;
    
//             }
//         }
//         xhr.send();

//     }, 1500);
// }

function loadtable()
{
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;   
    console.log(brand);
    console.log(model);
    
    console.log("fonksiyon çalışıyor")
    
    loadImage.style.display = 'block';

    fetch('/v1/spawn/sahibinden'+"/"+brand+"/"+model, 
    {credentials: 'include'})
    .then(response => response.text())
    .then(data => 
    { 
        loadImage.style.display="none";
        console.log(data)
        const res = JSON.parse(data)
        let ads = JSON.parse(res.stdout)
        console.log(ads)
        let html="";
    
        ads.forEach(ad => 
        {
            console.log(ad.price)
            prices.push(price)
            html+= `<tr>
                        <td id="price">${ad.price}</td>
                        <td id="year">${ad.year}</td>
                        <td id="km">${ad.km}</td>
                        <td id="color">${ad.color}</td>
                    </tr>`;
        });             
        
        document.querySelector('#ads').innerHTML = html;
    })
    .catch(err => console.log(err));
}