/**
 * 어떠한 차트라도 공통적으로 쓸 예정인 데이터구조
 */
class ChartDefault {
    label: String = 'default'; // 차트를 특정짓는 이름
    backgroundColor: String = '#000000'; // 점의 면의 색
    borderColor: String = "#000000"; //추적선, 사각선등 선의 색
    type: String = "bubble"; // 차트 타입
    radius: Number = 1; // 차트모양의 크기
    /* 차트모양 */
    pointStype?: 'circle' | 'cross' | 'crossRot' | 'dash' | 'line' | 'rect' | 'rectRounded' | 'rectRot' | 'star' | 'triangle';
    /* 
        추적선이나 사각선은 기본적으로 좌표점들을 잇는 선이다.
        이때 좌표는 보이지 않고 선만 보이게 하기 위해 선의 유무를 선택하는것
        기본적으로 안보이는걸로 선택한다.
    */
    showLine?: boolean;
    /*
        특별한 지시자가 없으면 선을 그리고 면을 색칠하게 되는데
        그것을 헤제할 키워드
    */
    fill?: boolean;

    data?: Array<CoordinatePoint>;

    // 외부로 부터 data를 셋팅하기 위한메소드 정의
    toFixData(data: Array<CoordinatePoint>) : void {
        this.data = data;
    }
}

/**
 * 좌표형 차트를 그릴때 요구되는 차트데이터형
 */
class CoordinatePoint {
    constructor(x:String, y:String) {
        this.x = x;
        this.y = y;
    };
    x?: String;
    y?: String;
}

/**
 * 버블 차트 정의
 */
class BubbleChartData {
    constructor(datasets: ChartDefault) {
        this.datasets = datasets;
    };
    datasets?: ChartDefault;
}


export {ChartDefault, CoordinatePoint, BubbleChartData}