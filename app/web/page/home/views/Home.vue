<template>
    <Template>
        <head-bar></head-bar>
        <div ref="echart" class="echart"></div>
        <svg ref="d3chart" class="d3chart"></svg>
        <svg ref="hexbin" class="hexbin"></svg>
    </Template>
</template>
<style lang="less">
    @import "../../../asset/css/global.css";

    .echart,
    .d3chart,
    .hexbin {
        width: 600px;
        height: 300px;
    }

    .bar rect {
        fill: #4682b4;
    }

    .bar text {
        fill: #fff;
        font: 10px "Helvetica, sans-serif";
    }

    .bar .bar-shadow {
        fill: #000;
        opacity: .2;
    }

    .mesh {
        fill: none;
        stroke: #000;
        stroke-width: .25px;
    }

    .start {
        fill: none;
        stroke: brown;
    }

    .end {
        fill: none;
        stroke: steelblue;
    }

    .hexagon {
        stroke: #000;
        stroke-width: 0.5px;
    }
</style>
<script type="text/javascript">
    import * as d3 from 'd3';
    import 'd3-hexbin';
    const d3Hexbin = require("d3-hexbin");
    import echarts from 'echarts';
    import HeadBar from '../../common/components/HeadBar.vue';

    export default {
        components: {
            HeadBar
        },
        data() {
            return {
                xAxisData: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                seriesData: [5, 20, 36, 10, 10, 20],
                width: 600,
                height: 300,
                echart: null,
                d3chart: null,
                hexbinDom: null
            }
        },
        mounted() {
            this.initEchart();
            this.initD3Chart();
            this.initHexbin();
        },
        methods: {
            initEchart() {
                this.echart = echarts.init(this.$refs.echart);
                this.echart.setOption({
                    title: {text: 'ECharts'},
                    tooltip: {},
                    xAxis: {
                        data: this.xAxisData
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: this.seriesData
                    }]
                });
            },
            initD3Chart() {
                this.d3chart = this.$d3.select(this.$refs.d3chart);

                const data = this.$d3.range(1000).map(this.$d3.randomBates(10));
                const formatCount = this.$d3.format(",.0f");
                const margin = {top: 10, right: 30, bottom: 30, left: 30};
                const width = +this.width - margin.left - margin.right;
                const height = +this.height - margin.top - margin.bottom;

                const g = this.d3chart.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);
                const x = this.$d3.scaleLinear()
                    .rangeRound([0, width]);
                const bins = this.$d3.histogram()
                    .domain(x.domain())
                    .thresholds(x.ticks(20))
                    (data);
                const y = this.$d3.scaleLinear()
                    .domain([0, this.$d3.max(bins, d => {
                        return d.length;
                    })])
                    .range([height, 0]);

                const bar = g.selectAll(".bar")
                    .data(bins)
                    .enter()
                    .append("g")
                    .attr("class", "bar")
                    .attr("transform", d => `translate(${x(d.x0)}, 0)`);

                bar.append("rect")
                    .attr("class", "bar-shadow")
                    .attr("x", 1)
                    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
                    .attr("height", d => 260);

                bar.append("rect")
                    .attr("x", 1)
                    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
                    .attr("height", d => height - y(d.length))
                    .attr("transform", d => `translate(0, ${y(d.length)})`);

                bar.append("text")
                    .attr("dy", 250)
                    .attr("y", 6)
                    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
                    .attr("text-anchor", "middle")
                    .text(d => formatCount(d.length));

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", `translate(0, ${height})`)
                    .call(this.$d3.axisBottom(x));
            },
            initHexbin() {
                this.hexbinDom = d3.select(this.$refs.hexbin);
                const margin = {top: 20, right: 20, bottom: 30, left: 40};
                const width = +this.width - margin.left - margin.right;
                const height = +this.height - margin.top - margin.bottom;
                const g = this.hexbinDom.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

                const randomX = this.$d3.randomNormal(width / 2, 80);
                const randomY = this.$d3.randomNormal(height / 2, 80);
                const points = this.$d3.range(2000).map(() => { return [randomX(), randomY()]; });

                const color = this.$d3.scaleSequential(this.$d3.interpolateLab("white", "steelblue"))
                    .domain([0, 20]);

                const hexbin = d3Hexbin.hexbin()
                    .radius(20)
                    .extent([[0, 0], [width, height]]);

                const x = this.$d3.scaleLinear()
                    .domain([0, width])
                    .range([0, width]);

                const y = this.$d3.scaleLinear()
                    .domain([0, height])
                    .range([height, 0]);

                g.append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", height);

                g.append("g")
                    .attr("class", "hexagon")
                    .attr("clip-path", "url(#clip)")
                    .selectAll("path")
                    .data(hexbin(points))
                    .enter().append("path")
                    .attr("d", hexbin.hexagon())
                    .attr("transform", d => { return `translate(${d.x}, ${d.y})`; })
                    .attr("fill", d => { return color(d.length); });

                g.append("g")
                    .attr("class", "axis axis--y")
                    .call(this.$d3.axisLeft(y).tickSizeOuter(-width));

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", `translate(0, ${height})`)
                    .call(this.$d3.axisBottom(x).tickSizeOuter(-height));
            }
        }
    };
</script>

