/**
 * 导航栏滑动效果
 * 滑块宽度自适应文字宽度
 * 滑块滑动动画由css控制
 */
(function() {
	var nav = document.querySelector('ul.nav'),
		navItems = document.querySelectorAll('ul.nav > li'),
		slideBlock = document.querySelector('ul.nav > .slideBlock')

	for (var i = 0; i < navItems.length; i++) {
		navItems[i].addEventListener('mouseenter', blockSliding)
		navItems[i].addEventListener('click', fixationBlockPlace)
	}
	nav.addEventListener('mouseleave', restoreBlockPlace)
	slideBlock.style.width = navItems[0].offsetWidth + 'px' // 滑块默认获取第一个元素宽度

	function blockSliding(e) {
		slideBlock.style.left = e.currentTarget.offsetLeft + 'px'
		slideBlock.style.width = e.currentTarget.offsetWidth + 'px'
	}

	function fixationBlockPlace(e) {
		var activeItme = document.querySelector('.active-item')
		activeItme.classList.remove('active-item')
		e.currentTarget.classList.add('active-item')
		slideBlock.style.left = e.currentTarget.offsetLeft + 'px'
	}

	function restoreBlockPlace(e) {
		var activeItme = document.querySelector('.active-item')
		slideBlock.style.left = activeItme.offsetLeft + 'px'
		slideBlock.style.width = activeItme.offsetWidth + 'px'
	}
})();

/**
 * 轮播图效果(无缝切换)
 * 图片切换时间由js控制
 */
(function() {
	var slideShow = document.querySelector('.slideshow'),
		banner = document.querySelector('ul.banner'),
		prev = document.getElementById("prev"),
		next = document.getElementById("next"),
		liDots = document.querySelectorAll('.slideshow > .circle li'),
		firstImgNode = document.querySelector('.slideshow .banner li:first-child'),
		lastImgNode = document.querySelector('.slideshow .banner li:last-child'),
		offset = -slideShow.offsetWidth, // -540
		index = 1, // 索引
		timer = null, // 定时器
		time = 1800, // 图片切换时间
		duration = '.25s', // 过渡动画持续时间
		len = 0 // 图片总数

	// 克隆添加
	banner.appendChild(firstImgNode.cloneNode(true))
	banner.insertBefore(lastImgNode.cloneNode(true), firstImgNode)
	len = document.querySelectorAll('ul.banner > li').length

	// 鼠标移入轮播图的停止和播放
	slideShow.addEventListener('mouseover', stop)
	slideShow.addEventListener('mouseout', play)

	banner.addEventListener('transitionend', seamless) // 无缝连接效果
	banner.style.left = offset * index + 'px' // 设置初始位置
	play() // 播放

	for (let i = 0; i < liDots.length; i++) {
		// 圆点点击事件
		liDots[i].onclick = function() {
			if (index === (i + 1)) return; // 取消重复点击圆点
			index = i + 1
			move(index)
			currentDot(index)
		}
	}

	function play() {
		banner.style.transitionDuration = duration
		timer = setInterval(() => next.click(), time)
	}

	function stop() {
		clearInterval(timer)
	}

	function move(i) {
		prev.onclick = next.onclick = null
		currentDot(i)
		banner.style.left = offset * i + "px"
	}

	function currentDot(i) {
		var currentItem = document.querySelector('.slideshow .circle .current')
		currentItem.classList.remove('current')
		if (i === 0) {
			i = len - 2
		}
		if (i === len - 1) {
			i = 1
		}
		liDots[i - 1].classList.add('current')
	}

	function seamless() {
		if (index === 0) {
			index = len - 2
			joint()
		}
		if (index === len - 1) {
			index = 1
			joint()
		}
		// 左右按钮切换事件
		prev.onclick = () => move(index -= 1)
		next.onclick = () => move(index += 1)
	}

	function joint() {
		banner.style.transitionDuration = '0s'
		banner.style.left = offset * index + "px"
		setTimeout(() => banner.style.transitionDuration = duration, 10)
	}
})();
