//기타 타입들을 정의/구현해놓은 저장소

 /**
 * 차트 공통 정의 클래스
 */
class ChartDefault {

    label: String; // 그래프를 특정짓는 이름
    backgroundColor: String; // 그래프의 단위 아이템 배경색
    borderColor: String; // 그래프의 기타 아이템 전경색
    type: "bubble" | "scatter" | "boxplot"; // 그래프 유형 미리 지정해둠
    radius?: Number = 0; // 그래프의 단위 아이템 크기(0 기본값 처리)
    fill?: boolean = false; //그래프의 기타아이템 채우기 구분값(false 기본값 처리)

    data?: Array<Object>; //그래프를 그릴 데이터 그룹

    chartTitle: String; // 차트에 표시될 제목
    chartWidth?: Number; // 차트 가로크기
    chartHeigh?: Number; // 차트 세로크기
    chartFontSize?: Number; //차트에 세길 글자크기
    minXAxes?: Number; //차트 가로축 최소값
    maxXAxes?: Number; // 차트 가로축 최대값
    xAxesName?: String; // X축 표시명
    minYAxes?: Number; // 차트 세로축 최소값
    maxYAxes?: Number; // 차트 세로축 최대값
    yAxesName?: String; // Y축 표시명


    constructor(label: String, backgroundColor: String, borderColor: String
        , type: "bubble" | "scatter" | "boxplot", radius?: Number) {
        this.label = label;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.type = type;
        if(radius){this.radius = radius}
    }

    setDataInsert(data: Array<Object>) {
        this.data = data;
    }

    setChartOptionalData(chartTitle: String, chartWidth: Number, chartHeigh: Number,
        chartFontSize?: Number, minXAxes?: Number, maxXAxes?: Number, xAxesName?: String,
        minYAxes?: Number, maxYAxes?: Number, yAxesName?: String){
            this.chartTitle = chartTitle;
            this.chartWidth = chartWidth;
            this.chartHeigh = chartHeigh;

            if(chartFontSize) {this.chartFontSize = chartFontSize}
            if(minXAxes) {this.minXAxes = minXAxes}
            if(maxXAxes) {this.maxXAxes = maxXAxes}
            if(xAxesName) {this.xAxesName = xAxesName}
            if(minYAxes) {this.minYAxes = minYAxes}
            if(maxYAxes) {this.maxYAxes = maxYAxes}
            if(yAxesName) {this.yAxesName = yAxesName}
        }
}

/**
 * 버블차트 데이터 정의 클래스
 */
class BubbleChart extends ChartDefault {
    showLine: boolean = true; // 선보이기 여부
    borderWidth: Number; // 선두께

    constructor(label: String, backgroundColor: String, borderColor: String
        , type: "bubble" | "scatter" | "boxplot", borderWidth: Number,
        radius?: Number, showLine?: boolean) {
        super(label, backgroundColor, borderColor, type, radius);
        this.borderWidth = borderWidth;
        if(showLine) {this.showLine = showLine}
    }

}

/**
 * 플랏차트 데이터 정의 클래스
 */
class BoxplotChart extends ChartDefault {
    outlierColor: String; // 아웃라이어 컬러
}

class CoordinateData {
    x: String;
    y: String;

    constructor(x:String, y:String) {
        this.x = x;
        this.y = y;
    }
}

export {BubbleChart, CoordinateData}