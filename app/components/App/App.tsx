import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import { PublicRoute } from '../../routes/PublicRoute';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import FormPage from '../../pages/FormPage/FormPage';
import UncontrolledForm from '../UncontrolledForm/UncontrolledForm';
import ControlledForm from '../ControlledForm/ControlledForm';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
        <Route index path="/" element={<Home />} />
        <Route path="home/" element={<Home />} />
        <Route path="?page=:pageNumber" element={<Home />} />
        <Route path="?page=:pageNumber&Character=:CharacterId" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="formPage" element={<FormPage />}>
          <Route path="uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="controlled-form" element={<ControlledForm />} />
        </Route>
      </Route>
    </Routes>
    </Provider>    
  );
}

export default App;
