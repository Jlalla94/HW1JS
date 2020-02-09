import $ from "jquery";

let activeItemsValue = 0;

function ToDoItem({ text: text, id: id = " ", status: status = "" }) {
  activeItemsValue = status !== "" ? activeItemsValue : activeItemsValue++;
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
      $(".todo-count")
        .find("strong")
        .text(activeItemsValue--);
    } else {
      viewItem.removeClass("completed");
      $("#toggle-all").prop("checked", false);
      $(".todo-count")
        .find("strong")
        .text(activeItemsValue++);
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

$("#toggle-all").on("change", function(event) {
  if ($(event.target).is(":checked")) {
    $('ul[class="todo-list"]')
      .children()
      .each((index, item) => {
        if (
          !$(item)
            .find(".toggle")
            .is(":checked")
        ) {
          $(item)
            .find(".toggle")
            .click();
        }
      });
  } else {
    $('ul[class="todo-list"]')
      .children()
      .each((index, item) =>
        $(item)
          .find(".toggle")
          .click()
      );
  }
});
