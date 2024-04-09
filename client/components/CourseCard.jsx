import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
export default function CourseCard({
    name, createdBy, rating, price, summary, enrolledStudents,thumbnail,_id,isAlreadyEnrolled
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
                    background: `url(${thumbnail ? thumbnail :'../src/assets/banner.jpg'}) center/cover no-repeat`,
                    height: '150px',
                    borderRadius: '10px 10px 0px 0px'
                }}
            >
                <div style={{
                    backgroundColor: 'lightblue', width: 'max-content',
                    borderTopLeftRadius: '10px', padding: '5px', fontWeight: 'bolder',
                    boxShadow:'0px 0px 5px 1px blueviolet'
                }}>{price === 0 ? "FREE" : "PAID"}</div>
            </div>
            <div
                style={{
                    height: '200px',
                    marginTop: '10px',
                    padding: '5px'
                }}
            >



                <p
                    style={{
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        overflow: "hidden",
                        margin: 0,
                        fontWeight: 'bolder',
                        height: '50px'
                    }}
                >{name}</p>





                <div style={{
                    textAlign: 'justify',
                    textOverflow: 'ellipsis',
                    overflow: "hidden",
                    height: '50px',
                    width:'100%',
                    whiteSpace:'nowrap',
                    fontSize:'small'
                }}>{summary}</div>



                





                <div style={{ display: 'flex',fontSize:'small' }}>
                    <div style={{
                        display: 'flex',
                        width: '25%',
                    }}>
                        <AccountCircleIcon sx={{ width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                        <AccountCircleIcon sx={{ ml: '-0.74em', width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                        <AccountCircleIcon sx={{ ml: '-0.74em', width: '1.3em', height: '1.3em', backgroundColor: 'white', borderRadius: '50%' }} />
                    </div>
                    {enrolledStudents.length + ' enrolled'}
                </div>

                <div style={{fontSize:'small',textAlign:'center'}} > <b>OFFERED BY </b> <a href="">{createdBy.name}</a> </div>
                <div
                    style={{
                        textAlign: 'center'
                    }}
                > <Link to={isAlreadyEnrolled ? `view/${_id}` :`${_id}`}>{isAlreadyEnrolled ? "View" : "Enroll"}</Link>
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