import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import { PublicRoute } from '../../routes/PublicRoute';

function App() {
return (
    <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index path="" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
  );
}

export default App;
