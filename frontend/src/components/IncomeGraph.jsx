import CanvasJSReact from "@canvasjs/react-charts"

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

const IncomeGraph = ({ data, data2 }) => {
    const options = {
        animationEnabled: true,
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Jumlah",
            prefix: "Rp"
        },
        data: [{
            showInLegend: true,
            legendText: 'Pemasukan',
            yValueFormatString: "Rp#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: data,
            lineColor: 'Blue',
            markerColor: 'Blue'
        },
        {
            showInLegend: true,
            legendText: 'Pengeluaran',
            yValueFormatString: "Rp#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: data2,
            lineColor: 'Red',
            markerColor: 'Red'
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}

export default IncomeGraph