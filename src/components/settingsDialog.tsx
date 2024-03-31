import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Divider, FormControlLabel, Grid, List, ListItemButton, ListItemText, Radio, ThemeProvider, createTheme } from '@mui/material';
import { SimAttr, settings } from './logic/init';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
});


const colorOptions = [
	{ value: '#2659ab', label: 'BLUE' },
	{ value: '#000000', label: 'BLACK' },
	{ value: '#00FF00', label: 'Green' },
	{ value: '#FFFF00', label: 'Yellow' },
	// Add more color options as needed
  ];

export let openSettings:() => void;

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(true);

	
  	const handleClose = () => {
  	  setOpen(false);
  	};
	openSettings = () => {
		if (!open)
			setOpen(true);
		else
			setOpen(false)
	}
  	const [selectedColor, setSelectedColor] = React.useState<string>('#2659ab'); // Initial color
	const handleColorChange = (event: any, checked:boolean) => {
	  setSelectedColor(event.target.value);
	  settings.aliveColor = event.target.value;
	  console.log(settings.aliveColor);
	};

  return (
	  <React.Fragment>
		<ThemeProvider theme={darkTheme}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
		<List>
		<ListItemButton>
			<Grid item>
  		    	<ListItemText primary="AliveCellsColor" />
  			</Grid>
		<Divider/>
		</ListItemButton>
			<ListItemButton>
				<Grid container spacing={1} alignItems="center">
  				  {colorOptions.map((option) => (
  				    <Grid item key={option.value}>
  				      <FormControlLabel
  				        control={<Radio checked={selectedColor === option.value} />}
  				        label={option.label}
  				        value={option.value}

 	 		        onChange={handleColorChange}
 	 		      />
 	 			    </Grid>
 	 			  ))}
  				</Grid>
			</ListItemButton>
        <Divider />
        <ListItemButton>
        <ListItemText
          primary="Algo"
          secondary="Random"
        />
        </ListItemButton>
		<Divider />
        </List>
      </Dialog>
	  </ThemeProvider>
    </React.Fragment>
  );
}