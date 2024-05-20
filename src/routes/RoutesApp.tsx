import React, { lazy } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Sidebar from '../components/Sidebar';
import RightSectionWrapper from '../AppWrappers/RightSectionWrapper';

//Lazy Load pages
const Admin = lazy(() => import('../containers/admin'));
const Applications = lazy(() => import('../containers/application'));
const Connections = lazy(() => import('../containers/connections'));
const Cost = lazy(() => import('../containers/cost'));
const Docs = lazy(() => import('../containers/docs'));
const Security = lazy(() => import('../containers/security'));
const NotFound = lazy(() => import('../containers/NotFound'));

import TopBar from '../components/TopBar';



const RoutesApp = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <RightSectionWrapper>
                <TopBar />
                <div className='Router_App px-8 h-full bg-bg-grey'>
                    <Routes>
                        <Route path="/admin" element={
                            <React.Suspense fallback={<p>Loading Admin chunk...</p>}>
                                <Admin />
                            </React.Suspense>
                        } />
                        <Route path="/" element={
                            <React.Suspense fallback={<p>Loading Applications chunk...</p>}>
                                <Applications />
                            </React.Suspense>
                        } />
                        <Route path="/connections" element={
                            <React.Suspense fallback={<p>Loading connections chunk...</p>}>
                                <Connections />
                            </React.Suspense>
                        } />
                        <Route path="/cost" element={
                            <React.Suspense fallback={<p>Loading cost chunk...</p>}>
                                <Cost />
                            </React.Suspense>
                        } />
                        <Route path="/docs" element={
                            <React.Suspense fallback={<p>Loading Docs chunk...</p>}>
                                <Docs />
                            </React.Suspense>
                        } />
                        <Route path="/security" element={
                            <React.Suspense fallback={<p>Loading Security chunk...</p>}>
                                <Security />
                            </React.Suspense>
                        } />
                        <Route path="/404" element={
                            <React.Suspense fallback={<p>Loading Not Found chunk...</p>}>
                                <NotFound />
                            </React.Suspense>
                        } />
                    </Routes>
                </div>
            </RightSectionWrapper>
        </div>
    );
};

export default RoutesApp;
