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
		date = new Array("0701", "0702", "0703", "0704", "0705", "0706", "0707", "0708");
		data3 = new Array(13.3, 20.4, 17.5, 26.9, 23.3, 30.9, 19.8, 26.0);
        data4 = new Array(0.45, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52);
        date01 = new Array("0701", "0702", "0703", "0704", "0705", "0706", "0707", "0708", "0709", "0710", "0711", "0712", "0713", "0714", "0715", "0716", "0717", "0718", "0719", "0720", "0721", "0722", "0723", "0724", "0725", "0726", "0727", "0728", "0729", "0730", "0731");
        data5 = new Array(200, 300, 278, 260, 330, 240, 230, 263, 300, 278, 260, 330, 240, 230, 263, 300, 278, 260, 230, 240, 230, 263, 300, 278, 260, 330, 240, 230, 263, 230, 258);
        
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
			drawrlcb(e);
                drawqtcb(e);
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
                        fontFamily: 'hiragino',
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
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: { type: 'default' },
                            color: color,
                            lineStyle: {
                                color: color,

                            }
                        }
                    },
                    data: data
                }]
            };
            c.showLoading({
                    text: "图表数据正在努力加载...",
                    textStyle: {
                        color: '#FFF'
                    }
                });
                c.hideLoading();
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
		//燃料成本
            function drawrlcb(e) {
                drawline(e, date, data3, '燃料成本', 'red', 'rlcb', data3[data3.length - 1] + '亿元');
            }

            //其他成本
            function drawqtcb(e) {
                drawline(e, date, data4, '其他成本', 'green', 'qtcb', data4[data4.length - 1] + '亿元');
            }
	},
	loadhidChart01:function(){
	    require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            Drawhid01
            );
            function Drawhid01(e) {
                drawdetail01(e);
            }
            function drawdetail01(e) {
                drawline(e, date01, data5, '上网电量', 'green', 'detail01', data5[data5.length - 1] + '亿千瓦时');
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
                        fontFamily: 'hiragino',
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
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: { type: 'default' },
                            color: color,
                            lineStyle: {
                                color: color,

                            }
                        }
                    },
                    data: data
                }]
            };
            c.showLoading({
                    text: "图表数据正在努力加载...",
                    textStyle: {
                        color: '#FFF'
                    }
                });
                c.hideLoading();
            c.setOption(option);
		}
		
	},
	loadhidChart:function(){
	    require(
            [
                'echarts',
                'echarts/chart/bar', //按需加载图表关于bar图的部分
                'echarts/chart/pie'
            ],
            DrawCharts
            );
            function DrawCharts(ec) {
                DrawGauge01(ec);
                DrawGauge02(ec);
                DrawGauge03(ec);
            }
            //创建ECharts柱状图图表
            function DrawGauge03(ec) {
                //--- 柱状图 ---
                var myChart = ec.init(document.getElementById('div03'));
                //图表显示提示信息
                myChart.showLoading({
                    text: "图表数据正在努力加载...",
                    textStyle: {
                        color: '#FFF'
                    }
                });
                myChart.hideLoading();
                myChart.setOption({
                    backgroundColor: 'RGB(41,151,204)',
                    title: {
                        text: '发电标准耗比',


                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                                  color:['#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                         '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'],
                    calculable: true,
                    series: [

                        {
                            name: '面积模式',
                            type: 'pie',
                            radius: [30, 110],
                            center: ['50%', 200],
                            roseType: 'radius',
                            x: '50%',               // for funnel
                            max: 40,                // for funnel
                            sort: 'ascending',     // for funnel
                            data: [
                                   {value:10, name:'台州'},
                                   {value:5, name:'兰溪'},
                                   {value:15, name:'乐清'},
                                   {value:25, name:'长兴'},
                                   {value:20, name:'滨海'},
                                   {value:35, name:'嘉兴'},
                                   {value:30, name:'萧山'},
                                   {value:40, name:'温州'}
                            ]
                        }
                    ]
                });
            }

            function DrawGauge02(ec) {
                //--- 柱状图 ---
                var myChart = ec.init(document.getElementById('div02'));
                //图表显示提示信息
                myChart.showLoading({
                    text: "图表数据正在努力加载...",
                    textStyle: {
                        color: '#FFF'
                    }
                });
                myChart.hideLoading();
                setTimeout(function () {
                    var _ZR = myChart.getZrender();
                    var TextShape = require('zrender/shape/Text');
                    // 补充千层饼
                    _ZR.addShape(new TextShape({
                        style: {
                            x: _ZR.getWidth() / 2,
                            y: _ZR.getHeight() / 2,
                            color: '#666',
                            text: '',
                            textAlign: 'center'
                        }
                    }));
                    _ZR.addShape(new TextShape({
                        style: {
                            x: _ZR.getWidth() / 2 + 200,
                            y: _ZR.getHeight() / 2,
                            brushType: 'fill',
                            color: 'orange',
                            text: '',
                            textAlign: 'left',
                            textFont: 'normal 20px Hiragino'
                        }
                    }));
                    _ZR.refresh();
                }, 2000);
                myChart.setOption({
                    backgroundColor: 'RGB(41,151,204)',
                    title: {
                        text: '其他成本',
                        subtext: '',
                        x: 'left',
                        y: 'top',
                        textStyle: {
                            color: 'white'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y: 'bottom',
                        data: ['乐清', '滨海', '嘉兴', '长兴', '兰溪', '台州']
                    },
                    calculable: false,
                    series: (function () {
                        var series = [];
                        for (var i = 0; i < 30; i++) {
                            series.push({
                                name: '其他成本',
                                type: 'pie',
                                itemStyle: {
                                    normal: {
                                        label: { show: i > 28 },
                                        labelLine: { show: i > 28, length: 20 }
                                    }
                                },
                                radius: [i * 4 + 40, i * 4 + 43],
                                data: [
                                    { value: 35, name: '乐清' },
                                    { value: 27, name: '滨海' },
                                    { value: 18, name: '嘉兴' },
                                    { value: 23, name: '长兴' },
                                    { value: 13, name: '兰溪' },
                                    { value: 8, name: '台州' }
                                ]
                            })
                        }
                        series[0].markPoint = {
                            symbol: 'emptyCircle',
                            symbolSize: series[0].radius[0],
                            effect: { show: true, scaleSize: 12, color: 'rgba(250,225,50,0.8)', shadowBlur: 10, period: 30 },
                            data: [{ x: '50%', y: '50%' }]
                        };
                        return series;
                    })()
                });
            }

            function DrawGauge01(ec) {
                //--- 柱状图 ---
                var myChart = ec.init(document.getElementById('div01'));
                //图表显示提示信息
                myChart.showLoading({
                    text: "图表数据正在努力加载...",
                    textStyle: {
                        color: '#FFF'
                    }
                });
                myChart.hideLoading();
                myChart.setOption({
                    backgroundColor: 'RGB(41,151,204)',
                    title: {
                        text: '各单位度电燃料成本',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['当前度电燃料成本', '去年同期']
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['温州', '萧山', '长兴', '滨海', '嘉兴', '台州', '乐清']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    color: ['RGB(47,235,50)', 'RGB(251,235,50)'],
                    series: [
                        {
                            name: '当前度电燃料成本',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 3.2, 5.6, 6.7, 5.6, 2.2, 2.6, 8.0, 6.4, 3.3],
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            }
                        },
                        {
                            name: '去年同期',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 6.4, 8.7, 7.7, 5.6, 2.2, 8.7, 8.8, 6.0, 2.3],

                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            }
                        }
                    ]
                });
            }
	},
	loadData: function() {
		var swdl_data = data1[data1.length - 1];
		var pjswdj_data = data2[data2.length - 1];
		var rlcb_data=data3[data3.length - 1];
		var qtcb_data=data4[data4.length-1];
		var a = 1;
		
		//收入数据
		var cb_prec=a.toFixed(1);
		var sr_data = (swdl_data * pjswdj_data).toFixed(1);
		var sr_prec = a.toFixed(1);
		var sr_prec_innerhtml='<span>同比' + sr_prec + '%</span>';
		if(sr_prec>0){
		    sr_prec_innerhtml=sr_prec_innerhtml+'<img src="img/arrow-green.png"/>';
		}else{
		    sr_prec_innerhtml=sr_prec_innerhtml+'<img src="img/arrow-red.png"/>';
		}
		
		//日利润数据
		var rlr_data=(sr_data-sr_prec).toFixed(1);
		var rlr_prec=a.toFixed(1);
		var rlr_prec_innerhtml='<span>同比' + rlr_prec + '%</span>';
		if(rlr_prec>0){
		    rlr_prec_innerhtml=rlr_prec_innerhtml+'<img src="img/arrow-green.png"/>';
		}else{
		    rlr_prec_innerhtml=rlr_prec_innerhtml+'<img src="img/arrow-red.png"/>';
		}
		
		//成本数据
		var cb_data=(rlcb_data+qtcb_data).toFixed(1);
		var cb_prec_innerhtml='<span>同比' + cb_prec + '%</span>';
		if(cb_prec>0){
		    cb_prec_innerhtml=cb_prec_innerhtml+'<img src="img/arrow-green.png"/>';
		}else{
		    cb_prec_innerhtml=cb_prec_innerhtml+'<img src="img/arrow-red.png"/>';
		}
		document.getElementById('sr_num').innerHTML = sr_data;
		document.getElementById('sr_prec').innerHTML = sr_prec_innerhtml;
		document.getElementById('rlr_num').innerHTML=rlr_data;
		document.getElementById('rlr_prec').innerHTML = rlr_prec_innerhtml;
		document.getElementById('cb_num').innerHTML = cb_data;
		document.getElementById('cb_prec').innerHTML = cb_prec_innerhtml;
	}
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