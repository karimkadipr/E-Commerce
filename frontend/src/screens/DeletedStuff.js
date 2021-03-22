/*                   <div
                    to={`/order/${product._id}`}
                    key={product._id}
                    className='product_item_container'>
                    <Link to={`/order/${product._id}`} className='image_link'>
                      <img
                        className='image_product_home'
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className='title_price_rating'>
                      <div className='title_price_rating_right'>
                        <Link to={`/order/${product._id}`}>{product.name}</Link>
                      </div>
                      <div className='title_price_rating_left'>
                        ${product.price}
                      </div>
                    </div>
                    <div className='rating_container'>
                      <RatingComponent rating={product.rating} />
                    </div>
                    <div className='addToCartButton'>
                      {product.countInStock === 0 ? (
                        <p>Unavailable</p>
                      ) : (
                        <button
                          className='btn_add_cart_home_screen'
                          onClick={() => handleAddToCart(product._id)}>
                          <AddShoppingCartIcon />
                        </button>
                      )}
                    </div>
                  </div> */
