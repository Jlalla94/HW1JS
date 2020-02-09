import $ from "jquery";

function ToDoItem({ text: text, id: id = " ", status: status = "" }) {
  let viewItem = $(`
  <li class="${status}">
    <div class="view">
      <input class="toggle" type="checkbox" ${status !== "" ? "checked" : ""}/>
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
  </li>`);

  viewItem.find(".toggle").on("change", function(event) {
    if ($(event.target).is(":checked")) {
      viewItem.addClass("completed");
    } else {
      viewItem.removeClass("completed");
    }
  });
  $('ul[class="todo-list"]').append(viewItem);
}

$(".new-todo")
  .keypress(event => {
    if (
      $(event.target)
        .val()
        .replace(/\s/g, "") !== "" &&
      event.which === 13
    ) {
      new ToDoItem({ text: $(event.target).val() });
      $(event.target).val("");
    }
  })
  .focusout(event => {
    if (
      $(event.target)
        .val()
        .replace(/\s/g, "") !== ""
    ) {
      new ToDoItem({ text: $(event.target).val() });
      $(event.target).val("");
    }
  });
