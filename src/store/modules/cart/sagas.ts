import { AxiosResponse } from 'axios';
import { all, takeLatest, select, call, put} from 'redux-saga/effects';

import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';

import api from '../../../services/api';

import { IState } from '../..';
import { ActionTypes, IStockResponse } from './types';

type ICheckProductInStockRequest = ReturnType<typeof addProductToCartRequest>

function* checkProductInStock({ payload }: ICheckProductInStockRequest) {
	const { product } = payload;

	const currentQuantity: number = yield select((state: IState) => {
		return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
	})

	const productQuantity: AxiosResponse<IStockResponse> = yield call(api.get, `/stock/${product.id}`)


	if(productQuantity.data.quantity > currentQuantity) {
		yield put(addProductToCartSuccess(product))
	} else {
		yield put(addProductToCartFailure(product.id))
	}
}

export default all([
	takeLatest(ActionTypes.addProductToCartRequest, checkProductInStock)
])