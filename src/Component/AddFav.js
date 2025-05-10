import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const Favorate = ({ items, DeleteFav ,onItemClick }) => {
    if (!items || items.length === 0) return null;
    return (
        <List >
           { items.map((items, index) => (
            <ListItem key = {index} 
             alignItems="center"
            secondaryAction={
                <IconButton sx ={{ width : '100px'}}  edge="end" aria-label="delete" onClick={() => DeleteFav(items)}>
                    <DeleteIcon />
                </IconButton>
            }
            sx={{ borderRadius: 1, mb: 1 }}
          
            >
            <ListItemButton  onClick={() => onItemClick(items)}> 
                <ListItemText primary ={items}
                                slotProps={{
                                    primaryTypography: {
                                    sx: { color: 'text.primary' }
                                    }
                                }}
                                />
            </ListItemButton>
            </ListItem> 
            ))} 
          
        </List>
           

    )
}
export default Favorate;
