/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

 //this is the web API where we'll extract our data

 //now it's time to the server and 
 //1.fetch the API → 2.parse it into JSON → 3.display our data

//Using Intl API:
    //It is used for: 1-- formatting dates
    //                2-- formatting numbers

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat("en-EN", {
            style: 'currency',
            currency: 'USD',
        }).format(price);
        return formattedPrice;
    }

//  window.fetch(url)
//     //url fetched!

//     .then((response) => response.json())
//     //response (promise returned by fetch) parsed into JSON!
    
//     .then(responseJson => {
//         responseJson.data.forEach(item => {
//             console.log(item.name);
//         });
//     }); 

//Now it's time to implement it with async/await

async function fetchData() {
    const response = await fetch(`${baseUrl}/api/avo`);
    const responseJson = await response.json();
    const itemsContainer = document.querySelector('#app')
    const allItems = []; 
    //all elements created will be inside JS memory in this array
    responseJson.data.forEach((item) => {
        //create node with image
        const image = document.createElement('img');
        image.src = `${baseUrl}${item.image}`; //base url + item (object) attribute image which is an url from the image
        image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

        //create node with title
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = 'text-lg'; //using a class available in tailwind
        
        // title.style.fontSize = "3rem" //first form, adding "inline" styles to tag

        title.classList.add("font-semibold"); //importing class names from tailwind
        // title.classList.add("text-2xl")
        //adding styles with className or classList        
        
        //create node with price
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = "text-gray-600";

        //node with price and title inside
        const priceAndTitle = document.createElement("div");
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);

        //container card
        const card = document.createElement('div');
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.append(image, priceAndTitle);
        

        //Put everything inside main container 
        const mainContainer = document.createElement('div');
        mainContainer.appendChild(card);

        allItems.push(mainContainer);
    })

    itemsContainer.append(...allItems); //you render 1 element with appendChild, you can render multiple elements with append
    return responseJson;
}

fetchData();