import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import Loading from './pages/Loading'
import AssessmentChat from './pages/AssessmentChat'
import StatusEligible from './pages/StatusEligible'
import StatusNotEligible from './pages/StatusNotEligible'
import Guidance from './pages/Guidance'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/get-started" replace />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/assessment" element={<AssessmentChat />} />
        <Route path="/status/eligible" element={<StatusEligible />} />
        <Route path="/status/not-eligible" element={<StatusNotEligible />} />
        <Route path="/guidance" element={<Guidance />} />
      </Routes>
    </Router>
  )
}

export default App

