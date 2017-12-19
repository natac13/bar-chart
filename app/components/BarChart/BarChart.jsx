import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as d3 from 'd3';
import moment from 'moment';

import style from './style.scss';

export default class BarChartComponent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    chartData: PropTypes.array,
    xKey: PropTypes.string,
    yKey: PropTypes.string,
  };

  constructor(props) {
    super(props);


    this.margin = { top: 5, bottom: 85, right: 25, left: 150 };
    const { chartData, xKey, yKey } = props;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chartData.length !== 0) {
      this.d3Render(nextProps);
    }
  }

  d3Render = (props) => {
    const node = this.node;
    const width = props.width - this.margin.left - this.margin.right;
    const height = props.height - this.margin.bottom - this.margin.top;
    const chartData = props.chartData;
    const barWidth = Math.ceil(width / props.chartData.length);

    const xExtent = d3.extent(chartData, (d) => moment(d.date));
    const xRange = [0, width];
    const yMax = d3.max(chartData, (d) => +d.gdp);
    const yExtent = [0, yMax];
    const yRange = [height, this.margin.bottom];

    const fiat = d3.format('$,.2f');

    const x = d3.scaleTime()
      .rangeRound(xRange)
      .domain(xExtent)


    const y = d3.scaleLinear()
      .domain(yExtent)
      .range(yRange);

    const xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(5));
    const yAxis = d3.axisLeft(y)
      .ticks(8)
      .tickSizeInner(-width)
      .tickSizeOuter(0)
      .tickPadding(10);

    const chart = d3.select(node)
      .append('g')
        .classed(style.chart, true)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    /* X-axis */
    chart.append('g')
      .classed(style.xAxis, true)
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dy', '-.5em')
        .attr('y', 40)
        .attr('transform', 'rotate(-30)');
    /* X Legend */
    chart.append('text')
      .classed(style.xLegend, true)
      .text('Time')
      .attr('x', width / 2)
      .attr('y', height + this.margin.bottom)
      .attr('text-anchor', 'middle');

    /* Y-axis*/
    chart.append('g')
      .classed(style.yAxis, true)
      .call(yAxis);

    /* Y Legend */
    chart.append('text')
      .classed(style.yLegend, true)
      .text('US GDP in Billions')
      .attr('x', -height / 2)
      .attr('dy', -this.margin.left / 2)
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)');

    /* Tooltip Creation */
    const popup = d3.select('.popup')
      .append('div')
      .classed(style.tooltip, true)
      .style('opacity', 0);

    /* Populate Chart with Data */
    chart.selectAll(style.bar)
      .data(chartData)
      .enter()
        .append('rect')
        .classed(style.bar, true)
        .attr('x', (d) => x(moment(d.date)))
        .attr('width', barWidth)
        .attr('y', (d) => y(d.gdp))
        .attr('height', (d) => (height - y(d.gdp)))
        .on('mouseover', function mouseOver(d) {
          d3.select(this)
            .attr('class', style.barOver);

          popup.raise()
            .transition()
            .duration(50)
            .style('opacity', 0.9);
          popup
            .style('left', `${d3.event.pageX + 15}px`)
            .style('top', `${d3.event.pageY - 50}px`)
            .html(`<p><span class=${style.fiat}>${fiat(d.gdp)}</span> Billion</p>
                   <p>${moment(d.date).format('MMM - YYYY')}</p>`);
        })
        .on('mouseout', function mouseOut(d) {
          d3.select(this)
            .attr('class', style.bar);
          popup
            .transition()
            .duration(800)
            .style('opacity', 0);
        });

    chart.append('g')
      .classed('test', true)
      .style('opacity', 0);

    chart.exit().remove();
  }

  render() {
    return (
      <div className="popup">
        <svg
          className={style.svg}
          width={this.props.width} height={this.props.height}
          ref={(node) => this.node = node}
        >
        </svg>
      </div>
    );
  }
}
