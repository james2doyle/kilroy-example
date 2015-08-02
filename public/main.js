var Counter = Kilroy({
  init: function (count) {
    this.count = count;
    this.color = [0, 0, 0];
  },
  view: function () {
    this.color = this.color.map(function(item) {
      var amount = Math.round(Math.random() * 100);
      return (item > 255) ? 0 : item += amount;
    });
    var color = 'color: rgb('+this.color.join(', ')+')';
    return ['div',
    ['b', { style: color }, 'Count: ' + this.count],
    ['button .incr', { type: 'button' }, '[+]']];
  },
  events: {
    click: {
      ".incr": function () {
        this.count++;
        this.d();
      }
    }
  }
});

var counter = Counter(10);

document.body.appendChild(counter.node);