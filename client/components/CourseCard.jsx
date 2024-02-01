import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function CourseCard({
    name, instructor, rating, price, summary, enrolledCount
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '350px',
                boxShadow: '0px 0px 4px 2px lightgrey',
                borderRadius: '10px'
            }}>
            <div
                style={{
                    background: "url('../src/assets/banner.jpg') center/cover no-repeat",
                    height: '150px',
                    borderRadius: '10px 10px 0px 0px'
                }}
            ></div>
            <div
                style={{
                    height: '200px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent:'space-between',
                    padding:'5px'
                }}
            >



                <p
                    style={{
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        overflow: "hidden",
                        margin: 0,
                        fontWeight: 'bolder'
                    }}
                >{name}</p>





                <div style={{
                    textAlign: 'justify',
                    textOverflow: 'ellipsis',
                    overflow: "hidden",
                    lineClamp: 2
                }}>{summary}</div>



                <div >{instructor}</div>





                <div style={{ display: 'flex' }}>
                    <div style={{
                        display: 'flex',
                        width: '25%'
                    }}>
                        <AccountCircleIcon sx={{ width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                        <AccountCircleIcon sx={{ ml: '-0.74em', width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                        <AccountCircleIcon sx={{ ml: '-0.74em', width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                    </div>
                    {enrolledCount ?? '10+ enrolled'}
                </div>


                <div
                    style={{
                        textAlign: 'center'                        
                    }}
                ><a href="">VIEW DETAILS</a>
                </div>



            </div>
        </div>
    );
}

/**
 * 
 * <div>Enroll for Rs.{price}</div>
 * 
 * <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <div>{rating}</div>

                </div>
 */