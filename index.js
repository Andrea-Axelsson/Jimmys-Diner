import {menuArray} from './data.js'
const completeOrderBtn = document.getElementById('complete-order-btn')
const payBtn = document.getElementById('pay-btn')
const exitArrow = document.getElementById('exit-arrow')

const modalBody = document.getElementById('modal-body')
const thankYouModal = document.getElementById('thank-you-modal')


render()

completeOrderBtn.addEventListener('click', openModal)
exitArrow.addEventListener('click', closeModal)

function openModal(){
    modalBody.style.display = 'flex'
}

function closeModal(){
    modalBody.style.display = 'none'
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  
  document.getElementById('order-container').style.display = 'none'
  thankYouModal.style.display = 'flex'
   modalBody.style.display = 'none'
   
   setTimeout(function() {
  thankYouModal.style.display = 'none';
  location.reload(); 
}, 3000);

   
});


document.addEventListener('click', function(e){
   if (e.target.dataset.addItem){
       handleAddItemClick(e.target.dataset.addItem)
   } else if (e.target.dataset.removeItem){
       handleRemoveItemClick(e.target.dataset.removeItem)
   } else if (e.target.dataset.minusItem){
       handleRemoveItemClick(e.target.dataset.minusItem)
   }
})

function handleAddItemClick(addItemId){
   const targetMenuObj = menuArray.filter(function(dish){
       return dish.id === addItemId;
   })[0]
       targetMenuObj.isOrdered = true
       targetMenuObj.nrOfTimesOrdred ++
       document.getElementById('order-container').style.display =  'flex'
       window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
       
      
       render()
}

function handleRemoveItemClick(removeItemId){
    const targetOrderedDishObj = menuArray.filter(function(dish){
        return dish.id === removeItemId
    })[0]
    if (targetOrderedDishObj.nrOfTimesOrdred <= 1){
        targetOrderedDishObj.isOrdered = false
        targetOrderedDishObj.nrOfTimesOrdred = 0
        console.log(targetOrderedDishObj.nrOfTimesOrdred)
        
    }else {
        targetOrderedDishObj.nrOfTimesOrdred --
        console.log(targetOrderedDishObj.nrOfTimesOrdred)
    }
    
    
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    render()
}



function getFeedHtml(){
 let feedHtml = ``;
 let dishOrderArray = []
 const minusBtn = document.getElementById('minus-btn')

 // Loopa genom varje maträtt
 menuArray.forEach(function(dish) {
     
      if (dish.isOrdered){
        dishOrderArray.push(dish)   
    }


   feedHtml += `<section>
     <div class="food-container">
       <p class="food-emoji">${dish.emoji}</p>
       <div class="item-info">
         <h3>${dish.name}</h3>
         <p><p>${dish.ingredients.join(", ")}</p></p>
         <p><strong>$${dish.price}</strong></p>
       </div>
       <div class="icons">
       <div>
       <i class="fa-solid fa-circle-plus item-icon" data-add-item="${dish.id}"></i>
       </div>
       <div>
       <i class="fa-solid fa-circle-minus item-icon" disabled id="minus-btn" data-minus-item="${dish.id}" ></i>
       </div>
     </div>
   </section>`;
 });


if(dishOrderArray.length > 0)
{
    document.getElementById('order').innerHTML = getOrderHtml(dishOrderArray)
} else if (dishOrderArray.length < 1){
    document.getElementById('order-container').style.display =  'none'
    
}

    return feedHtml;
}


function getOrderHtml(dishOrderArray){
    let orderHtml = ``
    let totalCost = 0
    let totalDishPrice = 0
    let totalItemOrder = 0

    
    dishOrderArray.forEach(function(dish)
    {
        
        totalDishPrice = dish.price * dish.nrOfTimesOrdred
        totalCost += totalDishPrice
        orderHtml += `
            <div class="order">
            <h3>${dish.name} x${dish.nrOfTimesOrdred} </h3>
            <button class="remove-btn" data-remove-item="${dish.id}">remove</button>
            <p><strong>$${totalDishPrice}</strong></p>
            </div>
         `      
    })
    
    document.getElementById('total-cost').innerHTML = '$' + totalCost

    return orderHtml
}   


function render(){
   document.getElementById('food-container').innerHTML =  getFeedHtml()
    
}                 