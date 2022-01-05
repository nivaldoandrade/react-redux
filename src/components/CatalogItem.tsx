import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IProduct } from "../store/modules/cart/types";

import { addProductToCartRequest } from "../store/modules/cart/actions";
import { IState } from "../store";

interface ICatalogItemProps {
	product: IProduct;
}

export function CatalogItem({product}: ICatalogItemProps) {
	const dispatch = useDispatch();

	const hasFailuredStock = useSelector((state: IState) => {
		return state.cart.failuredStockCheck.includes(product.id);
	})


	const handleAddProductToCart = useCallback(() => {
		dispatch(addProductToCartRequest(product))
	}, [dispatch, product])

	return (
		<article>
		<strong>{product.title}</strong> {" - "}
		<span>R$ {product.price}</span> {" "}
		<button 
			type="button"
			onClick={handleAddProductToCart}
			disabled={hasFailuredStock}
		>
			Comprar
		</button>
		{hasFailuredStock && <span style={{ color: 'red' }}>Produto fora de estoque</span>}
	</article>
	)
}