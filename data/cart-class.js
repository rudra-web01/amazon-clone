//jaha haha 'loadFromStorageKey' likha hai waha waha 'localStorageKey' karna hai

class Cart{
    cartItems;

    #loadFromStorageKey; //to make localStorageKey Private

    constructor(loadFromStorageKey){
        this.loadFromStorageKey= loadFromStorageKey;
        this.#loadFromStorage();
    }
    //to make the method private
    #loadFromStorage() { 
        this.cartItems= JSON.parse(localStorage.getItem(this.loadFromStorageKey));

        if(!this.cartItems){
            this.cartItems= 
        [{

            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
            },
            {
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId:'2'
            }];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.loadFromStorageKey, JSON.stringify(this.cartItems));
    }

    addtocart(productId){
        let matchingItem;

        this.cartItems.forEach((Cartitem)=>{
            if (productId === Cartitem.productId) {
                matchingItem= Cartitem;              
            }
        });
        if(matchingItem){
            matchingItem.quantity+=1;
        }else{
            this.cartItems.push({
                productId: productId,
                quantity:1,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    RemoveFromCart(productId){
        const newCart=[];

        this.cartItems.forEach((Cartitem)=> {
            if(Cartitem.productId !== productId){
                newCart.push(Cartitem);
            }
        });
        this.cartItems=newCart;
        this.saveToStorage();

    }

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;

        this.cartItems.forEach((Cartitem)=>{
            if (productId === Cartitem.productId) {
                matchingItem= Cartitem;              
            }
        });

        matchingItem.deliveryOptionId= deliveryOptionId;
        this.saveToStorage();
    }

}




const cart= new Cart('cart-oop');
const businessCart= new Cart('cart-business');


console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

