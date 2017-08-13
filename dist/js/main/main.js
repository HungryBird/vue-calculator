'use strict';

var btnText = {
	operator: {
		divide: '÷',
		multiply: '×',
		minus: '-',
		plus: '+',
		remainder: '%',
		point: '.'
	},
	number: {
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
		zero: '0'
	},
	clear: 'C',
	back: '<-',
	equal: '=',
	finished: false,
	displayer: '0',
	displayerStyle: {
		shortLength: true,
		midLength: false,
		longLength: false
	}
},
    storeOpr = '',
    storeExpression = [];


new Vue({
	el: '#main',
	data: btnText,
	methods: {
		clearDisplayer: function clearDisplayer() {
			storeOpr = '';
			storeExpression.length = 0;
			this.displayer = '0';
		},
		goBack: function goBack() {},
		toOperator: function toOperator(opr) {
			this.finished = false;
			if (!Number.isNaN(Number.parseInt(this.displayer))) {
				storeExpression.push(this.displayer);
			}
			this.displayer = opr;
			switch (opr) {
				case '×':
					opr = '*';
					break;
				case '÷':
					opr = '/';
			}
			storeOpr = opr;
		},
		getNumber: function getNumber(num) {
			if (this.finished) {
				this.finished = false;
				storeExpression.length = 0;
				this.displayer = '0';
			}
			if (!Number.isNaN(Number.parseInt(this.displayer))) {
				if (this.displayer.length < 26) {
					this.displayer === '0' ? this.displayer = num : this.displayer += num;
				}
			} else if (Number.isNaN(Number.parseInt(this.displayer))) {
				storeExpression.push(storeOpr);
				this.displayer = num;
			}
		},
		setPoint: function setPoint(p) {
			if (this.displayer.length >= 26) {
				return;
			}
			for (var i = 0; i < this.displayer.length; i++) {
				if (this.displayer.charAt(i) === p) {
					return;
				}
			}
			this.displayer += p;
		},
		toEqual: function toEqual() {
			if (this.finished) {
				return;
			}
			if (!Number.isNaN(Number.parseInt(this.displayer))) {
				storeExpression.push(this.displayer);
				this.displayer = eval(storeExpression.join('')).toString();
				this.finished = true;
			} else {
				this.displayer = eval(storeExpression.join('')).toString();
				this.finished = true;
			}
		}
	},
	watch: { //监听右边大显示器字符串长度
		displayer: function displayer(val, oldval) {
			if (val.length < 11) {
				this.displayerStyle.shortLength = true;
				this.displayerStyle.midLength = false;
				this.displayerStyle.longLength = false;
			} else if (val.length >= 11 && val.length < 18) {
				this.displayerStyle.shortLength = false;
				this.displayerStyle.midLength = true;
				this.displayerStyle.longLength = false;
			} else {
				this.displayerStyle.shortLength = false;
				this.displayerStyle.midLength = false;
				this.displayerStyle.longLength = true;
			}
		}
	}
});