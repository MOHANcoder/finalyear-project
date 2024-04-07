// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Assignment from '../components/Assignment'
import Transportation from '../components/Transportation';
import Simplex from '../components/Simplex';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Tools from '../components/Tools'
import Ocr from '../components/Ocr';
import CalculateIcon from '@mui/icons-material/Calculate';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BuildIcon from '@mui/icons-material/Build';
import BookIcon from '@mui/icons-material/Book';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Dictionary from '../components/Dictionary';
import Summarizer from '../components/Summarizer';
import Register from '../components/Register';
import Login from '../components/Login';
import ExploreIcon from '@mui/icons-material/Explore';
import ExtensionIcon from '@mui/icons-material/Extension';
import LogoutIcon from '@mui/icons-material/Logout';
import Explore from '../components/Explore';
import Home from '../components/Home';
import SchoolIcon from '@mui/icons-material/School';
import MyCourses from '../components/MyCourses';
import CreateCourse from '../components/CreateCourse';
import PageEditor from '../components/PageEditor';
import CourseBuilder from '../components/CourseBuilder';
import CourseEnrollment from '../components/CourseEnrollment';
import CourseView from '../components/CourseView';
import NavigationBar, { Menu } from '../components/NavigationBar';
import { AccountCircle, Extension } from '@mui/icons-material';
import Forum from '../components/Forum';

function App() {
	const tools = [
		{
			title: 'Calculators',
			icon: <CalculateIcon style={{ fontSize: '4rem' }} />,
			link: 'calculators'
		},
		{
			title: "OCR",
			icon: <DocumentScannerIcon style={{ fontSize: '4rem' }} />,
			link: 'ocr'
		},
		{
			title: "Dictionary",
			icon: <BookIcon style={{ fontSize: '4rem' }} />,
			link: 'dictionary'
		},
		{
			title: 'Text Summarizer',
			icon: <SummarizeIcon style={{ fontSize: '4rem' }} />,
			link: 'summarizer'
		}
	];

	const calculators = [
		{
			title: 'Assignment solver',
			icon: <CalculateIcon style={{ fontSize: '4rem' }} />,
			link: 'assignment'
		},
		{
			title: 'Transportation',
			icon: <CalculateIcon style={{ fontSize: '4rem' }} />,
			link: 'transportation'
		},
		{
			title: 'Simplex',
			icon: <CalculateIcon style={{ fontSize: '4rem' }} />,
			link: 'simplex'
		}
	]
	const [collapsed, setCollapsed] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState('');

	useEffect(() => {
		const token = document.cookie.split(";").find(cookie => cookie.startsWith("token="));
		if (token !== undefined) {
			const payload = JSON.parse(atob((token.split('.')[1]).replace('-', '+').replace('_', '/')));
			if (payload) {
				setUserRole(payload['role']);
			}
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const handleLogout = async () => {
		try {
			await fetch('http://localhost:1000/logout', {
				method: 'GET',
				credentials: 'include'
			});
			window.location.href = "/";
			// window.location.reload();
		} catch (error) {
			console.log('Logout Failed', error.message);
		}
	}

	return (
		<BrowserRouter>
			{!isAuthenticated ?
				<Routes>
					<Route path='/'>
						<Route index element={<Home />} />
						<Route path='register' element={<Register />} />
						<Route path='login' element={<Login />} />
					</Route>
				</Routes>
				:
				<>
					<NavigationBar title={"Welcome"} collapsed={isMobile || collapsed} isBottomBar={isMobile} onClick={() => setCollapsed(!collapsed)}>
						{
							userRole === 'student' &&
							<Menu icon={<ExploreIcon />} content={"Explore"} link={'/explore'} />
						}
						<Menu icon={<BuildIcon/>} content={"Tools"} link={'/tools'}/>
						<Menu icon={<SchoolIcon/>} content={"MyCourses"} link={"/mycourses"}/>
						<Menu icon={<AccountCircle/>} content={"Profile"} link={'/'} />
						<Menu icon={<LogoutIcon/>} content={"Logout"} link={"/logout"} isFooter={true} onClick={handleLogout} />
					</NavigationBar>
					<main className={`main-container ${isMobile ? 'mobile' : ''}`} style={{
						width:isMobile ? '100dvw' : collapsed ? '95dvw' : '74dvw'
					}}>
						{/* <Sidebar collapsed={isMobile || collapsed}>
						<Menu>
							<MenuItem className='menu1' icon={<MenuRoundedIcon/>} onClick={() => setCollapsed(!collapsed)}>
								<h2>Welcome</h2>
							</MenuItem>
							<MenuItem icon={<ExploreIcon/>} component={<Link to='/explore' />}>Explore</MenuItem>
							<MenuItem className='menu2' icon={<BuildIcon />} component={<Link to="/tools" />}>Tools</MenuItem>
							<MenuItem icon={<SchoolIcon/>} component={<Link to="/mycourses"/>}>Mycourses</MenuItem>
							<MenuItem icon={<LogoutIcon/>} onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</Sidebar> */}
						<section className="main-content">
							<Routes>
								<Route path='/' element={userRole} />
								<Route path='/tools' element={<Tools tools={tools} />} />
								<Route path='/tools/ocr' element={<Ocr />} />
								<Route path='/tools/ocr/image' element={<Ocr />} />
								<Route path='/tools/calculators' element={<Tools tools={calculators} />} />
								<Route path='/tools/calculators/assignment' element={<Assignment />} />
								<Route path='/tools/calculators/transportation' element={<Transportation />} />
								<Route path='/tools/calculators/simplex' element={<Simplex />} />
								<Route path='/tools/dictionary' element={<Dictionary />} />
								<Route path='/tools/summarizer' element={<Summarizer />} />
								{userRole === 'student' && <Route path='/explore' element={<Explore />} />}
								<Route path='/mycourses' element={<MyCourses role={userRole} />} />
								<Route path='/mycourses/create' element={<CreateCourse />} />
								<Route path='/mycourses/build/:id' element={<CourseBuilder />} />
								<Route path='/mycourses/edit/:id' element={<PageEditor />} />
								<Route path='/explore/:id' element={<CourseEnrollment />} />
								<Route path='/explore/view/:id' element={<CourseView />} />
								<Route path='/explore/forum/:id' element={<Forum/>}/>
							</Routes>
						</section>
					</main>
				</>
			}
		</BrowserRouter>
	)
}

export default App
