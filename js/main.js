(function() {
  var TodoApp, TodoItem, TodoList, chores, todoApp, todoEl, todoUL;

  TodoItem = (function() {
    function TodoItem(description, tags) {
      this.desc = description;
      this.tags = tags != null ? tags : [];
      this.isDone = false;
    }

    TodoItem.prototype.addTag = function(tagName) {
      if (tagName != null) {
        return this.tags.push(tagName);
      }
    };

    TodoItem.prototype.removeTag = function(tagName) {
      if ((tagName != null) && this.tags.indexOf(tagName) !== -1) {
        return this.tags.splice(this.tags.indexOf(tagName), 1);
      }
    };

    TodoItem.prototype.changeDesc = function(newDesc) {
      if (!!newDesc) {
        return this.desc = newDesc;
      }
    };

    TodoItem.prototype.markAsDone = function(toggle) {
      if ((toggle != null) && toggle === true) {
        return this.isDone = true;
      } else {
        return this.isDone = false;
      }
    };

    TodoItem.prototype.toHTML = function() {
      var tag, tagMarkup;
      tagMarkup = ((function() {
        var _i, _len, _ref, _results;
        _ref = this.tags;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push("<span class='tag'>" + tag + "</span>");
        }
        return _results;
      }).call(this)).join("");
      return "<li>" + this.desc + tagMarkup + "</li>";
    };

    return TodoItem;

  })();

  TodoList = (function() {
    function TodoList(category) {
      this.category = category;
      this.items = [];
    }

    TodoList.prototype.addItem = function(description) {
      if (description != null) {
        return this.items.push(new TodoItem(description, []));
      }
    };

    TodoList.prototype.removeItem = function(description) {
      if (description != null) {
        return this.items.forEach(function(item, i) {
          if (item.desc === description) {
            return this.items.splice(i, 1);
          }
        });
      }
    };

    TodoList.prototype.markItemAsDone = function(description) {
      if (description != null) {
        return this.items.forEach(function(item, i) {
          if (item.desc === description) {
            return item.markAsDone(true);
          }
        });
      }
    };

    TodoList.prototype.toHTML = function() {
      var item, itemList;
      itemList = ((function() {
        var _i, _len, _ref, _results;
        _ref = this.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push("" + (item.toHTML()));
        }
        return _results;
      }).call(this)).join("");
      return "<div class='to-do-list'><h2>" + this.category + "</h2><ul>" + itemList + "</ul></div>";
    };

    return TodoList;

  })();

  TodoApp = (function() {
    function TodoApp(el) {
      this.el = el;
      console.log(el);
    }

    return TodoApp;

  })();

  todoEl = document.getElementById("todo-container");

  todoApp = new TodoApp(todoEl);

  chores = new TodoList("chores");

  chores.addItem("clean kitchen");

  chores.addItem("vacuum carpet");

  chores.addItem("empty fridge");

  todoUL = document.querySelector(".todos");

  todoUL.innerHTML = chores.toHTML();

}).call(this);
