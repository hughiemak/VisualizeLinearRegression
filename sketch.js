var data = []

var m = 1;
var b = 0;

var printPoints = false;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.mousePressed(onMousePressed);
}

function gradientDescent(){
	var learning_rate = 0.5;
	var m_grad = 0;
	var b_grad = 0;

	var iteration = 100;
	
	for(var i=0;i<data.length;i++){
		var x=data[i].x;
		var y=data[i].y;
		var cost = m*x+b - y;
		m_grad += cost * x;
		b_grad += cost ;
	}
	m_grad = learning_rate / data.length * m_grad;
	b_grad = learning_rate / data.length * b_grad;

	m = m - m_grad;
	b = b - b_grad;

	drawLine();
}

function linearRegression(){
	//(sum(x-xmean)*sum(y-ymean))/sum((x-xmean)^2)
	var xsum=0;
	var ysum=0;
	for(var i=0;i<data.length;i++){
		xsum+=data[i].x;
		ysum+=data[i].y;
	}
	var xmean=xsum/data.length;
	var ymean=ysum/data.length;
	var num=0;
	var dem=0;
	for(var i=0;i<data.length;i++){
		x=data[i].x;
		y=data[i].y;
		num+=(x-xmean)*(y-ymean);
		dem+=(x-xmean)*(x-xmean);
	}
	m=num/dem;
	b=ymean-m*xmean;

	drawLine();
}

function drawLine(){
	var x1=0;
	var x2=1;
	var y1=m*x1+b;
	var y2=m*x2+b;

	x1=map(x1,0,1,0,width);
	y1=map(y1,0,1,height,0);
	x2=map(x2,0,1,0,width);
	y2=map(y2,0,1,height,0);

	// stroke('rgba(50,255,50, 0.6)');
	stroke(255, 204, 0);
	line(x1,y1,x2,y2);
}

function onMousePressed(){
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  var point = createVector(x,y);
  data.push(point);
  if (printPoints) {
  	 // print(x + ", " + y);
  	 print(data)
  }

}

function draw() {
  background('#222222');
  for(var i=0;i<data.length;i++){
    var x = map(data[i].x,0,1,0,width);
    var y = map(data[i].y,0,1,height,0);
    fill(255);
    stroke(255);
    ellipse(x,y,8,8);
  }
  if (data.length>1) {
  	// linearRegression()
  	gradientDescent();
  	
  }
}