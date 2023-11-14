import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch } = useContext(AppContext);
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
                payload: budget
            });
            
        }
        
    }
    return (
<div className='alert alert-secondary'>
<span>Budget: £</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;

