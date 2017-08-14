let btnText = {
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
		zero: '0',
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
	},
	storeExpression: [],
	storeOpr: '',
	expressions: []
};

new Vue({
	el: '#main',
	data: btnText,
	methods: {
		clearDisplayer() {
			this.storeOpr = '';
			this.storeExpression.length = 0;
			this.displayer = '0';
			this.expressions.length = 0;
		},
		goBack() {
			if(this.displayer.length > 1) {
				this.displayer = this.displayer.substring(0,this.displayer.length - 1);
			} else if(this.storeExpression.length !== 0) {
				this.displayer = this.storeExpression[storeExpression.length - 1];
				this.storeExpression.pop();
			} else {
				this.displayer = '0';
			}
		},
		toOperator(opr) {
			this.finished = false;
			if(!Number.isNaN(Number.parseInt(this.displayer))) {
				this.storeExpression.push(this.displayer);
				this.expressions.push({name: this.displayer});
				console.log(this.expressions);
			}
			this.displayer = opr;
			switch(opr){
				case '×': opr = '*';
					break;
				case '÷': opr = '/';
			}
			this.storeOpr = opr;
		},
		getNumber(num) {
			if(this.finished) {
				this.finished = false;
				this.displayer = '0';
				this.expressions.length = 0;
			}
			if(!Number.isNaN(Number.parseInt(this.displayer))) {
				if(this.displayer.length < 26) {
					this.displayer === '0' ? this.displayer = num : this.displayer += num;
				}	
			}else if(Number.isNaN(Number.parseInt(this.displayer))){
				this.storeExpression.push(this.storeOpr);
				this.expressions.push({name: this.storeOpr});
				this.displayer = num;
			}
		},
		setPoint(p) {
			if(this.displayer.length >= 26) {
				return;
			}
			for(let i = 0; i < this.displayer.length; i++) {
				if(this.displayer.charAt(i) === p) {
					return;
				}
			}
			this.displayer += p;
		},
		toEqual() {
			if(this.finished) {
				return;
			}
			if(!Number.isNaN(Number.parseInt(this.displayer))) {
				this.storeExpression.push(this.displayer);
				this.expressions.push({name: this.displayer});
				this.displayer = eval(this.storeExpression.join('')).toString();
				this.storeExpression.length = 0;
				this.finished = true;
			} else {
				this.displayer = eval(this.storeExpression.join('')).toString();
				this.storeExpression.length = 0;
				this.finished = true;
			}
		}
	},
	watch: {  //监听右边大显示器字符串长度
		displayer: function(val,oldval) {
			switch(val){
				case '*': this.displayer = '×';
					break;
				case '/': this.displayer = '÷';
			}
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
})
