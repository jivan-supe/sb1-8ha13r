import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import AuthGuard from './components/AuthGuard';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddProductForm from './pages/product/AddProductForm';
import CompetitorsPage from './pages/competitor/CompetitorsPage';
import './styles/main.scss';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <AuthGuard>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/product/add" element={<AddProductForm />} />
                      <Route path="/competitors" element={<CompetitorsPage />} />
                      <Route path="/competitor-board/insights" element={<div>Insights</div>} />
                      <Route path="/competitor-board/ai-copilot" element={<div>AI Co-Pilot</div>} />
                    </Routes>
                  </MainLayout>
                </AuthGuard>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;