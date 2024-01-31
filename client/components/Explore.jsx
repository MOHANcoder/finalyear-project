import Course from "./Course";

export default function Explore(){
    return (
      <div
        style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems:'space-around',
            height:'100%',
            width:'100%',
            paddingTop:'100px'
        }}
      >
        {[
  {
    "title": "Introduction to Programming",
    "instructor": "John Smith",
    "rating": 4.5,
    "price": 49.99
  },
  {
    "title": "Web Development Basics",
    "instructor": "Emily Johnson",
    "rating": 4.2,
    "price": 29.99
  },
  {
    "title": "Data Science Fundamentals",
    "instructor": "Michael Davis",
    "rating": 4.8,
    "price": 69.99
  }
].map(
    (course,i) => <Course key={i} {...course}/>)}
      </div>  
    );
}