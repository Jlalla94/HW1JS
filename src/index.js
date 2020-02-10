import $ from "jquery";

let activeItemsValue = 0;

let data = {};

if (localStorage.getItem("toDoItem")) {
  data = JSON.parse(localStorage.toDoItem);
  localStorage.clear();
  $.each(data, (index, item) => new ToDoItem(item));
}

function ToDoItem({ text: text, id: id = Date.now(), status: status = "" }) {
  status === ""
    ? activeItemsValue++
    : $(".clear-completed").css("display", "block");

  data[id] = {
    text: text,
    id: id,
    status: status
  };

  localStorage.toDoItem = JSON.stringify(data);

  let viewItem = $(`
  <li class="${status}">
    <div class="view">
      <input class="toggle" type="checkbox" ${status !== "" ? "checked" : ""}/>
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
  </li>`);

  $('ul[class="todo-list"]').append(viewItem);

  viewItem.find(".toggle").on("change", function(event) {
    if ($(event.target).is(":checked")) {
      viewItem.addClass("completed");
      $(".todo-count")
        .find("strong")
        .text(--activeItemsValue);
      if (Object.keys(data).length !== activeItemsValue) {
        $(".clear-completed").css("display", "block");
      }
      data[id] = {
        text: text,
        id: id,
        status: "completed"
      };
    } else {
      data[id] = {
        text: text,
        id: id,
        status: ""
      };
      viewItem.removeClass("completed");
      $("#toggle-all").prop("checked", false);
      $(".todo-count")
        .find("strong")
        .text(++activeItemsValue);
      if (Object.keys(data).length === activeItemsValue) {
        $(".clear-completed").css("display", "none");
      }
    }
    localStorage.toDoItem = JSON.stringify(data);
  });

  viewItem.find(".destroy").on("click", function() {
    if (!viewItem.find(".toggle").is(":checked")) {
      $(".todo-count")
        .find("strong")
        .text(--activeItemsValue);
      viewItem.remove();
    } else {
      viewItem.remove();
      if (Object.keys(data).length === activeItemsValue) {
        $(".clear-completed").css("display", "none");
      }
    }
    delete data[id];
    localStorage.toDoItem = JSON.stringify(data);
  });

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

console.log(window.location.hash);
