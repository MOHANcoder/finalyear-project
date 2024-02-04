import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import CreateCourse from '../components/CreateCourse.jsx'
import CourseEditor from '../components/CourseEditor.jsx'
import PageEditor from '../components/PageEditor.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>    
  </React.StrictMode>,
)
