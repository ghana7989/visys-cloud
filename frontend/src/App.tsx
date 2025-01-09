import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { Navbar } from './components/navbar';
import { AuthProvider } from './context/AuthContext';
import Login from './modules/auth/pages/login';
import Home from './modules/home/pages/home';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <AuthProvider>
                            <Home />
                        </AuthProvider>
                    } />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
