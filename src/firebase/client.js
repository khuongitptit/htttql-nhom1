import firebase from './config';
import _ from 'lodash';
const db = firebase.firestore();

export const register = data => {
	return db.collection('customers').add(data);
};

export const login = data => {
	return db
		.collection('customers')
		.where('username', '==', data.username)
		.where('password', '==', data.password)
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

export const getProduct = (category, filter) => {
	if (category !== 'all') {
		return _getByCategory(category, filter);
	}
	return _getAll(filter);
};

const _getByCategory = (category, filter) => {
	if (filter) {
		return db
			.collection('products')
			.where('category', '==', category)
			.get()
			.then(res => {
				const allProduct = res.docs.map(doc => {
					return {
						id: doc.id,
						...doc.data(),
					};
        });
        return _.filter(allProduct, product => _.includes(_.toLower(product.name), _.toLower(filter)))
			});
	}
	return db
		.collection('products')
		.where('category', '==', category)
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

const _getAll = filter => {
	if (filter) {
		return db
			.collection('products')
			.get()
			.then(res => {
				const allProduct = res.docs.map(doc => {
					return {
						id: doc.id,
						...doc.data(),
					};
        });
        return _.filter(allProduct, product => _.includes(_.toLower(product.name), _.toLower(filter)))
			});
	}
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

export const getById = productId => {
	return db
		.collection('products')
		.doc(productId)
		.get()
		.then(doc => ({
			id: doc.id,
			...doc.data(),
		}));
};

export const addToCart = async data => {
	const { userId, productId, quantity } = data;
	const existed = await db
		.collection('carts')
		.where('userId', '==', userId)
		.where('productId', '==', productId)
		.get()
		.then(res => {
			return res.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
		});
	if (!_.isEmpty(existed)) {
		return db
			.collection('carts')
			.doc(existed[0].id)
			.update({ quantity: existed[0].quantity + quantity });
	}
	return db.collection('carts').add(data);
};

export const getCart = userId => {
	return db
		.collection('carts')
		.where('userId', '==', userId)
		.get()
		.then(res => {
			return Promise.all(res.docs.map(async doc => {
        const productId = doc.data().productId;
				return getById(productId).then(product => {
					return {
						id: doc.id,
						...doc.data(),
						product,
					};
				});
			}));
		});
};

export const order = async data => {
	return db.collection('orders').add(data).then((res) => {
    data.items.map(item => db.collection('carts').doc(item.id).delete());
    return res;
  });
};
