import CanvasJSReact from "@canvasjs/react-charts"

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

const BalanceGraph = ({ data }) => {
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
            legendText: 'Saldo',
            yValueFormatString: "Rp#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: data,
            lineColor: 'Green',
            markerColor: 'Green'
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

export default BalanceGraph