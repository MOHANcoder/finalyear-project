export default function CourseCard({
    title, instructor, rating, price
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '300px',
                boxShadow: '0px 0px 4px 2px lightgrey',
            }}>
            <div
                style={{
                    background: "url('../src/assets/banner.jpg') center/cover no-repeat",
                    height:'150px'
                }}
            ></div>
            <div
                style={{
                    height:'150px',
                    marginTop:'10px'
                }}
            >
                <p 
                    style={{
                        // textAlign:'justify',
                        textOverflow:'ellipsis',
                        overflow:"hidden",
                        margin:0,
                        lineClamp:1
                    }}
                >{title}</p>
                <div >{instructor}</div>
                <div
                    style={{
                        display:'flex'
                    }}
                >
                    <div>{rating}</div>
                    <div>{price}</div>
                </div>
                <div ><a href="">full details</a></div>
            </div>
        </div>
    );
}