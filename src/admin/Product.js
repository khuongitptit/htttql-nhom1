import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import {getAllProducts} from '../firebase/admin';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state= {
      products: []
    }
  }
  componentDidMount() {
    const products = getAllProducts();
    this.setState({products})
  }
	render() {
		return (
			<div>
        <MenuComponent />
        <section class="ftco-section">
				<div
					class="modal fade"
					id="exampleModalLong"
					tabindex="-1"
					role="dialog"
					aria-labelledby="exampleModalLongTitle"
					aria-hidden="true"
				>
					<div class="modal-dialog" style={{ maxWidth: '60%' }} role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLongTitle">
									Thêm mặt hàng
								</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group row">
											<label for="" class="col-md-4">
												Tên hàng hóa
											</label>
											<input type="text" class="col-md-6" />
										</div>
										<div class="form-group row">
											<label for="" class="col-md-4">
												Giá bán
											</label>
											<input type="text" class="col-md-6" />
										</div>
										<div class="form-group row">
											<label for="" class="col-md-4">
												Loại sản phẩm
											</label>
											<select class="form-select col-md-6" aria-label="Default select example">
												<option value="1" selected>
													Quần áo
												</option>
												<option value="2">Phụ kiện</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group row">
											<label for="" class="col-md-4">
												Số lượng
											</label>
											<input type="text" class="col-md-6" />
										</div>
										<div class="form-group row">
											<label for="" class="col-md-4">
												Mô tả chi tiết
											</label>
											<textarea type="text" class="col-md-6"/>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<div class="col-md-12">
									<div class="col-md-2">
										<button class="search" style={{border: 0}}>Thêm</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-4">
							<h2 class="heading-section">Quản lý hàng hóa</h2>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 row">
							<div class="col-md-6 row">
								<label for="" class="col-md-4">
									Loại sản phẩm
								</label>
								<select class="form-select col-md-6" aria-label="Default select example">
									<option value="1" selected>
										Tất cả
									</option>
									<option value="2">Quần áo</option>
									<option value="3">Phụ kiện</option>
								</select>
							</div>
						</div>
						<div class="col-md-12">
							<div class="col-md-2">
								<button class="search" style={{border: 0, float: 'right'}}>Tìm kiếm</button>
							</div>
						</div>
						<div class="col-md-12">
							<div class="col-md-2">
								<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
									Thêm hàng hóa
								</button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h3 class="h5 mb-4 text-center">Danh sách hàng hóa</h3>
							<div class="table-wrap">
								<table class="table">
									<thead class="thead-primary">
										<tr>
											<th>&nbsp;</th>
											<th>&nbsp;</th>
											<th>Sản phẩm</th>
											<th>Giá</th>
											<th>Số lượng</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										<tr class="alert" role="alert">
											<td>
												<label class="checkbox-wrap checkbox-primary">
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
											</td>
											<td>
												<img src="" />
											</td>
											<td>
												<div class="email">
													<span>Sneakers Shoes 2020 For Men</span>
													<span></span>
												</div>
											</td>
											<td>$44.99</td>
											<td class="quantity">
												<div class="input-group">
													<input
														type="text"
														name="quantity"
														class="quantity form-control input-number"
														value="2"
														min="1"
														max="100"
													/>
												</div>
											</td>
											<td>
												<button style={{ border: 0 }}>Detail</button>
												<button type="button" class="close" data-dismiss="alert" aria-label="Close">
													<span aria-hidden="true">
														<i class="fa fa-close"></i>
													</span>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
      </div>
		);
	}
}

export default Product;
