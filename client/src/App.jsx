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
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BuildIcon from '@mui/icons-material/Build';
import BookIcon from '@mui/icons-material/Book';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Dictionary from '../components/Dictionary';
import Summarizer from '../components/Summarizer';
import Register from '../components/Register';

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
			title:"Dictionary",
			icon:<BookIcon style={{fontSize:'4rem'}} />,
			link: 'dictionary'
		},
		{
			title:'Text Summarizer',
			icon:<SummarizeIcon style={{fontSize:'4rem'}} />,
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
	const isMobile = useMediaQuery({maxWidth:768});
	return (
		<Register/> ||
		<BrowserRouter>
			<main className="main-container">
				<Sidebar collapsed={isMobile || collapsed}>
					<Menu>
						<MenuItem className='menu1' icon={<MenuRoundedIcon onClick={() => setCollapsed(!collapsed)} />}>
							<h2>Welcome</h2>
						</MenuItem>
						<MenuItem className='menu2' icon={<BuildIcon />} component={<Link to="/tools" />}>Tools</MenuItem>
					</Menu>
				</Sidebar>
				<section className="main-content">
					<Routes>
						<Route path='/tools' element={<Tools tools={tools} />} />
						<Route path='/tools/ocr' element={<Ocr />} />
						<Route path='/tools/ocr/image' element={<Ocr />} />
						<Route path='/tools/calculators' element={<Tools tools={calculators} />} />
						<Route path='/tools/calculators/assignment' element={<Assignment />} />
						<Route path='/tools/calculators/transportation' element={<Transportation />} />
						<Route path='/tools/calculators/simplex' element={<Simplex />} />
						<Route path='/tools/dictionary' element={<Dictionary/>} />
						<Route path='/tools/summarizer' element={<Summarizer/>} />
					</Routes>
				</section>
			</main>
		</BrowserRouter>
	)
}

export default App
