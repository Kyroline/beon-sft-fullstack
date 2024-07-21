import CanvasJSReact from "@canvasjs/react-charts"

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

const ExpenseGraph = ({ data }) => {
    const options = {
        animationEnabled: true,
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Pengeluaran (RP)",
            prefix: "Rp"
        },
        data: [{
            yValueFormatString: "Rp#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: data,
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

export default ExpenseGraph