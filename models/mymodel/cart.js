/*
newItem :{
  styleId,
  size,
  Qty: number,
  price: number
}
We store cartItem as a map of [key:<styleId+size>,value:newItem]
*/
module.exports=function Cart(oldCart){
    this.items=oldCart.items || {}; 
    this.totalQty= oldCart.totalQty || 0;
    this.totalPrice= oldCart.totalPrice || 0;

    this.add=function (newItem){                
        //check newItem key if existed in Cart
        console.log("add item ",newItem);
        var id=newItem.styleId.toString()+"-"+newItem.size;
        
        if (!this.items[id]){
            this.items[id]=newItem;
        }else{            
            this.items[id].Qty+=newItem.Qty;  //add more Qty to existing newItem in cart            
        }        
        this.totalQty+=newItem.Qty;
        this.totalPrice+=newItem.Qty*newItem.price;
        
    }

    this.getItem=function(id){
        return this.items[id];
    }
    this.generateArray=function(){
        var arr=[];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
    
    this.delete=function(itemId){
        var item=this.items[itemId];
        if (item){
            this.totalQty-=item.Qty;
            this.totalPrice-=item.price*item.Qty;
            delete this.items[itemId];
        }
    }

    this.edit=function(id,Qty=1,size="M"){
        console.log('call edit func',id,Qty,size);
        Qty=Number(Qty);
        var item=this.getItem(id);
        console.log("edit item:",item);
        if (!id)
            return;
        if (Qty==0){
            this.delete(id);
            return;
        }            
        if (item.size!=size){
            var newId=item.styleId.toString()+"-"+size;    //if size change then id item change too            
            //ad item with newId,size,qty and delete old item
            item.size=size; //update size
            item.Qty=Qty;   //update qty
            this.add(item); //add item with newId
            delete this.items[id];  //delete the old item with old id
            
        }else{
            var dQty=Qty-item.Qty;
            this.totalQty+=dQty; 
            this.totalPrice+=item.price*dQty;
            //qty change
            item.Qty=Qty;                                 
            this.items[id]=item;    
        }
       
    }
}
