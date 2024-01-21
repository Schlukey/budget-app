import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/home/home';
import Budget from '../pages/budget/budget';
import Create from '../pages/create/create';
import Track from '../pages/track/track';
import Generate from '../pages/generate/generate';

export enum RoutesList {
  Dashboard = '/',
  Budget = '/budget',
  Create = '/create',
  Track = '/track',
  Generate = '/generate',
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path={RoutesList.Dashboard} element={<Dashboard />} />
        <Route path={RoutesList.Budget} element={<Budget />} />
        <Route path={RoutesList.Create} element={<Create />} />
        <Route path={RoutesList.Track} element={<Track />} />
        <Route path={RoutesList.Generate} element={<Generate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
