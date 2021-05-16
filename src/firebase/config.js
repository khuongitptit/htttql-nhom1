import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCLPDZ9qB725GZsbqCBM8x7R6EGdgrmruk',
	authDomain: 'htttql-nhom1.firebaseapp.com',
	projectId: 'htttql-nhom1',
	storageBucket: 'htttql-nhom1.appspot.com',
	messagingSenderId: '575280840565',
	appId: '1:575280840565:web:f8aa2783fd703ad6679d3c',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
