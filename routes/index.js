import apiRoutes from './api'

export default (app) => {
  app.use('/api', apiRoutes)
}
