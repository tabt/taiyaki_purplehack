import './styles.css'
import { useState } from 'react';
import { Grid, List, ListItem, ListItemText, Box, FormControl, Input, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


function StorageCreator() {

    const segments = ['269', '137', '345']
    const [items_d, setItemsD] = useState(['Discount_matrix_1', 'Discount_matrix_2', 'Discount_matrix_3', 'Discount_matrix_4']);

    const [discounts, setDiscounts] = useState({'269': 'Discount_matrix_2'})

    const handleChangeDiscountMatrix = (event, item) => {
        setDiscounts(Object.assign({item: event.target.value}, discounts));
    };

    const handleChangeDiscountSegment = (event, item) => {
        const newDiscounts = Object.assign(discounts, {[event.target.value]: discounts[item] });
        delete newDiscounts[item]
        setDiscounts(newDiscounts);
    };


    return (
        <div className='storage-container'>
            <h2 className='storage-header'>
                Сформировать storage
            </h2>
            <Grid container spacing={20} className='grid'>
                <Grid item lg={5}>
                    <Box>
                    <h2>Baseline</h2>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <Input
                        placeholder='Поиск'
                        startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon/>
                            </InputAdornment>
                        }
                        onChange={(event) => {setFilterB(event.target.value)}}
                        />
                    </FormControl>
                    {/* <List>
                        {items_b.filter((item) => item.includes(filterB))
                        .map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                        </ListItem>
                        ))}
                    </List> */}
                    </Box>
                </Grid>

                <Grid item lg={6}>
                    <Box className='list-container'>
                        <h2>Discount</h2>

                        <List>
                            {Object.keys(discounts).map((item, index) => (
                            <ListItem key={index}>
                                <FormControl sx={{ width: '15em', marginRight: '1em'}}>
                                    <InputLabel id="select-label">Сегмент</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        value={item}
                                        label="Сегмент"
                                        sx={{
                                            boxShadow: 'none', 
                                            background: '#F2F2F2', 
                                            borderRadius: 0, 
                                            '.MuiOutlinedInput-notchedOutline': { border: 0 } 
                                        }}
                                        onChange={(e) => handleChangeDiscountSegment(e, item)}
                                    >
                                    {segments.map((s) => (
                                        <MenuItem value={s}>{s}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="select-label">Матрица</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        value={discounts[item]}
                                        label="Матрица"
                                        sx={{ 
                                            boxShadow: 'none', 
                                            background: '#F2F2F2', 
                                            borderRadius: 0, 
                                            '.MuiOutlinedInput-notchedOutline': { border: 0 } 
                                        }}
                                        onChange={(e) => handleChangeDiscountMatrix(e, item)}
                                    >
                                    {items_d.map((i) => (
                                        <MenuItem value={i}>{i}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            ))}
                        </List>

                        <div
                            className='add-matrix-container'
                            onClick={() => setDiscounts(Object.assign({'': ''}, discounts))}
                            >
                            <AddIcon fontSize='large' className='add-matrix-button'/>
                            Добавить матрицу
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default StorageCreator