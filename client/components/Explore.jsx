import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import "../styles/Explore.css";
import { Search } from "@mui/icons-material";
import useFetch from "../src/hooks/useFetch";

export default function Explore() {

	const [courses, setCourses] = useState([]);
	const [filteredCourses,setFilteredCourses] = useState([]);
	const [enrolledCourses,setEnrolledCourses] = useState([]);

	const fetchData = async () => {
		try {
			const res = await fetch('http://localhost:1000/explore', {
				credentials: 'include'
			});
			const data2 = await useFetch('/mycourses/enrolled');
			const data = await res.json();
			setCourses(data);
			setFilteredCourses(data.filter(course => course.isPublished));
			setEnrolledCourses(data2.data.map(data => data._id));
		} catch (error) {
			console.log(error.message);
		}
	}

	const handleSearch = (e) => {
		const searchText = e.target.value;
		setFilteredCourses(courses.filter(({name}) => name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1));
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className="explore">
			<div className="search-bar">
				<input type="search" name="" id="" placeholder="Search courses...." onChange={handleSearch} />
				{/* <span onClick={handleSearch}>
					<Search />
				</span> */}
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit,250px)",
					placeContent: "center",
					gap: "2rem",
					marginTop: '10%'
				}}
			>
				{filteredCourses.map(
					(course, i) => <CourseCard key={i} {...course} isAlreadyEnrolled={enrolledCourses.includes(course._id)} />)}
			</div>
		</section>
	);
}