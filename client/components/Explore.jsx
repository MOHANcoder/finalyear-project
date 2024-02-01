import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";

export default function Explore() {

	const [courses, setCourses] = useState([]);

	const fetchData = async () => {
		try{
			const res = await fetch('http://localhost:1000/explore',{
				credentials:'include'
			});
			const data = await res.json();
			setCourses(data);
		}catch(error){
			console.log(error.message);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit,250px)",
				placeContent: "center",
				gap: "2rem"
			}}
		>
			{courses.map(
				(course, i) => <CourseCard key={i} {...course} />)}
		</div>
	);
}