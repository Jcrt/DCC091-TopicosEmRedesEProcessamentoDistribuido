$(document).ready(function(){
  var inDataArray = [];
  var outDataArray = [];
  var timeDataArray = [];

  var peopleInArray = [];
  var lectureNumbers = [];

  const COLOR_GREEN_RGBA = 'rgba(41, 164, 34, 0.6)';
  const COLOR_GREEN_RGBA_SOLID = 'rgba(41, 164, 34, 1)';
  const COLOR_RED_RGBA = 'rgba(239, 34, 34, 0.6)';

  // AMOUNT OF PEOPLES GRAPH
  const DATA_NUM_OF_PEOPLES = {
      labels: timeDataArray,
      datasets: [
          {
              data: peopleInArray,
              fill: true,
              label: 'People In',
              yAxisID: 'ins',
              borderColor: COLOR_GREEN_RGBA_SOLID,
              pointBoarderColor: "rgba(255, 204, 0, 1)",
              backgroundColor: COLOR_GREEN_RGBA,
              pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
              pointHoverBorderColor: "rgba(255, 204, 0, 1)"
          }
      ]
  }
  const BASIC_OPTIONS_NUM_OF_PEOPLES = {
      title: {
          display: true,
          text: 'Number of people in',
          fontSize: 36
      },
      scales: {
          yAxes: [
              {
                  id: 'ins',
                  type: 'linear',
                  scaleLabel: {
                      labelString: 'Ins',
                      display: true
                  },
                  position: 'left',
              }
          ]
      }
  }
  var ctxNumberOfPeoples = $("canvas#currentNumOfPeoplesGraph");
  var currentNumOfPeoplesGraph = new Chart(ctxNumberOfPeoples, {
      type: 'line',
      data: DATA_NUM_OF_PEOPLES,
      options: BASIC_OPTIONS_NUM_OF_PEOPLES
  });
  // END AMOUNT OF PEOPLES GRAPH

  // LECTURES COUNT
  const DATA_LECTURE_COUNT = {
      labels: ["In", "Out"], 
      datasets: [
          {
              data: lectureNumbers, 
              backgroundColor: [
                  COLOR_GREEN_RGBA,
                  COLOR_RED_RGBA
              ]
          }
      ]
  };
  const OPTIONS_LECTURE_COUNT = {
      title: {
          display: true,
          text: "People in x People out",
          fontSize: 36
      },
      cutoutPercentage: 50, 
      animation: {
          animateRotate: false, 
          animateScale: false
      }
  };
  var ctxLectureCount = $("canvas#LecturesCountGraph");
  var LectureCountGraph = new Chart(ctxLectureCount,{
      type: 'pie',
      data: DATA_LECTURE_COUNT, 
      options: OPTIONS_LECTURE_COUNT
  });
  // END LECTURES COUNT

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
    if(!obj.time || !obj.ins) {
      return;
    }

    //REBUILDING GRAPHS INFORMATION
    AddInfo(obj.ins, inDataArray);
    AddInfo(obj.outs, outDataArray);
    AddInfo(obj.time, timeDataArray);
    AddInfo(CalcPeopleIn(inDataArray, outDataArray), peopleInArray);
    lectureNumbers = RebuildPieChart(lectureNumbers, inDataArray, outDataArray);

    //UPDATE GRAPH INFOS
    currentNumOfPeoplesGraph.update();
    LectureCountGraph.update();

    } catch (err) {
      console.error(err);
    }
  }
});
