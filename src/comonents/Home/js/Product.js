import React, { Component } from 'react'
import StarIcon from '@material-ui/icons/Star';
import '../css/Product.css';
import { ClassStateContext } from '../../API/StateProvider';

export class Product extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            id: this.props.id,
            info: this.props.info,
            price: this.props.price,
            rating: this.props.rating,
            img: this.props.img,
            alt: this.props.alt,
            maxquantity: this.props.maxquantity,
        }
        // this.updateProduct = () => this.setState({
        //     ...this.context.cart[this.props.item],
        // });
        // console.log(props);
        // this.state = {
        //     // ...this.context.cart[this.props.item],
        // }
    }
    static contextType = ClassStateContext;
    // componentDidMount = () => {
    //     this.setState({
    //         ...this.context.cart[this.props.item],
    //     });
    //     this.props.updateFuntion.push(this);
    // }
    // componentWillUnmount=()=>{
    //     let index = this.props.updateFuntion.indexOf(this);
    //     if(index >= 0)this.props.updateFuntion.splice(index, 1);
    // }
    render() {
        return (
            <div className="product">
                <div className="product_info">
                    <p>{this.state.info}</p>
                    <p className="product_price">
                        <small>$</small>
                        <strong>{this.state.price}</strong>
                    </p>
                    <div className="product_rating">
                        {Array(this.state.rating).fill(0).map((key,value)=>( <StarIcon key={value +"_"+ String(this.state.id)} /> ))}
                    </div>
                </div>
                < img src ={this.state.img}
                    alt={this.state.alt} className="product_image" />
                <ClassStateContext.Consumer>
                    {
                        context => <button className="product_addToCart" onClick={
                            () => {
                                context.addItem(this.state); //this is for updating cart item count
                            }}>Add to cart</button>
                    }
                </ClassStateContext.Consumer>
            </div>
        )
    }
}

export default Product

// export function Product(props) {
//     const [state, setState] =React.useState({
//         id: props.id,
//         info: props.info,
//         price: props.price,
//         rating: props.rating,
//         img: props.img,
//         alt: props.alt,
//     })
//     const [contextValue, dispatch] = useStateValue();
//     // const addItem = () => {
//     //     console.log(contextValue);
//     //     dispatch({ type: 'ADD_TO_CART', item: state })
//     // }
    
//     return (
//         <div className="product">
//             <div className="product_info">
//                 <p>{state.info}</p>
//                 <p className="product_price">
//                     <small>$</small>
//                     <strong>{state.price}</strong>
//                 </p>
//                 <div className="product_rating">
//                     {Array(state.rating).fill(0).map((key,value)=>( <StarIcon key={value +"_"+ String(state.id)} /> ))}
//                 </div>
//             </div>
//             < img src ={state.img}
//                 alt={state.alt} className="product_image" />
//             <button className="product_addToCart" onClick={() => dispatch({ type: 'ADD_TO_CART', item: state }) }>Add to cart</button>
//         </div>
//     )
// }

// export default Product
