import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
pizzaSize:yup.string().required("Choose your pizza size."),
special:yup.string(),
// pineapple:yup.boolean(),
// sausage:yup.boolean(),
// onions:yup.boolean(),
// pepperoni:yup.boolean(),
orderName:yup.string().required('must enter a name for the order').min(2, "must put a name of at least two letters.")
});

function PizzaForm(){

const [submitDisabled, setSubmitDisabled] = useState(true);

const [orderInput, setOrderInput] = useState({
    pizzaSize:"", 
    orderName:"",
    pineapple:"",
    sausage:"",
    onions:"",
    pepperoni:"",
    special:""
}) 

const [orderErr, setOrderErr] = useState({
    pizzaSize:"", 
    orderName:"",
    // pineapple:"",
    // sausage:"",
    // onions:"",
    // pepperoni:"",
    special:""
})

const [pizzaOrder, setPizzaOrder] = useState([]);


useEffect(() => {
    orderSchema.isValid(orderInput).then(valid =>{
        setSubmitDisabled(!valid);
    })
})

const orderChange = (event) =>{
    event.persist();
    const newOrder ={...orderInput,
    [event.target.name]:
    event.target.type === "checkbox" ? event.target.checked : event.target.value
    };

    validateOrder(event);
    setOrderInput(newOrder);

}

const checkboxChange = (event) =>{
    event.persist();
    const newOrder ={...orderInput,
    [event.target.name]:event.target.checked
    };
    setOrderInput(newOrder);

}

const validateOrder = (event) => {
    yup
    .reach(orderSchema, event.target.name)
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
    axios.post("https://reqres.in/api/users", orderInput)
    .then(res =>{
        console.log('New Pizza: ', res);
        setPizzaOrder([
            ...pizzaOrder,
            res.data
        ])
        console.log("Current list of pizza's", pizzaOrder);
    })
    .catch(err => console.log("ERROR: ", err));
}
//   
    return(
        <div>
        <h1>Build Your own Pizza</h1>
        <Link to="/" >
            <h3>Home</h3>
        </Link>
        <form onSubmit={addOrder} >
            <label htmlFor="PizzaSize">
                Size for your Pizza: 
                <select id="PizzaSize" name="pizzaSize"
                value={orderInput.pizzaSize} onChange={orderChange}>
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
                    <input type="checkbox" id="pineapple" name="pineapple" checked={orderInput.pineapple} onChange={checkboxChange}/>
                    Pineapple                
                </label>
                <label htmlFor="pepperoni">
                    <input type="checkbox" id="pepperoni" name="pepperoni" checked={orderInput.pepperoni} onChange={checkboxChange}/>
                    Pepperoni                
                </label>
                <label htmlFor="sausage">
                    <input type="checkbox" id="sausage" name="sausage" checked={orderInput.sausage} onChange={checkboxChange}/>
                    Sausage                
                </label>
                <label htmlFor="onions">
                    <input type="checkbox" id="onions" name="onions" checked={orderInput.onions} onChange={checkboxChange}/>
                    Onions                
                </label>

            </label>

            <br/>

            <label htmlFor="special">
                Special Instructions:
                <textarea id="special" name="special"
                value={orderInput.special} onChange={orderChange}/>
            </label>

            <br/>

            <label htmlFor="orderName">
                Name for the Order:
                <input  name="orderName" id="orderName" type="text" 
                value={orderInput.orderName} onChange={orderChange}/>
                {orderErr.orderName.length > 0 ? <p id="nameErr">{orderErr.orderName}</p> : null }
            </label>

            <br/>

            <label htmlFor = "addOrder">
                Add to order:
                <input name="addOrder" type="submit"  disabled={submitDisabled}/>
            </label>
        </form>

        <pre> {JSON.stringify(pizzaOrder, null)} </pre>
        </div>
    )
}
export default PizzaForm; 