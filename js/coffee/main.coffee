class TodoItem
  constructor: (description, tags) ->
    @desc = description
    @tags = if tags? then tags else []
    @isDone = false

  addTag: (tagName) ->
    @tags.push tagName if tagName?

  removeTag: (tagName) ->
    if tagName? and @tags.indexOf(tagName) != -1
      @tags.splice(@tags.indexOf(tagName), 1)

  changeDesc: (newDesc) ->
    @desc = newDesc unless not newDesc

  markAsDone: (toggle) ->
    if toggle? and toggle is true
      @isDone = true
    else
      @isDone = false

  toHTML: () ->
    tagMarkup =("<span class='tag'>#{tag}</span>" for tag in @tags).join("")
    "<li>#{@desc}#{tagMarkup}</li>"


class TodoList
  constructor: (category) ->
    @category = category
    @items = []

  addItem: (description) ->
    if description?
      @items.push(new TodoItem(description, []))

  removeItem: (description) ->
    if description?
      @items.forEach (item, i) ->
        if item.desc is description
          @items.splice i, 1

  markItemAsDone: (description) ->
    if description?
      @items.forEach (item, i) ->
        if item.desc is description
          item.markAsDone true

  toHTML: () ->
    itemList = ("#{item.toHTML()}" for item in @items).join("")
    "<div class='to-do-list'><h2>#{@category}</h2><ul>#{itemList}</ul></div>"


class TodoApp
  constructor: (el) ->
    if (typeof el == "object")
      @el = el
    else
      @el = document.querySelector el
    @todoListCollection = []
    @init()

  init: () ->
    theContainer = @el
    newLink = document.createElement("a")
    newLink.id = "new-list"
    newLink.classList.add("button")
    newLink.href = "#"
    newLink.innerText = "Add New List"
    @newListLink = newLink
    theContainer.appendChild @newListLink
    addNewTodoList = () ->
      newListInput = document.createElement "input"
      newListInput.type = "text"
      newListInput.id = "new-list-name"
      newListInput.placeholder = "Enter List Name"
      if !@todoListCollection
        theContainer.appendChild newListInput
      else
        firstListEl = newLink.nextSibiling()
        firstListEl.insertBefore newListInput
      

    newLink.addEventListener "click", () ->
      addNewTodoList()


todoEl = document.getElementById "todo-container"
todoApp = new TodoApp todoEl

console.log todoApp.el

chores = new TodoList "chores"
chores.addItem "clean kitchen"
chores.addItem "vacuum carpet"
chores.addItem "empty trunk"
chores.addItem "clean bathroom"

#todoUL = document.querySelector ".todos"
#todoUL.innerHTML = chores.toHTML()
