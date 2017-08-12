'use strict';

var btnText = {
	operator: {
		divide: '÷',
		multiply: '*',
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
		zero: '10'
	},
	clear: 'C',
	back: '<-',
	equal: '=',
	displayer: '0',
	displayerStyle: {
		shortLength: true,
		midLength: false,
		longLength: false
	}
},
    storeOpr = '',
    storeExpression = [];
/*storeNumber.length === 0 ? storeNumber[0] = '0' || storeNumber;*/

new Vue({
	el: '#main',
	data: btnText,
	methods: {
		clearDisplayer: function clearDisplayer() {
			storeNumber.length = 0;
			storeOpr = '';
			storeExpression.length = 0;
			this.displayer = 0;
		},
		goBack: function goBack() {
			if (storeExpression.length === 0) {
				this.displayer = 0;
				return;
			}
			storeExpression.splice(storeExpression.length - 1, 1);
			this.displayer = storeExpression[storeExpression.length - 1].join('');
		},
		toDivide: function toDivide(opr) {
			if (typeof Number.parseInt(storeExpression[storeExpression.length - 1]) === 'number') {
				storeExpression.push(this.displayer);
			}
			storeOpr = opr;
			this.displayer = storeOpr;
		},
		getNumber: function getNumber(num) {
			if (this.displayer.length < 26 && this.displayer !== storeOpr) {
				this.displayer === '0' ? this.displayer = num : this.displayer += num;
			} else if (this.displayer === storeOpr) {
				storeExpression.push(this.displayer);
				this.displayer = num;
			}
		},
		toEqual: function toEqual(n) {
			/*if(typeof storeExpression[storeExpression.length - 1] === 'string') {
   	storeExpression.pop();
   }*/
			console.log(storeExpression);
			//this.displayer = eval(storeExpression.join(''));
		}
	},
	watch: {
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