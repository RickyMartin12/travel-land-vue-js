import Firebase from 'firebase/compat/app'
import credentials from './credentials'

export const App = Firebase.initializeApp(credentials.config);