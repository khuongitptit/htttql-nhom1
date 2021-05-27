import React, { Component } from 'react';
import _ from 'lodash';
import Slider from 'react-slick';
import { addToCart, getById, getCart } from '../firebase/client';
import Header from './Header';
import Footer from './Footer';
import { Redirect } from 'react-router-dom';
import { message, InputNumber } from 'antd';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
const ImageSlider = ({imgs}) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    autoplay:true,
    duration: 2000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: 'product-images-slider',
  };
  return (
    <Slider {...settings}>
      {imgs.map(img => (
        <img className='product-slider-img' src={img} />
      ))}
    </Slider>
  );
};
class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
      cart: [],
			redirect: false,
			product: {},
			quantity: 1,
		};
	}
	componentDidMount() {
		const productId = this.props.match.params.productId;
		getById(productId).then(product => {
			this.setState({ product: product });
    });
    this.updateCart();
  }
  updateCart = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if(_.isEmpty(user)) {
      return;
    }
    getCart(user.id).then(cart => {
      this.setState({cart});
    })
  }
	addToCard = productId => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (!user) {
			this.setState({ redirect: true }, () => this.setState({ redirect: false }));
			return;
		}
		if (!this.state.quantity) {
			return;
		}
		addToCart({ userId: user.id, productId, quantity: this.state.quantity })
			.then(res => {
        message.success({ content: 'Đã thêm vào giỏ hàng' });
        this.updateCart();
			})
			.catch(err => {
				message.error({ content: 'Đã có lỗi' });
			});
	};
	handleChangeQuantity = value => {
		this.setState({ quantity: value });
	};
	render() {
		const { product } = this.state;
		// const user = JSON.parse(localStorage.getItem('user'));
		if (this.state.redirect) return <Redirect to="login" />;
		return (
			<div>
				<Header cart={this.state.cart}/>
				<div class="section">
					<div class="container">
						<div class="row">
							<div class="col-md-5 col-md-push-2">
								{/* <div id="product-main-img">
									<div class="product-preview">
										<img src="./img/product01.png" alt="" />
									</div>

									<div class="product-preview">
										<img src="./img/product03.png" alt="" />
									</div>

									<div class="product-preview">
										<img src="./img/product06.png" alt="" />
									</div>

									<div class="product-preview">
										<img src="./img/product08.png" alt="" />
									</div>
								</div> */}
							</div>
							<div class="col-md-2  col-md-pull-5">
								<div id="product-imgs">
									{/* {_.get(product, 'photos', []).map(image => {
										return (
											<div class="product-preview">
												<img src={image} alt="" />
											</div>
										);
									})} */}
                  <ImageSlider imgs={_.get(product, 'photos', [])}/>
								</div>
							</div>
							<div class="col-md-5">
								<div class="product-details">
									<h2 class="product-name">{_.get(product, 'name')}</h2>
									<div>
										<div class="product-rating">
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-o"></i>
										</div>
									</div>
									<div>
										<h3 class="product-price">{_.get(product, 'price')}</h3>
										<span class="product-available">Có sẵn</span>
									</div>
									<p>{_.get(product, 'description')}</p>
									<div class="add-to-cart">
										<div class="qty-label">
											Số lượng
											<div class="input-number">
												<InputNumber value={this.state.quantity} min={1} onChange={this.handleChangeQuantity} />
											</div>
										</div>
										<button class="add-to-cart-btn" onClick={() => this.addToCard(product.id)}>
											{' '}
											Thêm vào giỏ
										</button>
									</div>

									<ul class="product-links">
										<li>Category:</li>
										<li>
											<a href="#">{_.get(product, 'category')}</a>
										</li>
									</ul>

									<ul class="product-links">
										<li>Share:</li>
										<li>
											<a href="#">
												<i class="fa fa-facebook"></i>
											</a>
										</li>
										<li>
											<a href="#">
												<i class="fa fa-twitter"></i>
											</a>
										</li>
										<li>
											<a href="#">
												<i class="fa fa-google-plus"></i>
											</a>
										</li>
										<li>
											<a href="#">
												<i class="fa fa-envelope"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-md-12">
								<div id="product-tab">
									<ul class="tab-nav">
										<li class="active">
											<a data-toggle="tab" href="#tab1">
												Description
											</a>
										</li>
										<li>
											<a data-toggle="tab" href="#tab2">
												Details
											</a>
										</li>
										<li>
											<a data-toggle="tab" href="#tab3">
												Reviews (3)
											</a>
										</li>
									</ul>
									<div class="tab-content">
										<div id="tab1" class="tab-pane fade in active">
											<div class="row">
												<div class="col-md-12">
													<p>
														{_.get(product, 'description')}
													</p>
												</div>
											</div>
										</div>
										<div id="tab2" class="tab-pane fade in">
											<div class="row">
												<div class="col-md-12">
													<p>
														Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
														ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
														laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
														voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
														cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
													</p>
												</div>
											</div>
										</div>
										<div id="tab3" class="tab-pane fade in">
											<div class="row">
												<div class="col-md-3">
													<div id="rating">
														<div class="rating-avg">
															<span>4.5</span>
															<div class="rating-stars">
																<i class="fa fa-star"></i>
																<i class="fa fa-star"></i>
																<i class="fa fa-star"></i>
																<i class="fa fa-star"></i>
																<i class="fa fa-star-o"></i>
															</div>
														</div>
														<ul class="rating">
															<li>
																<div class="rating-stars">
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																</div>
																<div class="rating-progress">
																	<div style={{ width: '80%' }}></div>
																</div>
																<span class="sum">3</span>
															</li>
															<li>
																<div class="rating-stars">
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star-o"></i>
																</div>
																<div class="rating-progress">
																	<div style={{ width: '60%' }}></div>
																</div>
																<span class="sum">2</span>
															</li>
															<li>
																<div class="rating-stars">
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																</div>
																<div class="rating-progress">
																	<div></div>
																</div>
																<span class="sum">0</span>
															</li>
															<li>
																<div class="rating-stars">
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																</div>
																<div class="rating-progress">
																	<div></div>
																</div>
																<span class="sum">0</span>
															</li>
															<li>
																<div class="rating-stars">
																	<i class="fa fa-star"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																	<i class="fa fa-star-o"></i>
																</div>
																<div class="rating-progress">
																	<div></div>
																</div>
																<span class="sum">0</span>
															</li>
														</ul>
													</div>
												</div>
												<div class="col-md-6">
													<div id="reviews">
														<ul class="reviews">
															<li>
																<div class="review-heading">
																	<h5 class="name">John</h5>
																	<p class="date">27 DEC 2018, 8:0 PM</p>
																	<div class="review-rating">
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star-o empty"></i>
																	</div>
																</div>
																<div class="review-body">
																	<p>
																		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
																		incididunt ut labore et dolore magna aliqua
																	</p>
																</div>
															</li>
															<li>
																<div class="review-heading">
																	<h5 class="name">John</h5>
																	<p class="date">27 DEC 2018, 8:0 PM</p>
																	<div class="review-rating">
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star-o empty"></i>
																	</div>
																</div>
																<div class="review-body">
																	<p>
																		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
																		incididunt ut labore et dolore magna aliqua
																	</p>
																</div>
															</li>
															<li>
																<div class="review-heading">
																	<h5 class="name">John</h5>
																	<p class="date">27 DEC 2018, 8:0 PM</p>
																	<div class="review-rating">
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star"></i>
																		<i class="fa fa-star-o empty"></i>
																	</div>
																</div>
																<div class="review-body">
																	<p>
																		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
																		incididunt ut labore et dolore magna aliqua
																	</p>
																</div>
															</li>
														</ul>
														<ul class="reviews-pagination">
															<li class="active">1</li>
															<li>
																<a href="#">2</a>
															</li>
															<li>
																<a href="#">3</a>
															</li>
															<li>
																<a href="#">4</a>
															</li>
															<li>
																<a href="#">
																	<i class="fa fa-angle-right"></i>
																</a>
															</li>
														</ul>
													</div>
												</div>
												<div class="col-md-3">
													<div id="review-form">
														<form class="review-form">
															<input class="input" type="text" placeholder="Your Name" />
															<input class="input" type="email" placeholder="Your Email" />
															<textarea class="input" placeholder="Your Review"></textarea>
															<div class="input-rating">
																<span>Your Rating: </span>
																<div class="stars">
																	<input id="star5" name="rating" value="5" type="radio" />
																	<label for="star5"></label>
																	<input id="star4" name="rating" value="4" type="radio" />
																	<label for="star4"></label>
																	<input id="star3" name="rating" value="3" type="radio" />
																	<label for="star3"></label>
																	<input id="star2" name="rating" value="2" type="radio" />
																	<label for="star2"></label>
																	<input id="star1" name="rating" value="1" type="radio" />
																	<label for="star1"></label>
																</div>
															</div>
															<button class="primary-btn">Submit</button>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ProductDetail;
