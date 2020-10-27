class contextValue{
    constructor() {
        this.cart = [];
        this.cartIndex = [];
        this.itemcounts = {};
        this.totalcount = 0;
        this.totalcartvalue = 0;
        this.allfuntion={}
    }
    addItem(item, count) {
        if (!this.cartIndex.includes(item.id)) {
            this.cart.push(item);
            this.cartIndex.push(item.id);
            if (count === undefined) {
                this.itemcounts[item.id] = 1;
                this.totalcount += 1;
                this.totalcartvalue += item.price;
            } else {
                this.totalcount += Number(count);
                this.totalcartvalue += item.price;
                this.itemcounts[item.id] = Number(count);
            }
        } else {
            if (count === undefined) {
                this.itemcounts[item.id] += 1;
                this.totalcount += 1;
                this.totalcartvalue += item.price;
            } else {
                this.totalcount += Number(count) - this.itemcounts[item.id];
                this.totalcartvalue += item.price * (count - this.itemcounts[item.id]);
                this.itemcounts[item.id] = Number(count);
            }
        }
        Object.values(this.allfuntion).map((value) => value.functiontocall());
        // Object.keys(this).map((key) => (console.log('this is property',key,' : ',this[key])));
        return true;
    }
    saveForLater(item) {
        let index = this.cartIndex.indexOf(item.id);
        if (index>=0) {
            this.cart.splice(index, 1);
            this.cartIndex.splice(index, 1);
            this.totalcount -= this.itemcounts[item.id];
            this.totalcartvalue -= this.itemcounts[item.id] * item.price;
            delete this.itemcounts[item.id];
            this.saveForLaterList.addItem(item);
        } else {
            this.saveForLaterList.addItem(item);
        }
        Object.values(this.allfuntion).map((value) => value.functiontocall());
        return true;
    }
    delete(item) {
        let index = this.cartIndex.indexOf(item.id);
        if (this.cart.includes(item)) {
            this.cart.splice(index, 1);
            this.cartIndex.splice(index, 1);
            this.totalcount -= this.itemcounts[item.id];
            this.totalcartvalue -= this.itemcounts[item.id] * item.price;
            delete this.itemcounts[item.id];
        }
        Object.values(this.allfuntion).map((value) => value.functiontocall());
        return true;
    }
    moveToWishList(item) {
        let index = this.cartIndex.indexOf(item);
        if (index >= 0) {
            this.cart.splice(index, 1);
            this.cartIndex.splice(index, 1);
            this.totalcount -= this.itemcounts[item.id];
            this.totalcartvalue -= this.itemcounts[item.id] * item.price;
            delete this.itemcounts[item.id];
            this.wishList.addItem(item);
        } else {
            this.wishList.addItem(item);
        }
        Object.values(this.allfuntion).map((value) => value.functiontocall());
        return true;
    }
}
class WishList{
    constructor(cart) {
        this.list = [];
        this.listIndex = [];
        this.cart = cart;
        this.allfuntion={}
        this.functiontocall = () => {
            // console.log(this, this.allfuntion);
            Object.values(this.allfuntion).map((value) => { /*console.log('this is in whishlist',value);*/value.functiontocall()});
        };
    }
    addItem(item) {
        if (!this.listIndex.includes(item.id)) {
            this.list.push(item);
            this.listIndex.push(item.id)
        }
    }
    delete(item) {
        let index = this.listIndex.indexOf(item.id);
        if (index >= 0) {
            this.list.splice(index, 1);
            this.listIndex.splice(index, 1);
        }
        this.functiontocall();
    }
    moveToCart(item) {
        this.delete(item);
        this.cart.addItem(item);
    }
}
class SaveForLaterList extends WishList{
    constructor(wishList) {
        super(wishList.cart);
        this.wishList = wishList;
    }
    moveToWhishList(item) {
        this.delete(item);
        this.wishList.addItem(item);
        this.functiontocall();
    }
}

//menu context
const options = {
    'Shop by Catagory': true,
    'Echo & Alexa': {
        'echo & alexa': true,
        'Echo Dot (3rd Gen)': '',
        'Echo Show 8': '',
        'Echo Input Portable Speaker': '',
        'Echo Plus': '',
        'Echo Show 5': '',
        'Echo Studio': '',
        'See all devices with Alexa': true,
        'content & resources': '',
        'Meet Alexa': '',
        'Alexa Skills': '',
        'Alexa App': '',
        'Alexa Smart Home': '',
        'Amazon Prime Music':'',
    },
    'Fire TV & Stick': {},
    'Kindle E-Readers & eBooks': 'dlkddodod',
    'Audible Audiobooks': 'ldldld',
    'Amazon Prime Video': 'sdlkddd',
    'Amazon Prime Music': 'sksldl',
    'Scetion Separartor': false,
    'Mobiles, Computers': {},
    'TV, Appliances, Electronics': {},
    "Men's Fashion": {},
    "Women's Fashion": {},
    "Home, Kitchen, Pets": {},
    "Beauty, Health, Grocery": {},
    "Sports, Fitness, Bags, Luggage": {},
    "Toys, Baby Products, Kids' Fashion": {},
    "Car, Motorbike, Industrial": {},
    "Books": {},
    "Movies, Music & Video Games": {},
    "Gift Cards & Mobile Recharges": {},
    "Flight Tickets": {},
    "Full Store Directory": {},
    "hmenu-separator": true,
    "Your Account": {},
    "Customer Service": {},
    "Sign Out":{},
};
const PhoneNumberCredintial = {
    India: '+91',
    Indonesia: '+92',
    Iran: '+98',
    Iraq:'+964',
}

const contextvalue = new contextValue();
const wishList = new WishList(contextvalue);
const saveForLaterList = new SaveForLaterList(wishList);
contextvalue.wishList = wishList;
contextvalue.saveForLaterList = saveForLaterList;
contextvalue.allfuntion.whishFuntion = wishList;
contextvalue.allfuntion.saveForLaterFuntion = saveForLaterList;
export {contextvalue,wishList,saveForLaterList,options,PhoneNumberCredintial};