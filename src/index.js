import $ from "jquery";

let activeItemsValue = 0;

function ToDoItem({ text: text, id: id = " ", status: status = "" }) {
  status === ""
    ? activeItemsValue++
    : $(".clear-completed").css("display", "block");

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
        .text(--activeItemsValue);
      $(".clear-completed").css("display", "block");
    } else {
      viewItem.removeClass("completed");
      $("#toggle-all").prop("checked", false);
      $(".todo-count")
        .find("strong")
        .text(++activeItemsValue);
      if ($('ul[class="todo-list"]').children(".completed").length === 0) {
        $(".clear-completed").css("display", "none");
      }
    }
  });

  viewItem.find(".destroy").on("click", function() {
    if (!viewItem.find(".toggle").is(":checked")) {
      $(".todo-count")
        .find("strong")
        .text(--activeItemsValue);
      viewItem.remove();
    } else {
      viewItem.remove();
      if ($('ul[class="todo-list"]').children(".completed").length === 0) {
        $(".clear-completed").css("display", "none");
      }
    }
  });

  $('ul[class="todo-list"]').append(viewItem);
  $(".todo-count")
    .find("strong")
    .text(activeItemsValue);
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

$(".clear-completed").on("click", () =>
  $('ul[class="todo-list"]')
    .children(".completed")
    .each((index, item) =>
      $(item)
        .find(".destroy")
        .click()
    )
);
