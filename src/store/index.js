import { createStore } from 'vuex'

const moduleImport = import.meta.globEager('./modules/*.js')

const modules = Object.keys(moduleImport).reduce((modules, key) => {
  const module = moduleImport[key].default
  modules[module.name] = module
  return modules
}, {})


export default createStore({
  modules,
})