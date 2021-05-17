import firebase from './config';
import _ from 'lodash';
const db = firebase.firestore();
const storage = firebase.storage();

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

export const addProducts = product => {
	return db.collection('products').add({...product, createdAt: firebase.firestore.Timestamp.now() });
};

export const updateProduct = product => {
	return db.collection('products').doc(product.id).update(product);
};

export const removeProduct = productId => {
	return db.collection('products').doc(productId).delete();
};

export const uploadFile = async file => {
	const storageRef = storage.ref(`/photos/${file.name}`);
	await storageRef.put(file);
	return storageRef.getDownloadURL();
};

const _getUserById = userId => {
	return db
		.collection('customers')
		.doc(userId)
		.get()
		.then(doc => ({
			id: doc.id,
			...doc.data(),
		}));
};

const _getProductById = productId => {
	return db
		.collection('products')
		.doc(productId)
		.get()
		.then(doc => ({
			id: doc.id,
			...doc.data(),
		}));
};

export const getOrders = filter => {
	return db
		.collection('orders')
		.get()
		.then(res => {
			const allOrders = Promise.all(
				res.docs.map(async doc => {
					const customer = await _getUserById(doc.data().userId);
					const orderItems = await Promise.all(doc.data().items.map(async item => {
            const product = await _getProductById(item.id);
            return {
              ...item,
              product
            }
          }))
					return {
						id: doc.id,
            ...doc.data(),
            customer,
            orderItems
					};
				})
			);
			if (filter) {
				return _.filter(allOrders, product => _.includes(_.toLower(product.name), _.toLower(filter)));
			}
			return allOrders;
		});
};

export const confirmOrder = orderId => {
  return db.collection('orders').doc(orderId).update({status: 'ok'});
}