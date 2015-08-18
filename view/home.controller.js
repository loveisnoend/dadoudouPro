sap.ui.controller("com.zhenergy.bo.view.home", {
		onInit: function() {
            this.loadChart();
		},

		loadChart: function() {
			require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
				draw);

			function draw(e) {
				drawpie01(e);
				drawpie02(e);
				drawpie03(e);
			}
			//折线通用
			function drawpie01(e) {
				var c = e.init(document.getElementById("home_div02_div01_div01"));
				var option = {
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '70%'],
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								emphasis: {
									label: {
										show: true,
										position: 'center',
										textStyle: {
											fontSize: '30',
											fontWeight: 'bold'
										}
									}
								}
							},
							data: [
								{
									value: 335,
								},
								{
									value: 310,
								},

                            ]
                        }
                    ]
				};
				c.setOption(option);
			}
			function drawpie02(e) {
				var c = e.init(document.getElementById("home_div02_div01_div02"));
				var option = {
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '70%'],
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								emphasis: {
									label: {
										show: true,
										position: 'center',
										textStyle: {
											fontSize: '30',
											fontWeight: 'bold'
										}
									}
								}
							},
							data: [
								{
									value: 335,
								},
								{
									value: 310,
								},

                            ]
                        }
                    ]
				};
				c.setOption(option);
			}
			function drawpie03(e) {
				var c = e.init(document.getElementById("home_div02_div01_div03"));
				var option = {
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: ['50%', '70%'],
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								emphasis: {
									label: {
										show: true,
										position: 'center',
										textStyle: {
											fontSize: '30',
											fontWeight: 'bold'
										}
									}
								}
							},
							data: [
								{
									value: 335,
								},
								{
									value: 310,
								},

                            ]
                        }
                    ]
				};
				c.setOption(option);
			}
			
		}
		});