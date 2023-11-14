import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currencyOptions, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const handleBudgetChange = (event) => {
        if(event.target.value < expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0)){
            alert("You cannot reduce the budget lower than the spending");
        }else{
            setNewBudget(event.target.value);
            dispatch({
                type: 'SET_BUDGET',
                payload: event.target.value
            });
            
        }
        
    }

    const renderCurrencyOptions = () =>{
        return currencyOptions.map(element => {
            return (
                <option key={element.symbol} value={element.symbol}>{element.symbol} {element.name}</option>
            )
        })
    }

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value
        });
    }
    return (
<div className='alert alert-secondary'>
<span className="col-sm">Budget: {currency}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>

<select onChange={handleCurrencyChange} className="col-sm" defaultValue="" className='alert alert-success m-25' id="currency" name="currency">
<option value="" disabled hidden>Currency ({currency} {currencyOptions.find(e => e.symbol == currency).name})</option>
{renderCurrencyOptions()}
</select>
</div>
    );
};
export default Budget;

