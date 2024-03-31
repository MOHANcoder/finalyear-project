import '../styles/AlertBox.css';
const AlertBox = ({message,type}) =>{
    return (
        <div className={`alert-box ${type}`}>
            <div className="icon"></div>
            <div className="message">{message}</div>
        </div>
    );
}
export default AlertBox;