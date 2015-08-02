var Filter = Kilroy({
  init: function (items) {
    this.items = items;
    this.search = '';
  },
  view: function () {
    var search = this.search;
    this.items.sort(function(item, nextitem, index) {
      if (search === '') {
        item.class = 'active';
      }
      var searchable = item.title.toLowerCase() + ' ' + item.content.toLowerCase();
      var term = search.trim().toLowerCase();
      var found = searchable.indexOf(term);
      item.class = (found !== -1) ? 'active': 'inactive';
      return found;
    });
    this.items.reverse();
    var template = this.items.map(function(item, index) {
      return ['li', {
        class: (search === '') ? 'active': item.class
      }, [
      ['p .title', item.title],
      ['p .content', item.content]
      ]];
    });
    return ['div .wrapper',
    ['input', {
      type: 'search',
      id: 'search',
      autofocus: 'autofocus',
      placeholder: 'Enter a term to searh for'
    }],
    ['ul', template]
    ];
  },
  events: {
    input: {
      "#search": function () {
        this.search = event.target.value;
        this.d();
      }
    }
  }
});

fetch('items.json')
.then(function(response) {
  return response.json();
})
.then(function(items) {
  var filter = Filter(items);
  document.getElementById('application').appendChild(filter.node);
})
.catch(function(err) {
  console.error(err);
});