import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#303030",
    display: "flex",
    marginLeft: "-25px",
    height: "100%"
  },
  tabs: {
    borderRight: "1px solid #FFFFFF22"
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Cover letters"
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at consequat ipsum. In sit amet purus eget diam maximus efficitur quis in urna. Phasellus laoreet consectetur elit, in tristique ex fermentum ac. Nullam tristique, nunc id aliquam blandit, enim lacus porta nunc, et convallis tellus lectus id nisi. In eget erat dignissim leo cursus egestas. Mauris placerat massa ipsum, id luctus felis finibus ut. Suspendisse malesuada ullamcorper elit ut tristique. Sed risus nisi, ornare non semper quis, efficitur sed nisl. Aenean auctor enim nisi, et laoreet augue fringilla eget. Nunc malesuada, purus sit amet dapibus pellentesque, est nisl tempor eros, et laoreet justo massa eu tortor. Suspendisse scelerisque augue et consequat egestas. Duis sodales justo placerat aliquet condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Nulla sem urna, blandit id metus ac, elementum consequat sem. Nam facilisis semper sem finibus efficitur. Aliquam lobortis vel lectus a maximus. Phasellus tempus nulla quis feugiat aliquet. Fusce congue erat eget orci consequat iaculis eu ut est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, massa at maximus blandit, ante nibh dignissim lectus, tempus luctus sem elit ultricies sapien. Vestibulum ac malesuada quam. Donec eget congue velit.

Quisque id libero nec orci cursus ullamcorper. Fusce eu mi et arcu convallis sagittis. Vestibulum turpis elit, egestas sed erat non, pulvinar pellentesque eros. Nulla tincidunt imperdiet augue, in mollis massa efficitur sit amet. Pellentesque venenatis, tellus a mattis sollicitudin, est ligula aliquet velit, eget venenatis felis ipsum sed erat. Fusce sapien ligula, hendrerit ac tempus vitae, euismod quis tellus. Curabitur vulputate arcu id est efficitur, quis aliquam ipsum laoreet. Phasellus nec euismod urna, quis vulputate eros. Phasellus sit amet nisi augue. Duis non tellus at lacus dapibus mollis. Nulla tincidunt, arcu in pharetra fringilla, arcu odio vehicula sem, ut sagittis arcu leo nec odio. Vestibulum vitae volutpat neque, non dignissim nibh. Phasellus leo diam, vulputate sit amet massa a, rhoncus sodales libero. Vestibulum lobortis nisl ut erat mollis molestie. Quisque ut finibus orci, nec dapibus diam. Cras pulvinar massa leo, et tempor ante consequat eget.

Nunc lacinia sed nisi non volutpat. Maecenas nec mollis arcu, sit amet volutpat libero. Sed aliquam eros nunc, vel ultricies magna hendrerit vel. Cras laoreet ante vestibulum scelerisque iaculis. In hac habitasse platea dictumst. Etiam aliquet, lorem sodales aliquet iaculis, nisi risus hendrerit mi, vitae tempor tortor dolor quis purus. Proin ullamcorper magna non ipsum auctor condimentum. Phasellus egestas quam non eros varius, et viverra velit auctor. Nullam porta nibh ut sapien rutrum porttitor. Nullam suscipit vel neque eget eleifend. Pellentesque sollicitudin aliquet eros ac tincidunt. Quisque in venenatis augue.

Sed quis purus eu nisi placerat pretium sed quis sapien. In commodo id dolor et porttitor. Praesent odio orci, ullamcorper aliquet iaculis vitae, rutrum ac purus. Nunc convallis luctus libero vitae eleifend. Curabitur suscipit nunc quam. Fusce lectus massa, vehicula eu ex sed, bibendum gravida felis. Donec accumsan lacinia sapien vel rhoncus. Pellentesque id leo semper, posuere purus at, semper est. Pellentesque venenatis dignissim ante, volutpat dictum turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at consequat ipsum. In sit amet purus eget diam maximus efficitur quis in urna. Phasellus laoreet consectetur elit, in tristique ex fermentum ac. Nullam tristique, nunc id aliquam blandit, enim lacus porta nunc, et convallis tellus lectus id nisi. In eget erat dignissim leo cursus egestas. Mauris placerat massa ipsum, id luctus felis finibus ut. Suspendisse malesuada ullamcorper elit ut tristique. Sed risus nisi, ornare non semper quis, efficitur sed nisl. Aenean auctor enim nisi, et laoreet augue fringilla eget. Nunc malesuada, purus sit amet dapibus pellentesque, est nisl tempor eros, et laoreet justo massa eu tortor. Suspendisse scelerisque augue et consequat egestas. Duis sodales justo placerat aliquet condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Nulla sem urna, blandit id metus ac, elementum consequat sem. Nam facilisis semper sem finibus efficitur. Aliquam lobortis vel lectus a maximus. Phasellus tempus nulla quis feugiat aliquet. Fusce congue erat eget orci consequat iaculis eu ut est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, massa at maximus blandit, ante nibh dignissim lectus, tempus luctus sem elit ultricies sapien. Vestibulum ac malesuada quam. Donec eget congue velit.

Quisque id libero nec orci cursus ullamcorper. Fusce eu mi et arcu convallis sagittis. Vestibulum turpis elit, egestas sed erat non, pulvinar pellentesque eros. Nulla tincidunt imperdiet augue, in mollis massa efficitur sit amet. Pellentesque venenatis, tellus a mattis sollicitudin, est ligula aliquet velit, eget venenatis felis ipsum sed erat. Fusce sapien ligula, hendrerit ac tempus vitae, euismod quis tellus. Curabitur vulputate arcu id est efficitur, quis aliquam ipsum laoreet. Phasellus nec euismod urna, quis vulputate eros. Phasellus sit amet nisi augue. Duis non tellus at lacus dapibus mollis. Nulla tincidunt, arcu in pharetra fringilla, arcu odio vehicula sem, ut sagittis arcu leo nec odio. Vestibulum vitae volutpat neque, non dignissim nibh. Phasellus leo diam, vulputate sit amet massa a, rhoncus sodales libero. Vestibulum lobortis nisl ut erat mollis molestie. Quisque ut finibus orci, nec dapibus diam. Cras pulvinar massa leo, et tempor ante consequat eget.

Nunc lacinia sed nisi non volutpat. Maecenas nec mollis arcu, sit amet volutpat libero. Sed aliquam eros nunc, vel ultricies magna hendrerit vel. Cras laoreet ante vestibulum scelerisque iaculis. In hac habitasse platea dictumst. Etiam aliquet, lorem sodales aliquet iaculis, nisi risus hendrerit mi, vitae tempor tortor dolor quis purus. Proin ullamcorper magna non ipsum auctor condimentum. Phasellus egestas quam non eros varius, et viverra velit auctor. Nullam porta nibh ut sapien rutrum porttitor. Nullam suscipit vel neque eget eleifend. Pellentesque sollicitudin aliquet eros ac tincidunt. Quisque in venenatis augue.

Sed quis purus eu nisi placerat pretium sed quis sapien. In commodo id dolor et porttitor. Praesent odio orci, ullamcorper aliquet iaculis vitae, rutrum ac purus. Nunc convallis luctus libero vitae eleifend. Curabitur suscipit nunc quam. Fusce lectus massa, vehicula eu ex sed, bibendum gravida felis. Donec accumsan lacinia sapien vel rhoncus. Pellentesque id leo semper, posuere purus at, semper est. Pellentesque venenatis dignissim ante, volutpat dictum turpis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at consequat ipsum. In sit amet purus eget diam maximus efficitur quis in urna. Phasellus laoreet consectetur elit, in tristique ex fermentum ac. Nullam tristique, nunc id aliquam blandit, enim lacus porta nunc, et convallis tellus lectus id nisi. In eget erat dignissim leo cursus egestas. Mauris placerat massa ipsum, id luctus felis finibus ut. Suspendisse malesuada ullamcorper elit ut tristique. Sed risus nisi, ornare non semper quis, efficitur sed nisl. Aenean auctor enim nisi, et laoreet augue fringilla eget. Nunc malesuada, purus sit amet dapibus pellentesque, est nisl tempor eros, et laoreet justo massa eu tortor. Suspendisse scelerisque augue et consequat egestas. Duis sodales justo placerat aliquet condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Nulla sem urna, blandit id metus ac, elementum consequat sem. Nam facilisis semper sem finibus efficitur. Aliquam lobortis vel lectus a maximus. Phasellus tempus nulla quis feugiat aliquet. Fusce congue erat eget orci consequat iaculis eu ut est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra, massa at maximus blandit, ante nibh dignissim lectus, tempus luctus sem elit ultricies sapien. Vestibulum ac malesuada quam. Donec eget congue velit.

Quisque id libero nec orci cursus ullamcorper. Fusce eu mi et arcu convallis sagittis. Vestibulum turpis elit, egestas sed erat non, pulvinar pellentesque eros. Nulla tincidunt imperdiet augue, in mollis massa efficitur sit amet. Pellentesque venenatis, tellus a mattis sollicitudin, est ligula aliquet velit, eget venenatis felis ipsum sed erat. Fusce sapien ligula, hendrerit ac tempus vitae, euismod quis tellus. Curabitur vulputate arcu id est efficitur, quis aliquam ipsum laoreet. Phasellus nec euismod urna, quis vulputate eros. Phasellus sit amet nisi augue. Duis non tellus at lacus dapibus mollis. Nulla tincidunt, arcu in pharetra fringilla, arcu odio vehicula sem, ut sagittis arcu leo nec odio. Vestibulum vitae volutpat neque, non dignissim nibh. Phasellus leo diam, vulputate sit amet massa a, rhoncus sodales libero. Vestibulum lobortis nisl ut erat mollis molestie. Quisque ut finibus orci, nec dapibus diam. Cras pulvinar massa leo, et tempor ante consequat eget.

Nunc lacinia sed nisi non volutpat. Maecenas nec mollis arcu, sit amet volutpat libero. Sed aliquam eros nunc, vel ultricies magna hendrerit vel. Cras laoreet ante vestibulum scelerisque iaculis. In hac habitasse platea dictumst. Etiam aliquet, lorem sodales aliquet iaculis, nisi risus hendrerit mi, vitae tempor tortor dolor quis purus. Proin ullamcorper magna non ipsum auctor condimentum. Phasellus egestas quam non eros varius, et viverra velit auctor. Nullam porta nibh ut sapien rutrum porttitor. Nullam suscipit vel neque eget eleifend. Pellentesque sollicitudin aliquet eros ac tincidunt. Quisque in venenatis augue.

Sed quis purus eu nisi placerat pretium sed quis sapien. In commodo id dolor et porttitor. Praesent odio orci, ullamcorper aliquet iaculis vitae, rutrum ac purus. Nunc convallis luctus libero vitae eleifend. Curabitur suscipit nunc quam. Fusce lectus massa, vehicula eu ex sed, bibendum gravida felis. Donec accumsan lacinia sapien vel rhoncus. Pellentesque id leo semper, posuere purus at, semper est. Pellentesque venenatis dignissim ante, volutpat dictum turpis.
        </Container>
      </TabPanel>
    </div>
  );
}
