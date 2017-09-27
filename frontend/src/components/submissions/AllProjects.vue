<template>
  <div>
    <svg class="all-projects"></svg>
    <p>
      In the meantime, enjoy my recently completed D3 tutorial visualization
    </p>
  </div>
</template>

<script>
import $ from 'jquery';
import * as d3 from 'd3';

export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    window.addEventListener('resize', this.updateChart);
    d3.csv('/static/data.csv', (d) => {
      const d2 = d;
      d2.frequency = +d.frequency;
      return d2;
    }, (error, data) => {
      if (error) throw error;
      this.data = data;
      this.updateChart();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateChart);
  },
  methods: {
    updateChart() {
      $('.all-projects').empty();

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      let width = $('main').width() - margin.left - margin.right;
      if (width > 600) width = 600;
      const height = width * 0.8;

      const x = d3.scaleBand()
          .domain(this.data.map(d => d.letter))
          .rangeRound([0, width])
          .padding(0.1);
      const y = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.frequency)])
          .rangeRound([height, 0]);

      const chart = d3.select('.all-projects')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

      const g = chart.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
      g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x));
      g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y).ticks(10, '%'))
        .append('text')
          .attr('class', 'y title')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '1em')
          .style('text-anchor', 'end')
          .text('Frequency');

      g.selectAll('.bar')
        .data(this.data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.letter))
          .attr('y', d => y(d.frequency))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.frequency));
    },
  },
};
</script>

<style lang="scss">
svg.all-projects {
  .axis {
    text {
      font: 14px sans-serif;
    }
  }
  .axis--x {
    path {
      display: none;
    }
  }
  .bar {
    fill: steelblue;
  }
  .bar:hover {
    fill: red
  }
  .title {
    fill: black;
  }
}
</style>
