import React from "react";

const Favorate = ({ items, DeleteFav ,onItemClick }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="favorate">
           { items.map((items, index) => (
            <li key = {index}>
                <div  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => onItemClick(items)}>
                        {items}
                    </button>
                    <button onClick={() => DeleteFav(items)}>
                        X
                    </button>
                </div>

            </li>
            ))}
        </div>
    )
}
export default Favorate;
