import React, { Component } from 'react';
import MenuComponent from './MenuComponent';

class Order extends Component {
	render() {
		return (
			<div>
        <MenuComponent />
        <section class="ftco-section">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-4">
							<h2 class="heading-section">Quản lý đơn hàng</h2>
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
								<button class="search">Tìm kiếm</button>
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
											<th>Khách đặt</th>
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
												<div class="img" src=""></div>
											</td>
											<td>
												<div class="email">
													<span>Sneakers Shoes 2020 For Men</span>
													<span></span>
												</div>
											</td>
											<td>$44.99</td>
											<td>Ngọc Nam</td>
											<td>
												<button style={{border: 0}}>Duyệt đơn</button>
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

export default Order;
