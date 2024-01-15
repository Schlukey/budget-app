import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/home/home';
import Budget from '../pages/budget/budget';
import Create from '../pages/create/create';

export enum RoutesList {
  Dashboard = '/',
  Budget = '/budget/:id',
  Create = '/create',
}

export const Router: React.FC = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path={RoutesList.Dashboard} element={<Dashboard />} />
        <Route path={RoutesList.Budget} element={<Budget />} />
        <Route path={RoutesList.Create} element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
