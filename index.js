const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕",
        image:'images/pizza.png'
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1,
      image:'images/burger.png'
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2,
            image:'images/beer.png'
    }
]







let count=0
let orders=[]
let isComplet=false

function render(){
    document.getElementById('thankYou').classList.add('invisible')
    document.getElementById('chart').classList.add('invisible')
if( count == 0){
menuArray.map(menu => document.getElementById('main').innerHTML+=`
                                <div class='item'>
                                   <img class='emoji'src='${menu.image}'>
                                   <div class='dis'>
                                        <h2>${menu.name}</h2>
                                        <p>${menu.ingredients}</p>
                                        <h2>$${menu.price}</h2>
                                   </div>
                                   <div class='add'>
                                   <button id='${menu.id}' 
                                   onclick=orderMenu('${menu.name}','${menu.price}','${menu.price}') class='btn add'>+</button>
                                   <div>
                                </div>
                                <hr/>

                                <div id='completOrder' class="form invisible">
                
                               
                               
                            <form id='form'class='completOrder'>
                            <div class='orderPriview' id='orderPriview'></div>
                                <h1>Enter card details</h1>
                                <input type="text" id='input' name="name" placeholder='Enter your Name' required>
                                <input type="text" id='input' name="card" placeholder="Enter Card Number" required>
                                <input type="text" id='input' name="CCV"  placeholder="Enter CVV" required>
                                <button type='submit' >Pay</button>
                                <button type='button'onclick={orderComplet(${isComplet})}>Close</button>
                            
                            </form>
                        </div>
                                `
                               
)
}
count+=1
}
render()
/**********On Submit** and Thank you******* */
const submitForm=document.getElementById('form')
submitForm.addEventListener('submit', function(e){
e.preventDefault()
    const loginFormData = new FormData(submitForm)
    const name=loginFormData.get('name')
    const card=loginFormData.get('card')
    const cvv=loginFormData.get('CCv')
  
    document.getElementById('thankYou').innerHTML=`<h1>Thank you,${name}! Your order is on its way</h1>`
    orderComplet(isComplet)
    document.getElementById('thankYou').classList.remove('invisible')
    document.getElementById('chart').classList.add('invisible')
    console.log(name)
    orders=[]
    document.getElementById('form').value=''

    setTimeout(() => {
        location.reload(true)
    }, 3000);

   console.log(document.getElementById('input').innerHTML)
})



/*************Order Menu*************** */
function orderMenu(name,price,defaultPrice){


    document.getElementById('chart').innerHTML=''
   
if ( orders.length==0 ){
    orders.push({name,price,defaultPrice})
    console.log('start')
}
else {
     let flag = 0;//make flag to see if there is any change in the loop  Logical OR (||
    for(let i=0;i<orders.length;i++){
        if(orders[i].price==0 ){
            orders.splice(i,1)
           
        }
        else if(name === orders[i].name ){
            console.log(true)
            orders[i].price=parseInt(orders[i].price)+parseInt(price)//parseing the
            //strings to number 
            console.log(orders)
            flag=1;
        }}

    if(flag===0 ) //if there is no change add to the array
            orders.push({name,price,defaultPrice})
        
}

codes()
   
}

/******************************** */
function codes(){
         
  
    orders.length  ? document.getElementById('chart').classList.remove('invisible') : document.getElementById('chart').classList.add('invisible')
    for(let i=0;i<orders.length;i++){
        if(orders[i].price==0 ){
            orders.splice(i,1)
           
        }}

let test= totalPrice()
console.log(test)


   let result = orders.map(order =>`

   <div class='orderss'>
   <h2>${order.name}:${order.price/order.defaultPrice}
   <span onclick={removeItem('${order.name}')}> Remove</span></h2> 
   <div class='removebtn'>
   <span class='remove' onclick={minus('${order.name}','${order.defaultPrice}')}> -1 </span>
   <h1>-</h1><h2> $${order.price}</h2>
   </div>
   </div>`).join('')

        document.getElementById('chart').innerHTML=
        `   <h1>Your Order</h1>
        <div class='OrderedItem'>
                        ${result}  
                                      
        </div>
       
        <div class='totalPrice'>
                        <h2>Total</h2> 
                        
                        <h2> $${test} </h2>               
        </div>
        <button class='orderbtn' onclick=orderComplet(${!isComplet}) >Complet Your Order</button>`
}

/*********Complet order********************* */

function orderComplet(isComplet){
  
if(isComplet){
    document.getElementById('completOrder').classList.remove('invisible')
}else{

    document.getElementById('completOrder').classList.add('invisible')

}



}

/*******************Total price******************* */

function totalPrice(){
    let test=0
    let dis=0
console.log('Total')

if(orders.length==2){
    for(let order of orders){
        test+=parseInt(order.price)
 
    }
    dis=test*0.1
    test-=Math.round(dis)

   
}else if(orders.length==3){
    for(let order of orders){
        test+=parseInt(order.price)
 
    }
    dis=test*0.2
        test-=Math.round(dis)
}else {
    for(let order of orders){
        test+=parseInt(order.price)
    
    }
}

const orderPriview=orders.map(order => `<div class='orderPre'>
                                                <h3>${order.name}:<h3>
                                                <span>${order.price / order.defaultPrice} - $${order.price}</span>
                                               
                                        </div> ` ).join('')
  document.getElementById('orderPriview').innerHTML=`<div class='pre'>${orderPriview}</div>
                                                    <div class='discount'>
                                                    <p>Price:$${test+Math.round(dis)}</p>
                                                     <p>Discount:$${Math.round(dis)} </p>
                                                     <p>Total:$${test}</p></div>`


return test
}


function removeItem(name){
    
    for(let i=0;i<orders.length;i++){
        if(name === orders[i].name ){
            orders.splice(i,1)
        }
}
orders.length ? document.getElementById('chart').classList.remove('invisible') : document.getElementById('chart').classList.add('invisible')

codes()

}


/*******Order DEcrment************* */

function minus(name,defaultPrice){


        for(let i=0;i<orders.length;i++){
            if(name === orders[i].name ){
                console.log(true)
                if(orders[i].price==0){
                    orders.splice(i,1)
                   
                }
                else{orders[i].price=parseInt(orders[i].price)-parseInt(defaultPrice)//parseing the
                //strings to number 
                console.log(orders)
               
                 }
            }
        }
        orders.length ? document.getElementById('chart').classList.remove('invisible') : document.getElementById('chart').classList.add('invisible')

          codes()
  
    }

