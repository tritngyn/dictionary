import React from "react";

const History = ({ items, onItemClick }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="history">
           { items.map((items, index) => (
            <li key = {index}>
            <button onClick={() => onItemClick(items)}>
                {items}
            </button>
            </li>
            ))}
        </div>
    )
}
export default History;
