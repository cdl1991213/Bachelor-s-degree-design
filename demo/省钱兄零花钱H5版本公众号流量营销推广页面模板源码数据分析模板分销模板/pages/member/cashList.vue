<template>
	<view style="text-align: left">
		<view v-for="(item, index) in list" :key="index" class="item">
			<view>
				<view style="margin-bottom: 8upx;text-align: right;">
					<text style="margin-bottom: 8upx;color: #0e80d2" v-if="item.state==1"> 提现成功</text>
					<text style="margin-bottom: 8upx;color: #0e80d2" v-if="item.state==0"> 提现中</text>
					<text style="margin-bottom: 8upx;color: #e10a07" v-if="item.state==-1"> 提现失败</text>
				</view>

				<view style="color: #999999;font-size: 28upx;">
					<view style="margin-bottom: 8upx"> 支付宝账号 {{item.zhifubao}}</view>
					<view style="margin-bottom: 8upx"> 支付宝姓名 {{item.zhifubaoName}}</view>
					<view style="margin-bottom: 8upx"> 发起时间 {{item.createAt}}</view>
					<view style="margin-bottom: 8upx" v-if="item.state==1">成功时间 {{item.outAt}}</view>
					<view style="margin-bottom: 8upx;color: #e10a07" v-if="item.state==-1">{{item.refund}}</view>

					<view style="margin-bottom: 8upx;text-align: right;">
						<!-- 提现金额： -->
						<text style="color: #e10a07;font-size: 32upx;font-weight: 600"> ￥{{item.money}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="list.length > 10">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
		<empty v-if="list.length === 0" des="暂无数据" show="false"></empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				size: 10,
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onLoad: function(e) {
			this.getMoney('');
		},
		methods: {
			getMoney(type) {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...'
				});
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/cash/selectPayDetails?page=' + this.page + '&limit=' + this.size + '&userId=' + userId).then(
					res => {
						if (res.code === 0) {
							if (this.page === 1) {
								this.list = [];
							}
							res.data.list.forEach(d => {
								this.list.push(d);
							});
							this.loadingType = 0;
						} else {
							this.loadingType = 2;
						}
						uni.hideLoading();
						if (type === 'Refresh') {
							uni.stopPullDownRefresh(); // 停止刷新
						}
					});
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getMoney('');
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getMoney('Refresh');
		}
	}
</script>

<style lang='scss'>
	@import '../../static/css/index.css';

	page {
		background: #FFFFFF;
	}

	.item {
		background: white;
		padding: 32rpx;
		margin: 32rpx;
		font-size: 28rpx;
		box-shadow: 7px 9px 34px rgba(0, 0, 0, 0.1);
		border-radius: 16upx;
	}
</style>
