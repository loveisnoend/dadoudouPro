sap.ui.controller("com.zhenergy.bo.view.performance", {
	onInit: function() {
	    this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
		
	},
	onBeforeShow: function(evt) {
	    date1 = new Array();
		date2 = new Array();
		data1 = new Array();
		data2 = new Array();
		var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			for (var i in sRes.results) {
				if (sRes.results[i].A24ZI_MOBCOL3 == '1') {
					date1.push(sRes.results[i].A24ZI_MOBCOL1.substring(4, 8));
					data1.push(sRes.results[i].A24ZI_MOBCOL2);
				} else if (sRes.results[i].A24ZI_MOBCOL3 == '2') {
					date2.push(sRes.results[i].A24ZI_MOBCOL1.substring(4, 8));
					data2.push(sRes.results[i].A24ZI_MOBCOL2);
				}
			};
            
			this.loadChart();
			this.loadData();
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
		sap.ui.getCore().getModel().read("/ZI_MOB_REP_MOBILE2Results", mParameters);
	},
	
	loadChart: function() {
		require(
            [
                'echarts',
                'echarts/chart/line'
            ],
			draw);

		function draw(e) {
			drawswdl(e);
			drawpjswdj(e);
		}
		//折线通用
		function drawline(e, date, data, title, color, id, value) {
			var c = e.init(document.getElementById(id));
			var w = document.getElementById(id).clientWidth;
			var h = document.getElementById(id).clientHeight;
			var option = {
				title: {
					show: true,
					text: value,
					padding: 10,
					x: 'center',
					textStyle: {
						color: '#FFF',
						fontFamily: '微软雅黑',
						fontSize: 18,
						fontStyle: 'normal',
						fontWeight: 'bold'
					}
				},
				tooltip: {
					show: false,
					trigger: 'axis'
				},
				legend: {
					show: false,
					data: [title]
				},
				grid: {
					x: '60px',
					y: '44px',
					x2: '30px',
					y2: '40px'
				},
				xAxis: [
					{
						axisTick: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#FFF'
							}
						},
						type: 'category',
						boundaryGap: false,
						data: date //['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
                    }
                ],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							formatter: '{value} ',
							textStyle: {
								color: '#FFF'
							}
						},
						scale: true
                    }
                ],
				series: [{
					name: title,
					type: 'line',
					itemStyle: {
						normal: {
							color: color,
							lineStyle: {
								color: color
							}
						}
					},
					data: data
				}]
			};
			c.setOption(option);
		}
		//上网电量
		function drawswdl(e) {
			drawline(e, date1, data1, '上网电量', '#3DCB97', 'swdl', data1[data1.length - 1] + '亿千瓦时');
		}
		//平均上网电价
		function drawpjswdj(e) {
			drawline(e, date2, data2, '平均上网电价', '#3DCB97', 'pjswdj', data2[data2.length - 1] + '元/千瓦时');
		}
	},
	loadData: function() {
		var swdl_data = data1[data1.length - 1];
		var pjswdj_data = data2[data2.length - 1];
		var sr_data = (swdl_data * pjswdj_data).toFixed(1);
		var a = 0;
		var sr_prec = a.toFixed(1);
		document.getElementById('sr_num').innerHTML = sr_data;
		document.getElementById('sr_prec').innerHTML = '同比' + sr_prec + '%';
	},
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.zhenergy.bo.view.performance
	 */
	//	onInit: function() {
	//
	//	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf com.zhenergy.bo.view.performance
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf com.zhenergy.bo.view.performance
	 */
	//	onAfterRendering: function() {
	//
	//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf com.zhenergy.bo.view.performance
	 */
	//	onExit: function() {
	//
	//	}

});