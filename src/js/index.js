let Chart = require('chart.js');

$(function() {
  var $win = $(window),
      $main = $('main'),
      $nav = $('nav'),
      navHeight = $nav.outerHeight(),
      navPos = $nav.offset().top,
      fixedClass = 'is-fixed';

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > navPos ) {
      $nav.addClass(fixedClass);
      $main.css('margin-top', navHeight);
    } else {
      $nav.removeClass(fixedClass);
      $main.css('margin-top', '0');
    }
  });
});

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['AWS', 'GCP', 'Python', 'Ruby', 'Node.js', 'html/css','ShellScript'],
    datasets: [{
      label: 'Level',
      data: [7, 3, 3, 3, 3, 3, 4],
      backgroundColor: "rgba(107,142,35,1)"
    }]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10
          }
        }
      ]
    }
  }
});