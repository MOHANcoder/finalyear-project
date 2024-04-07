import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import "../styles/Explore.css";
import { Search } from "@mui/icons-material";
import useFetch from "../src/hooks/useFetch";
import { useMediaQuery } from 'react-responsive';

export default function Explore() {

	const [courses, setCourses] = useState([]);
	const [filteredCourses,setFilteredCourses] = useState([]);
	const [enrolledCourses,setEnrolledCourses] = useState([]);
	const isMobile = useMediaQuery({ maxWidth: 768 });

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
		setFilteredCourses(courses.filter(({name,isPublished}) => name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 && isPublished));
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<section className={`explore ${isMobile ? 'explore-mobile' : ''}`}>
			<h1 className="explore-title">Explore</h1>
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
				{filteredCourses.length === 0 && <h4>No Courses Found</h4>}
				{filteredCourses.map(
					(course, i) => <CourseCard key={i} {...course} isAlreadyEnrolled={enrolledCourses.includes(course._id)} />)}
			</div>
		</section>
	);
}