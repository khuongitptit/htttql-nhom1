import React, { Component } from 'react';
import MenuComponent from './MenuComponent';

class Statistic extends Component {
	render() {
		return (
			<div>
        <MenuComponent />
        <section class="ftco-section">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-4">
							<h2 class="heading-section">Thống kê theo ngày</h2>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 row">
							<div class="col-md-6 row">
								<label for="" class="col-md-4">
									Từ
								</label>
								<input class="col-md-6" type="date" />
							</div>
							<div class="col-md-6 row">
								<label for="" class="col-md-4">
									Đến
								</label>
								<input class="col-md-6" type="date" />
							</div>
						</div>
						<div class="col-md-12 row">
							<div class="col-md-2">
								<button class="search">Thống kê</button>
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
											<th>Sản phẩm</th>
											<th>Giá bán</th>
											<th>Số lượng</th>
										</tr>
									</thead>
									<tbody>
										<tr class="alert" role="alert">
											<td>
												<img src=""/>
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

export default Statistic;
