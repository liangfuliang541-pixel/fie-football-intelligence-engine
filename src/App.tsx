import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import PreMatch from './pages/PreMatch';
import Live from './pages/Live';
import Holding from './pages/Holding';
import Review from './pages/Review';
import Roundtable from './pages/Roundtable';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="matches" element={<Matches />} />
        <Route path="prematch" element={<PreMatch />} />
        <Route path="live" element={<Live />} />
        <Route path="holding" element={<Holding />} />
        <Route path="review" element={<Review />} />
        <Route path="roundtable" element={<Roundtable />} />
      </Route>
    </Routes>
  );
}
