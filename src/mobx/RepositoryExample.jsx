class RiderRepository {
    URL = "/v1/api/riders";
  
    constructor(url) {
      this.URL = url || this.URL;
    }
  
    findAll(params) {
      return {temp: "temp"}
    }
  
    findOne(riderAccountId) {
      return {temp: "temp1"}
    }
  }
  
  // 싱글톤으로 리턴 (매번 새로운 객체를 생성 할 필요가 없다면 처음 부터 싱글톤으로 export)
  export default new RiderRepository();