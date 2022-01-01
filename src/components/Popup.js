import successful from './images/successful.svg'
import unsuccessful from './images/unsuccessful.jpg'

import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

const Popup= ({props}) => {
    const succ = "There is no exercise better for the heart than reaching down and lifting people up. ― John Holmes";
    const unsuc = "Your Payment was unsuccessful. Please Try Again!";
    var payment = true;

    if (payment == true){
        return (
            <div className="Causes-wrapper">
                <Popup_tempalte img={successful} title="Payment Successful" desc = {succ} add = "/" />  
            </div>
        );
    }
    else {
        return (
            <div className="Causes-wrapper">
                <Popup_tempalte img={unsuccessful} title="Payment Unsuccessful" desc = {unsuc} add = "/" />
            </div>
        );
    }


}


function Popup_tempalte(props){
    return(
        <div className="popup">
            <header className="popup-header">
                    {props.title}
                <img src={props.img} className='popup-image'/>
                <p className='space'> 
                    Empty space     
                </p>
                <p className="popup-p">
                    {props.desc}
                </p>
                <button className='popup-btn'>
                    <Link to={props.add}>
                        Return
                    </Link>
                </button>
            </header>
            
        
        </div>
    )
}

export default Popup;
