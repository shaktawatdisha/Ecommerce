import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import WishlistItem from './WishlistItem';
import {fetchWishItem, removeWishItem} from '../redux/actions/wishlistActions'
import { productDetail } from '../redux/actions/productActions';

const Wishlist = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.fetchWishlist.products) || [];


    useEffect(() => {
        dispatch(fetchWishItem())
    }, [dispatch])



    return (
        <Container>
            <h1 className='mt-3'>Wishlist</h1>
            <ul>
                {items.length > 0 ? ( 
                    items.map((item, index) => (
                        <WishlistItem 
                            key={index} 
                            item={item} 
                            removeWishItem={() => dispatch(removeWishItem(item.id))}
                        />
                    ))
                ) : (
                    <li>No items in the wishlist.</li> 
                )}
            </ul>
        </Container>
    );
}

export default Wishlist;
