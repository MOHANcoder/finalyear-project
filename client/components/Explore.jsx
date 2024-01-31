import CourseCard from "./CourseCard";

export default function Explore() {
  return (
    <div
      style={{
        // display:'flex',
        // flexDirection:'column',
        // gap:'2rem',
        // flexWrap:"wrap",
        // alignItems:'center',
        // placeContent:'center'
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,250px)",
        placeContent: "center",
        gap: "2rem"
      }}
    >
      {[
        {
          "title": "Introduction to Programming gggggggggggggggggggggggggggggggggggggggggggggggggggg",
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
        },
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
        },
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
        (course, i) => <CourseCard key={i} {...course} />)}
    </div>
  );
}