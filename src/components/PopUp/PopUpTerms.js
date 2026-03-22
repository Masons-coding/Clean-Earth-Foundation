import './PopUp.scss';

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box-terms">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;