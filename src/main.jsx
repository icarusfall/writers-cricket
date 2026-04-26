import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import App from './App.jsx'
import Timeline from './components/Timeline.jsx'
import TeamList from './components/TeamList.jsx'
import TeamDetail from './components/TeamDetail.jsx'
import ConnectionGraph from './components/ConnectionGraph.jsx'
import Crossovers from './components/Crossovers.jsx'
import ResearchNotes from './components/ResearchNotes.jsx'
import './index.css'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Timeline /> },
      { path: 'teams', element: <TeamList /> },
      { path: 'teams/:teamId', element: <TeamDetail /> },
      { path: 'connections', element: <ConnectionGraph /> },
      { path: 'crossovers', element: <Crossovers /> },
      { path: 'about', element: <ResearchNotes /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
