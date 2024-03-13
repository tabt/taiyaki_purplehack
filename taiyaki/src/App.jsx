import './styles.css'
import { useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, Box, FormControl, Input, InputAdornment, Drawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorageCreator from './StorageCreator';


function App() {

  const date = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = date.toLocaleString('ru-RU', options);
  const day = new Date().toLocaleString('ru', {
    month: 'long',
    day: 'numeric'
  });

  const [items_b, setItemsB] = useState(['Baseline_matrix_1', 'Baseline_matrix_2', 'Baseline_matrix_3', 'Baseline_matrix_4']);
  const [items_d, setItemsD] = useState(['Discount_matrix_1', 'Discount_matrix_2', 'Discount_matrix_3', 'Discount_matrix_4']);
  const [filterB, setFilterB] = useState('')
  const [filterD, setFilterD] = useState('')

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={20} className='grid'>
      <Grid item lg={5}>
        <Grid container spacing={2} className='top-grid'>
          <Grid item lg={6} style={{paddingTop: 0}}>
            <div className='paper-grey'>
              <div className='date'>{day}</div>
              <Typography>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}</Typography>
            </div>
          </Grid>
          <Grid item lg={4} style={{paddingTop: 0}}>
            <Grid container rowSpacing={2}>
              <Grid item lg={12}><div className='paper-grey small-paper'>какая-то метрика</div></Grid>
              <Grid item lg={12}><div className='paper-grey small-paper'>еще одна</div></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <h3>Baseline</h3>

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
          <List>
            {items_b.filter((item) => item.includes(filterB))
              .map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      <Grid item lg={5}>
        <Box className='top-grid'>
          <button className='main-button' style={{marginLeft: '4em'}} onClick={toggleDrawer(true)}>
            Storage
          </button>
        </Box>
        <Box className='list-container'>
          <h3>Discount</h3>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              placeholder='Поиск'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              }
              onChange={(event) => {setFilterD(event.target.value)}}
            />
          </FormControl>

          <List>
            {items_d.filter((item) => item.includes(filterD))
              .map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      <Drawer open={openDrawer} anchor='right' onClose={toggleDrawer(false)}>
        <Box className='drawer'>
          <StorageCreator/>
        </Box>
      </Drawer>
    </Grid>
  );
}

export default App
