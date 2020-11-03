var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("profitrange");
var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("optrange");

var profitmargin = document.getElementById("profitmargin");
var minmumprofit = document.getElementById("minmumprofit");
var submit = document.getElementById("submit");
var note2 = document.getElementById("note2");
var algoop = document.getElementById("algoop");
var slidersrange1 = document.getElementById("slidersrange1");
var slidersrange2 = document.getElementById("slidersrange2");

var amazon_sp = document.getElementById("amazon_sp");
var flipkart_sp = document.getElementById("flipkart_sp");
var reliance_sp = document.getElementById("reliance_sp");

var amazon_sp_loading = document.getElementById("amazon_sp_loading");
var flipkart_sp_loading = document.getElementById("flipkart_sp_loading");
var reliance_sp_loading = document.getElementById("reliance_sp_loading");

var min = document.getElementById("min");
var opt = document.getElementById("opt");
var profit = document.getElementById("profit");
var final = document.getElementById("final");
var finalprofit = document.getElementById("finalprofit");
var finalsp = document.getElementById("finalsp");
var updatePrice = document.getElementById("updatePrice");

var autoSubmit = document.getElementById("autoSubmit");
var mrp = document.getElementById('mrp');
var mrp2 = document.getElementById('mrp2');
var mrp3 = document.getElementById('mrp3');

var myChart;
var ctx;
var flag;
var A, F, R;
var p1, p2, p3, p4;
var g1, g2, g3, g4;
var y1, y2, y3, y4;

var x, x1, x2, z1;
var minGraph = 0;
var maxGraph = 0;

var url = '<Enter the cloud functions url here>';

output1.innerHTML = "Range";
output2.innerHTML = "Range";

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.options.scales.yAxes[0].ticks.min = minGraph;
    chart.options.scales.yAxes[0].ticks.max = maxGraph;
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function sliderOperation(slider, output, a, b, c, d, value) {
    slider.min = a;
    slider.max = d;
    slider.value = parseInt(value);
    output.innerHTML = value;

    if (value >= a && value <= b) {
        output.innerHTML = "₹ " + value;
        slider.style.backgroundColor = "yellowgreen";
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is high';
    }

    if (value > b && value <= c) {
        output.innerHTML = "₹ " + value;
        slider.style.backgroundColor = "orange";
        note2.innerHTML = 'Note: A Price in this range is the "best" price that a product can be sold relative to a set of prioritized criteria or constraints that were given by you';
    }

    if (value > c && value <= d) {
        output.innerHTML = "₹ " + value;
        slider.style.backgroundColor = "red";
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is low';
    }

}

slider1.oninput = function() {

    if (this.value >= p1 && this.value <= p2) {
        output1.innerHTML = "₹ " + this.value;
        slider1.style.backgroundColor = "yellowgreen";
        finalprofit.value = this.value;
        absoluteSliders(parseInt(this.value));
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is high';
    }

    if (this.value > p2 && this.value <= p3) {
        output1.innerHTML = "₹ " + this.value;
        slider1.style.backgroundColor = "orange";
        finalprofit.value = this.value;
        absoluteSliders(parseInt(this.value));
        note2.innerHTML = 'Note: A Price in this range is the "best" price that a product can be sold relative to a set of prioritized criteria or constraints that were given by you';
    }

    if (this.value > p3 && this.value <= p4) {
        output1.innerHTML = "₹ " + this.value;
        slider1.style.backgroundColor = "red";
        finalprofit.value = this.value;
        absoluteSliders(parseInt(this.value));
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is low';
    }

}

slider2.oninput = function() {

    if (this.value >= g1 && this.value <= g2) {
        output2.innerHTML = "₹ " + this.value;
        slider2.style.backgroundColor = "yellowgreen";
        final.value = this.value;
        absoluteSliders2(parseInt(this.value));
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is high';
    }

    if (this.value > g2 && this.value <= g3) {
        output2.innerHTML = "₹ " + this.value;
        slider2.style.backgroundColor = "orange";
        final.value = this.value;
        absoluteSliders2(parseInt(this.value));
        note2.innerHTML = 'Note: A Price in this range is the "best" price that a product can be sold relative to a set of prioritized criteria or constraints that were given by you';
    }

    if (this.value > g3 && this.value <= g4) {
        output2.innerHTML = "₹ " + this.value;
        slider2.style.backgroundColor = "red";
        final.value = this.value;
        absoluteSliders2(parseInt(this.value));
        note2.innerHTML = 'Note: At this price the chances of the product getting sold is low';
    }
}

function absoluteSliders(x) {
    let y, k;
    if (x1 != x) {
        y = x - x1;
        k = z1 + y;
        console.log(`X1:${x1} X:${x} Y:${y} Z:${z1} K:${k}`);
        sliderOperation(slider2, output2, g1, g2, g3, g4, k);
        final.value = k;
        removeData(myChart);
        addData(myChart, "Your Price", k);
    }
}

function absoluteSliders2(z) {
    let y, k;
    if (z1 != z) {
        y = z - z1;
        k = x1 + y;
        console.log(`X1:${x1} X:${x} Y:${y} Z:${z1} K:${k}`);
        sliderOperation(slider1, output1, p1, p2, p3, p4, k);
        finalprofit.value = k;
        removeData(myChart);
        addData(myChart, "Your Price", z);
    }
}

final.onchange = function() {
    finalprofit.value = parseInt(this.value) - y1;
    removeData(myChart);
    addData(myChart, "Your Price", this.value);
}

async function submitData() {

    let postA = A;
    let postF = F;
    let postR = R;
    let mrpforPost = mrp.innerHTML;

    let payload = {
        "type": 2,
        "MRP": parseInt(mrpforPost.split(' ')[1]),
        "products": {
            "A": postA,
            "F": postF,
            "R": postR
        },
        "Actual_Profit_Margin": parseInt(profitmargin.value),
        "Required_Minimum_Profit": parseInt(minmumprofit.value)
    }

    console.log(payload);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify(payload);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    await fetch(url, requestOptions).then(async(response) => {
        data = await response.json();
        console.log(data);
        let i = parseInt(profitmargin.value);
        let j = parseInt(mrp.innerHTML.split(" ")[1]);
        minGraph = j - i;

        console.log(minGraph);

        min.innerHTML = "₹ " + data.responseforapi.Minimum_Selling_Price;
        opt.innerHTML = "₹ " + data.responseforapi.Optimal_Selling_Price;
        profit.innerHTML = "₹ " + data.responseforapi.Total_Profit;

        if (data.responseforapi.Profit_Range.p1 == undefined) {
            p1 = parseInt(data.responseforapi.Non_Profit_Range.n1);
            p2 = parseInt(data.responseforapi.Non_Profit_Range.n2);
            p3 = parseInt(data.responseforapi.Non_Profit_Range.n3);
            p4 = parseInt(data.responseforapi.Non_Profit_Range.n4);

            x1 = parseInt(data.responseforapi.Total_Profit);

            sliderOperation(slider1, output1, p1, p2, p3, p4, data.responseforapi.Total_Profit);

            absoluteSliders(x1);
        } else {
            p1 = parseInt(data.responseforapi.Profit_Range.p1);
            p2 = parseInt(data.responseforapi.Profit_Range.p2);
            p3 = parseInt(data.responseforapi.Profit_Range.p3);
            p4 = parseInt(data.responseforapi.Profit_Range.p4);

            x1 = parseInt(data.responseforapi.Total_Profit);

            sliderOperation(slider1, output1, p1, p2, p3, p4, data.responseforapi.Total_Profit);

            absoluteSliders(x1);
        }

        if (data.responseforapi.Optimal_Price_Range.g1 == undefined) {
            g1 = parseInt(data.responseforapi.Non_profit_optimal_Price_Range.x1);
            g2 = parseInt(data.responseforapi.Non_profit_optimal_Price_Range.x2);
            g3 = parseInt(data.responseforapi.Non_profit_optimal_Price_Range.x3);
            g4 = parseInt(data.responseforapi.Non_profit_optimal_Price_Range.x4);

            z1 = parseInt(data.responseforapi.Optimal_Selling_Price);

            sliderOperation(slider2, output2, g1, g2, g3, g4, data.responseforapi.Optimal_Selling_Price);

            absoluteSliders2(z1);
        } else {
            g1 = parseInt(data.responseforapi.Optimal_Price_Range.g1);
            g2 = parseInt(data.responseforapi.Optimal_Price_Range.g2);
            g3 = parseInt(data.responseforapi.Optimal_Price_Range.g3);
            g4 = parseInt(data.responseforapi.Optimal_Price_Range.g4);

            z1 = parseInt(data.responseforapi.Optimal_Selling_Price);

            sliderOperation(slider2, output2, g1, g2, g3, g4, data.responseforapi.Optimal_Selling_Price);

            absoluteSliders2(z1);
        }

        y1 = parseInt(data.responseforapi.Actual_Price_Range.y1);
        y2 = parseInt(data.responseforapi.Actual_Price_Range.y2);
        y3 = parseInt(data.responseforapi.Actual_Price_Range.y3);
        y4 = parseInt(data.responseforapi.Actual_Price_Range.y4);

        if (!flag) {
            addData(myChart, "Your Price", z1);
        } else {
            removeData(myChart);
            addData(myChart, "Your Price", z1);
        }
        flag = true;
        final.value = parseInt(data.responseforapi.Optimal_Selling_Price);
        finalprofit.value = parseInt(data.responseforapi.Total_Profit);
        slidersrange1.style.display = "block";
        slidersrange2.style.display = "block";
        finalsp.style.display = "block";
        algoop.style.display = "block";
    });
}


async function loadPrices() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "type": 1 });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch(url, requestOptions).then(async(response) => {
        data = await response.json();
        maxGraph = parseInt(data.responseforapi.mrp);
        console.log(data);

        console.log(setMrp());

        F = parseInt(data.responseforapi.F);
        R = parseInt(data.responseforapi.R);
        A = parseInt(data.responseforapi.A);

        mrp.innerHTML = "₹ " + data.responseforapi.mrp;
        mrp2.innerHTML = "₹ " + data.responseforapi.mrp;
        mrp3.innerHTML = "₹ " + data.responseforapi.mrp;

        amazon_sp.innerHTML = "";
        flipkart_sp.innerHTML = "";
        reliance_sp.innerHTML = "";

        amazon_sp.innerHTML = "₹ " + A;
        flipkart_sp.innerHTML = "₹ " + F;
        reliance_sp.innerHTML = "₹ " + R;

        amazon_sp_loading.style.display = "none";
        flipkart_sp_loading.style.display = "none";
        reliance_sp_loading.style.display = "none";

        autoSubmit.click();

        ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Vendor 1', 'Vendor 2', 'Vendor 3'],
                datasets: [{
                    label: 'Selling Prices Compared',
                    data: [A, F, R],
                    backgroundColor: [
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 0, 0, 0.2)',
                        'rgba(153, 102, 255, 0.2)'

                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 0, 0, 1)',
                        'rgba(153, 102, 255, 1)'

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: maxGraph
                        }
                    }]
                }
            }
        });
    });
}

const setMrp = async() => {
    await fetch(`/updatePrice?mrp=${data.responseforapi.mrp}`).then(async(response) => {
        data = await response.json();

        if (data.flag == 1)
            return "MRP SET IN BACKEND";
    });
};

updatePrice.onclick = function() {
    fetch(`/sellingprice?price=${final.value}`).then(async(response) => {
        data = await response.json();
        if (data.flag == 1) {
            location.replace('/products');
        }
    });
};