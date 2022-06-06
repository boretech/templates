import { createStore } from 'vuex'

const moduleImport = import.meta.globEager('./modules/*.js')
console.log(Object.keys(moduleImport))
const modules = Object.keys(moduleImport).reduce((modules, modulePath) => {

  // const moduleName = modules.default.name
  // const value = moduleImport(modulePath)
  // modules[moduleName] = value.default
  // return modules
  return modules
}, {})


export default createStore({
  modules: {
    preloader
  }
})