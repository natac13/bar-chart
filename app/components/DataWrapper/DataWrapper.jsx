import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classnames from 'classnames';

import BarChart from 'Components/BarChart/';
import style from './style.scss';

export default class DataWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    /** Styling */
    const wrapperClass = classnames({
      [style.wrapper]: true,
      [props.className]: !!props.className,
    });

    /** Function Binding */

    /** State Creation */
    this.state = {
      wrapperClass,
      chartData: props.data.data || [],
      width: 1500,
      height: 800,
      data: props.data,
      title: 'Unknown...',
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.data.data.length !== 0) {
      const formattedData = nextProps.data.data.map(([date, gdp]) => {
        return { date, gdp };
      });

      const title = nextProps.data.name;
      this.setState({
        chartData: formattedData,
        data: nextProps.data,
        title,
      });

    }
  }


  render() {
    const {
      wrapperClass,
      chartData,
      data,
      width,
      height,
      title,
    } = this.state;

    return (
      <section className={wrapperClass}>
        <h1 className={style.title}>{title}</h1>
        <BarChart
          chartData={chartData}
          actions={this.props.actions}
          startDate={data.from_date}
          endDate={data.to_date}
          width={width}
          height={height}
          data={data}
        />

      </section>
    );
  }

}
