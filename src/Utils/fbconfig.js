import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

firebaseConfig = {
    
};
  // Initialize Firebase

export default fb = firebase.initializeApp(firebaseConfig);