<template>
	<div class="calendar" v-show="ifCalendar">
		<div class="calendarHead">
			<div class="selectMon">
				<div class="arrPre" @click="premonth">
					<i class="iconfont icon-fanhui"></i>
				</div>
				<div class="monYear">{{ month_name[my_month] }} {{ my_year }}</div>
				<div class="arrNext" @click="nextmonth">
					<i class="iconfont icon-xiangyoujiantou"></i>
				</div>
			</div>
			<div class="close" @click="changeDis">
				<i class="iconfont icon-searchclose"></i>
			</div>
			<div class="week">
				<tr>
					<td>S</td>
					<td>M</td>
					<td>T</td>
					<td>W</td>
					<td>T</td>
					<td>F</td>
					<td>S</td>
				</tr>
			</div>
		</div>
		<div class="calendarBody">
			<div v-for="count in firstDay"></div>
			<div 
				v-for="count in totalDay" 
				class="calendarItem" 
				:key="count"
				:class= "{ light : count=== my_day}"
				@click="getdates($event)">
				{{ count }}
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		 name: 'Calendar',
		 props: ['ifCalendar'],
		 data () {
		 	return {
		 		my_date : '',
		  		my_year: '',
		  		my_month: '',
		  		my_day: '',
		  		month_olypic: [31,29,31,30,31,30,31,31,30,31,30,31], //闰年每个月份的天数
		  		month_normal: [31,28,31,30,31,30,31,31,30,31,30,31],
		  		month_name: ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"],
		  		pre_month: '',
		  		firstDay: '',
		  		totalDay: '',
		  		// ifCalendar: false
		 	}
		 },
		 methods: {
		 	gettodaydate () {

		  		// 当天的年月日
				this.my_date = new Date();
			  	this.my_year = this.my_date.getFullYear()  //获取年份
			    this.my_month = this.my_date.getMonth()  //获取月份，一月份的下标为0
			    this.my_day = this.my_date.getDate()  //获取当前日期
			    this.pre_month = this.my_month - 1  //获取前一个月的时间
		  	},
		  	dayStart (month,year) {
		  		//根据年月获取当月第一天是周几
	            var tmpDate = new Date(year, month, 1)
	            return (tmpDate.getDay())
	        },
	        daysMonth(month, year){

				//根据年份判断某月有多少天(11,2018),表示2018年12月
	            var tmp1 = year % 4;
	            var tmp2 = year % 100;
	            var tmp3 = year % 400;
	 
	            if((tmp1 == 0 && tmp2 != 0) || (tmp3 == 0)){
	                return (this.month_olypic[month]);//闰年
	            }else{
	                return (this.month_normal[month]);//非闰年
	            }
	        },
	        refreshDate () {

				//计算当月的天数和每月第一天都是周几，day_month和day_year都从上面获得
	            this.totalDay = this.daysMonth(this.my_month,this.my_year);
	            this.firstDay = this.dayStart(this.my_month, this.my_year);
	           	
			},
			premonth () {
				this.my_month --
				if (this.my_month < 0) {
					this.my_year-- 
					this.my_month = 11
				}
				this.refreshDate ()
			},
			nextmonth () {
				this.my_month ++
				if (this.my_month > 11) {
					this.my_year++ 
					this.my_month = 0
				}
				this.refreshDate ()
			},
			getdates (e) {

				var Tday = String(e.currentTarget.innerText).padStart(2, '0')
				var Tmonth = String(this.my_month + 1).padStart(2, '0')
				// this.dateData = `${this.my_year}-${Tmonth}-${Tday}`
				this.$emit('dateDataFun',`${this.my_year}-${Tmonth}-${Tday}`)
			},
			changeDis () {
				this.$emit('changeDis',false)
			}
		},
		mounted () {
	  	this.gettodaydate()
	  	this.refreshDate ()
	
	  }
	}
</script>

<style type="text/css">
	/*日历*/
	.week  tr td{
		width: 38px;
		color: #fff;
		font-size: 18px;
	}
	.week{
		padding-left: 35px;
		margin-top: 20px;
	}
	
	.calendarBody >div{
		vertical-align: top;
		width: 38px;
		border-radius: 50%;
		cursor: pointer;
		height: 38px;
		display: inline-block;
		text-align: center;
		line-height: 38px;
		font-size: 17px;
	}
	.calendarItem:hover{
		background: rgb(238,238,238);
	}
	.calendarBody{
		background: #fff;
		padding-left: 21px;
		padding-top: 7px;
		padding-bottom: 20px;
	}
	.calendarHead{
		width: 100%;
		background: #7086c6;
		padding-top: 20px;
		padding-bottom: 10px;
		position: relative;
	}
	.close{
		position: absolute;
	    top: 20px;
	    right: 13px;
	    width: 29px;
	    height: 29px;
	    text-align: center;
	    line-height: 29px;
	    color: #fff;
	}
	.close:hover{
		background: rgba(255, 255, 255, 0.3);
	}
	.calendar{
		width: 310px;
		position: absolute;
		z-index: 3;
		line-height: normal;
		box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3), 30px 30px 40px 0 rgba(0, 0, 0, 0.2);
		top: 63px;
    	left: -30px;
	}
	.selectMon{
		width: 195px;
		height: 29px;
		background: #fff;
		margin: 0 auto;
	}
	.selectMon>div{
		display: inline-block;
		vertical-align: top;
		height: 100%;
	}
	.arrPre,
	.arrNext,
	.monYear{
		width: 29px;
		text-align: center;
		line-height: 29px;
	}
	.arrNext:hover,
	.arrPre:hover{
		background: rgb(245,245,245);
	}
	.monYear{
		width: 137px;
	}
	.light{
		background: #7086c6; 
		color:#fff;
	}
</style>