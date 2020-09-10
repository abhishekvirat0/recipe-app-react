import React,{useEffect,useState} from 'react'
import './Card.css'
import ContentLoader from 'react-content-loader'
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({

    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  }));

const Card = ({title,calories,image, ingredients}) => {
    
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    

    useEffect(() => {
        setLoading(true);
        const timing = setTimeout(() => {
        setLoading(false);
        }, 1000);
        return () => clearTimeout(timing);
    }, []);


    const MyLoader = () => (
        <ContentLoader style={{alignContent:'center'}}>
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      );

    return (
        <div className="main">
            
            
            {loading && <MyLoader />}
            {!loading &&
            <div>
                <div className="card">

                    <img src={image} alt="Avatar" width="100px"/>

                    <div className="container">
                        <h4><b>{title}</b></h4> 
                        <p>calories:  {(Math.round(calories * 100) / 100).toFixed(2) }</p> 
                    </div>
                    <div>
                        <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                        </IconButton>
                    </div>

                </div>
                <div className="expand">
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {ingredients.map((ingredient)=>(
                      <li>{ingredient.text}</li>
                  ))}
                </CardContent>
                </Collapse>
                </div>
            </div>

            }

        </div>
    )
}

export default Card
