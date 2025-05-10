import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const History = ({ items, onItemClick }) => {
    if (!items || items.length === 0) return null;
    return (
        <List >
           { items.map((items, index) => (
            <ListItem key = {index} >
                <ListItemButton onClick={() => onItemClick(items)}>
                    <ListItemText primary ={items} />
                </ListItemButton>
            </ListItem>
            
          
            ))} 
        </List>
           
       
    )
}
export default History;
