  import React, { useEffect, useState } from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
  import { AccessDeniedPage } from './pages/AccessDeniedPage/AccessDeniedPage';
  import ClaimListPage from './pages/ClaimListPage/ClaimListPage';
  import DashboardPage from './pages/DashboardPage/DashboardPage';
  import LoginPage from './pages/Login/LoginPage';
  import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
  import ReportDownloadPage from './pages/ReportDownloadPage/ReportDownloadPage';
  import ProtectedRoute from './utils/ProtectedRoute';
  import { ToastContainer } from 'react-toastify';
import { getUserSession } from './utils/auth';
import InvoiceGenerationListPage from './pages/InvoiceGenerationListPage/InvoiceGenerationListPage';
import { ClaimViewPage } from './pages/ClaimViewPage/ClaimViewPage';
import SoldPolicyListPage from './pages/SoldPolicyListPage/SoldPolicyListPage';


  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const userData = getUserSession();
      if (userData) {
        // If user data is found in local storage, redirect to the dashboard
        setIsLoggedIn(true);
      }
    }, []);
    return (
      <Router>
    <div className='appContainer'>
    <ToastContainer />

          {/* <Sidebar /> */}
          <div className="content">
            <Routes>

              {!isLoggedIn?
              <>
              <Route path="/" element={<LoginPage />} />
              <Route path="/access-denied" element={<AccessDeniedPage />} />
              <Route path="*" element={<NotFoundPage />} /></>
:<>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                    <DashboardPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sold-policy"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                    <SoldPolicyListPage />
                    </AppLayout>

                  </ProtectedRoute>
                }
              />
              <Route
                path="/claims"
                element={
                  <ProtectedRoute>
                                        <AppLayout>

                    <ClaimListPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
               <Route
                path="/view-claim"
                element={
                  <ProtectedRoute>
                                        <AppLayout>

                    <ClaimViewPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                                        <AppLayout>

                    <ReportDownloadPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                                        <AppLayout>

                    <InvoiceGenerationListPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />}/>
              
              </>}
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  export default App;
