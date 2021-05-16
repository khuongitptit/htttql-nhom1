import firebase from './config';
const db = firebase.firestore();

export const getAllProducts = () => {
	return db
		.collection('products')
		.get()
		.then(res => {
			return res.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
		});
};
