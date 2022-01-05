import { Reducer, AnyAction } from 'redux'; 
import produce from 'immer';

import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
	items: [],
	failuredStockCheck: [],
};

function cart(state = INITIAL_STATE, action: AnyAction) {
	return produce(state, draft => {
		switch(action.type) {
			case ActionTypes.addProductToCartSuccess:
				const { product } = action.payload;

				const productInCartIndex = draft.items.findIndex(item => 
					item.product.id === product.id
				); 

				if(productInCartIndex >= 0 ) {
					draft.items[productInCartIndex].quantity += 1;
				} else {
					draft.items.push({
						product,
						quantity: 1,
					})
				}

				break;
			
			case ActionTypes.addProductToCartFailure:
				const { productId } = action.payload;
				draft.failuredStockCheck.push(productId);
				
				break;
			default:
				return draft;
		}
	});
}

// const cart: Reducer<ICartState> = () => {
// 	return INITIAL_STATE;
// }

export default cart;