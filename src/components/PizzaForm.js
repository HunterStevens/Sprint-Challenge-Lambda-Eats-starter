import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
pizzaSize:yup.string().required("Choose your pizza size."),
orderName:yup.string().min(2, "must put a name of at least two letters.")
});

function PizzaForm(){

const [submitDisabled, setSubmitDisabled] = useState(true);

const [orderInput, setOrderInput] = useState({
    pizzaSize:"",
    toppings:"",
    special:"",
    orderName:""

}) 

const [orderErr, setOrderErr] = useState({
    pizzaSize:"",
    orderName:""
})

const [pizzaOrder, setPizzaOrder] = useState([]);


useEffect(() => {
    orderSchema.isValid(orderInput).then(valid =>{
        setSubmitDisabled(!valid);
    })
})

const orderChange = (event) =>{
    event.persist();
    const newOrder ={...orderInput};

    validateOrder(event);
    setOrderInput(newOrder);

}

const validateOrder = (event) => {
    yup.reach(orderSchema, event.target.name)
    .validate(event.target.value)
    .then(good =>{
        setOrderErr({
            ...orderErr,
            [event.target.name]:""
        });
    })
    .catch(err =>{
        setOrderErr({
            ...orderErr,
            [event.target.name]:err.errors[0]
        });
    });
}

const addOrder = (event) => {
    event.preventDefault();
}

    return(
        <div>
        <h1>Build Your own Pizza</h1>
        <Link to="/" >
            <h3>Home</h3>
        </Link>

        <form onSubmit={addOrder} >
            <label htmlFor="PizzaSize">
                Size for your Pizza: 
                <select id="PizzaSize" name="PizzaSize"
                value={orderInput.pizzaSize} onChange={orderChange} >
                    <option value="">--Select Size--</option>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </select>
    {orderErr.pizzaSize.length > 0 ? <p id="sizeErr">{orderErr.pizzaSize}</p> : null }
            </label>

            <br/>

            <label htmlFor="toppings">
                Toppings (choose as many as you want!):
                <br/>
                <label htmlFor="pineapple">
                    <input type="checkbox" value="pineapple" />
                    Pineapple                
                </label>
                <label htmlFor="pepperoni">
                    <input type="checkbox" value="pepperoni" />
                    Pepperoni                
                </label>
                <label htmlFor="sausage">
                    <input type="checkbox" value="sausage" />
                    Sausage                
                </label>
                <label htmlFor="onions">
                    <input type="checkbox" value="onions" />
                    Onions                
                </label>

            </label>

            <br/>

            <label htmlFor="special">
                Special Instructions:
                <textarea id="special" name="special"
                value={orderInput.orderName} onChange={orderChange}/>
            </label>

            <br/>

            <label htmlFor="orderName">
                Name for the Order:
                <input type="text" name="orderName" id="orderName" 
                value={orderInput.orderName} onChange={orderChange}/>
                {orderErr.orderName.length > 0 ? <p id="sizeErr">{orderErr.orderName}</p> : null }
            </label>

            <br/>

            <label htmlFor = "Add to Order">
                Add to order:
                <input type="submit" disabled={submitDisabled}/>
            </label>
        </form>
        </div>
    )
}
export default PizzaForm; 