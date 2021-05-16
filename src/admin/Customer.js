import React, { Component } from 'react';
import MenuComponent from './MenuComponent';

class Customer extends Component {
	render() {
		return (
			<div>
        <MenuComponent />
        <section class="ftco-section">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-4">
							<h2 class="heading-section">Quản lý khách hàng</h2>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 row">
							<div class="col-md-6 row">
								<label for="" class="col-md-4">
									Giới tính
								</label>

								<select class="form-select col-md-6" aria-label="Default select example">
									<option value="1" selected>
										Tất cả
									</option>
									<option value="2">Nam</option>
									<option value="3">Nữ</option>
								</select>
							</div>
							<div class="col-md-6 row">
								<label for="" class="col-md-4">
									Loại khách hàng
								</label>
								<select class="form-select col-md-6" aria-label="Default select example">
									<option value="1" selected>
										Tất cả
									</option>
									<option value="2">VIP</option>
									<option value="3">Thường</option>
								</select>
							</div>
						</div>
						<div class="col-md-12 row">
							<div class="col-md-2">
								<button class="search">Tìm kiếm</button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<h3 class="h5 mb-4 text-center">Danh sách khách hàng</h3>
							<div class="table-wrap">
								<table class="table">
									<thead class="thead-primary">
										<tr>
											<th>&nbsp;</th>
											<th>Họ tên</th>
											<th>Username</th>
											<th>Địa chỉ</th>
											<th>&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										<tr class="alert" role="alert">
											<td>
												<label class="checkbox-wrap checkbox-primary">
													<input type="checkbox" />
													<span class="checkmark"></span>
												</label>
											</td>
											<td>Phạm Ngọc Nam</td>
											<td>phamnam99</td>
											<td>Thanh Xuân, Hà Nội</td>
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

export default Customer;
