import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';



function PizzaForm(){

const [submitDisabled, setSubmitDisabled] = useState(true);

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
                <select id="PizzaSize" name="PizzaSize">
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </select>
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
                <textarea id="special" name="special"/>
            </label>

            <br/>

            <label htmlFor="orderName">
                Name for the Order:
                <input type="text" name="orderName" id="orderName" />
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