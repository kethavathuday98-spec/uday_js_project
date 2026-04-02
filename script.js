// ===== DARK MODE =====
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// ===== ADD ITEM =====
document.getElementById("addItem").onclick = () => {
  const row = `
    <tr>
      <td><input type="text" class="form-control itemName"></td>
      <td><input type="number" class="form-control qty" value="1"></td>
      <td><input type="number" class="form-control price" value="0"></td>
      <td><input type="number" class="form-control tax" value="0"></td>
      <td>
        <button class="btn btn-danger removeItem">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
  document.getElementById("itemTable").insertAdjacentHTML("beforeend", row);
};

// ===== REMOVE ITEM =====
document.getElementById("itemTable").addEventListener("click", (e) => {
  if (e.target.closest(".removeItem")) {
    e.target.closest("tr").remove();
  }
});

// ===== CALCULATE =====
document.getElementById("calculateBtn").onclick = () => {
  let total = 0;

  document.querySelectorAll("#itemTable tr").forEach((row) => {
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const price = parseFloat(row.querySelector(".price").value) || 0;
    const tax = parseFloat(row.querySelector(".tax").value) || 0;

    const itemTotal = qty * price;
    const taxAmount = (itemTotal * tax) / 100;

    total += itemTotal + taxAmount;
  });

  const discountType = document.getElementById("discountType").value;
  const discountValue =
    parseFloat(document.getElementById("discountValue").value) || 0;

  let discount =
    discountType === "percent" ? (total * discountValue) / 100 : discountValue;

  const finalTotal = total - discount;

  document.getElementById("preview").innerHTML =
    `<h4>Total: ₹${finalTotal.toFixed(2)}</h4>`;
};

// ===== FETCH API =====
async function loadAPI() {
  try {
    const res = await fetch("https://freetestapi.com/api/v1/products");
    const data = await res.json();

    const container = document.getElementById("apiData");
    container.innerHTML = "";

    data.slice(0, 6).forEach((p) => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card p-2 mb-2 text-dark">
            <img src="${p.image}" height="150">
            <h6>${p.name}</h6>
            <p>₹${p.price}</p>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error("API Error:", err);
  }
}

loadAPI();

document.getElementById("refreshAPI").onclick = loadAPI;
