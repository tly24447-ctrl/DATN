import jwt_decode from "jwt-decode";
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultComponent from './presentation/components/DefaultComponent/DefaultComponent';
import * as UserService from './data/api/UserService';
import Loading from './presentation/components/LoadingComponent/Loading';
import { routes } from './presentation/routes';
import { resetUser, updateUser } from './presentation/state/slices/userSlide';
import { isJsonString } from './shared/utils/utils';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken =  jwt_decode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }

  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App