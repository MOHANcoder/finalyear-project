export default function Course({
    title,instructor,rating,price
}){
    const divStyles = {
        flex:'1 1 0',
        width:'100%'
    }
    return (
        <div
        style={{
            display:'flex',
            flexDirection:'column',
            height:'100%',
            boxShadow:'0px 0px 4px 2px grey',
            width:'400px'
        }}>
            <div
                style={{
                    background: "url('../src/assets/banner.jpg') center/cover no-repeat",
                    height:'60%'
                }}
            ></div>
            <h3 style={divStyles}>{title}</h3>
            <div style={divStyles}>{instructor}</div>
            <div style={divStyles}>
                <div>{rating}</div>
                <div>{price}</div>
            </div>
            <div style={divStyles} >full details</div>
        </div>
    );
}