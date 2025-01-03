// lắng nghe sự kiện không cho load lại , khi submit thù đúc ra đối tươngj
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // chặn ko cho load lại trang
  // lấy giá trị trong ô input để add
  let name = document.querySelector("#name").value;
  // trước khi bỏ vô local Storage có thêm id để quản lí
  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };
  if (name.length != 0) {
    // thêm item vào local Storage
    addItemToLs(item);
    // hiển thị lên UI
    addItemToUi(item);
  }
});

// hàm lấy dữ liệu từ localStorage
const getList = () => {
  let listCard = localStorage.getItem("listCard");
  return JSON.parse(listCard) || [];
};

const addItemToLs = (item) => {
  // lấy danh sách về
  const list = getList();
  // thêm thằng đó vào sanh sách
  list.push(item);
  localStorage.setItem("listCard", JSON.stringify(list));
};
// hàm hiển thị item lên UI
const addItemToUi = (item) => {
  // tạo cái card
  let newCard = document.createElement("div");
  newCard.className =
    "card mb-3 p-2 d-flex flex-row justify-content-between align-items-center";
  // bỏ nội dung vào cái dom ảo đó
  newCard.innerHTML = ` 
     <span>${item.name}</span>
     <button class="btn btn-danger btn-sm btn-remove" data-id = ${item.id}>Remove</button>
  `;

  document.querySelector(".list").appendChild(newCard);
  document.querySelector("#name").value = "";
};

const init = () => {
  const list = getList();
  list.forEach((item) => {
    addItemToUi(item);
  });
};

init();
const removeItemLs = (idRemove) => {
  let list = getList();
  // lọc ra những thằng ko có idRemove
  list = list.filter((item) => {
    return item.id != idRemove;
  });
  localStorage.setItem("listCard", JSON.stringify(list));
};

document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.className.includes("btn-remove")) {
    // hỏi xem bạn có chắc muốn xóa không
    let isConfirmed = confirm(
      ` bạn có muốn xóa : ${event.target.previousElementSibling.textContent} `
    );

    if (isConfirmed) {
      event.target.parentElement.remove();
      removeItemLs(event.target.getAttribute("data-id"));
    }
  }
});

document.querySelector("#btn-removeAll").addEventListener("click", (event) => {
  let isConfirmed = confirm(` bạn có muốn xóa hết hay không  `);
  if (isConfirmed) {
    // xóa trên Ui thì nó document
    document.querySelector(".list").innerHTML = "";
    localStorage.removeItem("listCard");
  }
});
// chức nắng filter
document.querySelector("#filter").addEventListener("input", (event) => {
  let listCard = getList();
  const content = document.querySelector("#filter").value;
  // trước khi render ra thì phải làm sạch list
  document.querySelector(".list").innerHTML = "";
  listCard = listCard.filter((item) => {
    return item.name.includes(content);
  });
  listCard.forEach((item) => {
    addItemToUi(item);
  });
});
