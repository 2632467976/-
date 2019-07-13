var graph = echarts.init(document.getElementById('graph')),
	pie = echarts.init(document.getElementById('pie')),
	histogram = echarts.init(document.getElementById('histogram'))

graph.setOption({
	title: {
		text: '曲线图数据展示',
		x: 'center',
		y: '12px'
	},
	tooltip: {
		trigger: 'axis',
		formatter: "{a} <br/>{b} {c}人"
	},
	xAxis: {
		data: [],
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		}
	},
	yAxis: {
		axisLabel: {
			formatter: '{value} 人'
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		splitLine: {
			lineStyle: {
				type: 'dotted'
			}
		}
	},
	series: [{
		data: [],
		type: 'line',
		areaStyle: {
			color: '#c2565250'
		},
		smooth: true,
		label: {
			normal: {
				show: true,
			}
		},
	}]
})
ajaxGET('https://edu.telking.com/api/?type=month', function(data) {
	data = data.data
	graph.setOption({
		xAxis: {
			data: data.xAxis
		},
		series: [{
			data: data.series
		}]
	})
})

pie.setOption({
	title: {
		text: '饼状图数据展示',
		x: 'center',
		y: '40px'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	series: [{
		type: 'pie',
		data: [],
		radius: '55%',
		center: ['50%', '60%'],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
})
ajaxGET('https://edu.telking.com/api/?type=week', function(data) {
	var newData = []
	data = data.data
	for (var i = 0; i < data.series.length; i++) {
		newData.push({
			value: data.series[i],
			name: data.xAxis[i]
		})
	}
	pie.setOption({
		series: [{
			data: newData
		}]
	})
})

histogram.setOption({
	title: {
		text: '柱状图数据展示',
		x: 'center',
		y: '40px'
	},
	grid: {
		top: '35%',
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	xAxis: [{
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		}
	}],
	yAxis: [{
		type: 'value',
		name: '商品数',
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		splitLine: {
			lineStyle: {
				type: 'dotted'
			}
		}
	}],
	series: [{
		type: 'bar',
		data: [2617, 2276, 7222, 3112, 310, 1750, 6707],
		barWidth: '30%',
		color: '#c25652'
	}]
})
ajaxGET('https://edu.telking.com/api/?type=week', function(data) {
	var newXAxisData = []
	data = data.data
	for (var i = 0; i < data.xAxis.length; i++) {
		newXAxisData.push(data.xAxis[i].toUpperCase())
	}
	histogram.setOption({
		xAxis: {
			data: newXAxisData
		},
		series: [{
			data: data.series
		}]
	})
})

function ajaxGET(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true)
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(JSON.parse(xhr.responseText))
		}
	}
}
