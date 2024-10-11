import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import Layout from './components/Layout';

// lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Practice = lazy(() => import('./pages/Practice/Practice'));
const Progress = lazy(() => import('./pages/ProgressOverview'));
const UserProfile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/Error'));

// Classes
const ClassOne = lazy(() => import('./pages/Practice/Class/ClassOne/ClassOne'));
const ClassTwo = lazy(() => import('./pages/Practice/Class/ClassTwo/ClassTwo'));
const ClassThree = lazy(() => import('./pages/Practice/Class/ClassThree/ClassThree'));
const ClassFour = lazy(() => import('./pages/Practice/Class/ClassFour/ClassFour'));
const ClassFive = lazy(() => import('./pages/Practice/Class/ClassFive/ClassFive'));

// Topics
const Addition = lazy(() => import('./pages/Practice/Topic/Addition'));
const Subtraction = lazy(() => import('./pages/Practice/Topic/Subtraction'));
const Multiplication = lazy(() => import('./pages/Practice/Topic/Multiplication'));
const Division = lazy(() => import('./pages/Practice/Topic/Divison'));
const SquareRoots = lazy(() => import('./pages/Practice/Topic/SquareRoots'));
const CubeRoots = lazy(() => import('./pages/Practice/Topic/CubeRoots'));
const Squaring = lazy(() => import('./pages/Practice/Topic/Squaring'));
const Cubing = lazy(() => import('./pages/Practice/Topic/Cubing'));

// ClassOne topics
const CountingAndNumbers = lazy(() => import('./pages/Practice/Class/ClassOne/CountingAndNumbers'));
const BasicAddition = lazy(() => import('./pages/Practice/Class/ClassOne/BasicAddition'));
const BasicSubtraction = lazy(() => import('./pages/Practice/Class/ClassOne/BasicSubtraction'));
const ShapesAndPatterns = lazy(() => import('./pages/Practice/Class/ClassOne/ShapesAndPatterns'));
const ComparingNumbers = lazy(() => import('./pages/Practice/Class/ClassOne/ComparingNumbers'));

// ClassTwo topics
const AdvancedAddition = lazy(() => import('./pages/Practice/Class/ClassTwo/AdvancedAddition'));
const AdvancedSubtraction = lazy(() => import('./pages/Practice/Class/ClassTwo/AdvancedSubtraction'));
const PlaceValue = lazy(() => import('./pages/Practice/Class/ClassTwo/PlaceValue'));
const IntroductionToTime = lazy(() => import('./pages/Practice/Class/ClassTwo/IntroductionToTime'));
const MoneyAndCountingCoins = lazy(() => import('./pages/Practice/Class/ClassTwo/MoneyAndCountingCoins'));

import { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return children;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
            <Route path="progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

            <Route path="/Class/ClassOne" element={<ClassOne />} />
            <Route path="/Class/ClassTwo" element={<ClassTwo />} />
            <Route path="/Class/ClassThree" element={<ClassThree />} />
            <Route path="/Class/ClassFour" element={<ClassFour />} />
            <Route path="/Class/ClassFive" element={<ClassFive />} />

            <Route path="/Topic/Addition" element={<Addition />} />
            <Route path="/Topic/Subtraction" element={<Subtraction />} />
            <Route path="/Topic/Multiplication" element={<Multiplication />} />
            <Route path="/Topic/Divison" element={<Division />} />
            <Route path="/Topic/SquareRoots" element={<SquareRoots />} />
            <Route path="/Topic/CubeRoots" element={<CubeRoots />} />
            <Route path="/Topic/Squaring" element={<Squaring />} />
            <Route path="/Topic/Cubing" element={<Cubing />} />

            <Route path="/Class/ClassOne/CountingAndNumbers" element={<CountingAndNumbers />} />
            <Route path="/Class/ClassOne/BasicAddition" element={<BasicAddition />} />
            <Route path="/Class/ClassOne/BasicSubtraction" element={<BasicSubtraction />} />
            <Route path="/Class/ClassOne/ShapesAndPatterns" element={<ShapesAndPatterns />} />
            <Route path="/Class/ClassOne/ComparingNumbers" element={<ComparingNumbers />} />

            <Route path="/Class/ClassTwo/AdvancedAddition" element={<AdvancedAddition />} />
            <Route path="/Class/ClassTwo/AdvancedSubtraction" element={<AdvancedSubtraction />} />
            <Route path="/Class/ClassTwo/PlaceValue" element={<PlaceValue />} />
            <Route path="/Class/ClassTwo/IntroductionToTime" element={<IntroductionToTime />} />
            <Route path="/Class/ClassTwo/MoneyAndCountingCoins" element={<MoneyAndCountingCoins />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;